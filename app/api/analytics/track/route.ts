import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';

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
    
    const { device, browser, os } = parseUserAgent(userAgent);
    
    const country = "Unknown";
    const city = "Unknown";
    
    try {
      if (type === "pageview") {
        await prisma.pageView.create({
          data: {
            path: path || "/",
            referrer,
            userAgent,
            country,
            city,
            device,
            browser,
            os,
            sessionId: sessionId || "unknown",
            visitorId: visitorId || "unknown",
          },
        });
      } else if (type === "event" && event) {
        await prisma.analyticsEvent.create({
          data: {
            name: event.name || "unknown",
            category: event.category || "unknown",
            label: event.label,
            value: event.value,
            path: path || "/",
            sessionId: sessionId || "unknown",
            visitorId: visitorId || "unknown",
            metadata: event.metadata ? JSON.stringify(event.metadata) : null,
          },
        });
      } else if (type === "duration") {
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
    } catch (dbError) {
      // Tables might not exist yet - silently fail
      console.log("Analytics tracking failed (tables may not exist):", dbError);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    // Always return success to not break the client
    return NextResponse.json({ success: true });
  }
}
