import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

const prisma = new PrismaClient();

// Parse user agent for device/browser/os info
function parseUserAgent(ua: string) {
  const device = /Mobile|Android|iPhone|iPad/i.test(ua) 
    ? (/iPad|Tablet/i.test(ua) ? "tablet" : "mobile") 
    : "desktop";
  
  let browser = "unknown";
  if (ua.includes("Chrome")) browser = "Chrome";
  else if (ua.includes("Safari")) browser = "Safari";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Edge")) browser = "Edge";
  
  let os = "unknown";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac")) os = "Mac";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  
  return { device, browser, os };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, path, referrer, sessionId, visitorId, event } = body;
    
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const forwarded = headersList.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";
    
    const { device, browser, os } = parseUserAgent(userAgent);
    
    // Get country from IP (simplified - in production use a geo-IP service)
    let country = "Unknown";
    let city = "Unknown";
    
    if (type === "pageview") {
      await prisma.pageView.create({
        data: {
          path,
          referrer,
          userAgent,
          country,
          city,
          device,
          browser,
          os,
          sessionId,
          visitorId,
        },
      });
    } else if (type === "event" && event) {
      await prisma.analyticsEvent.create({
        data: {
          name: event.name,
          category: event.category,
          label: event.label,
          value: event.value,
          path,
          sessionId,
          visitorId,
          metadata: event.metadata ? JSON.stringify(event.metadata) : null,
        },
      });
    } else if (type === "duration") {
      // Update page view with duration
      const { duration } = body;
      await prisma.pageView.updateMany({
        where: {
          sessionId,
          path,
          duration: null,
        },
        data: {
          duration,
        },
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
