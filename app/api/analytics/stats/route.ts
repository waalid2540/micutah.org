import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "7d";
    
    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case "24h":
        startDate.setHours(startDate.getHours() - 24);
        break;
      case "7d":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(startDate.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate = new Date(0);
    }
    
    // Initialize default values
    let pageViews = 0;
    let uniqueVisitorsCount = 0;
    let sessionsCount = 0;
    let topPages: { path: string; views: number }[] = [];
    let topReferrers: { referrer: string | null; count: number }[] = [];
    let devices: Record<string, number> = {};
    let browsers: Record<string, number> = {};
    let recentEvents: unknown[] = [];
    let eventsByCategory: { category: string; count: number }[] = [];
    let dailyViews: { date: string; views: number; visitors: number }[] = [];
    let avgDuration = 0;
    let donationsTotal = 0;
    let donationsCount = 0;

    try {
      pageViews = await prisma.pageView.count({
        where: { createdAt: { gte: startDate } },
      });
      
      const uniqueVisitorsResult = await prisma.pageView.groupBy({
        by: ["visitorId"],
        where: { createdAt: { gte: startDate } },
      });
      uniqueVisitorsCount = uniqueVisitorsResult.length;
      
      const sessionsResult = await prisma.pageView.groupBy({
        by: ["sessionId"],
        where: { createdAt: { gte: startDate } },
      });
      sessionsCount = sessionsResult.length;
      
      const topPagesRaw = await prisma.pageView.groupBy({
        by: ["path"],
        where: { createdAt: { gte: startDate } },
        _count: { path: true },
        orderBy: { _count: { path: "desc" } },
        take: 10,
      });
      
      topPages = topPagesRaw.map((p) => ({
        path: p.path,
        views: p._count.path,
      }));
      
      const topReferrersRaw = await prisma.pageView.groupBy({
        by: ["referrer"],
        where: { 
          createdAt: { gte: startDate },
          referrer: { not: null },
        },
        _count: { referrer: true },
        orderBy: { _count: { referrer: "desc" } },
        take: 10,
      });
      
      topReferrers = topReferrersRaw
        .filter((r) => r.referrer)
        .map((r) => ({
          referrer: r.referrer,
          count: r._count.referrer,
        }));
      
      const devicesRaw = await prisma.pageView.groupBy({
        by: ["device"],
        where: { createdAt: { gte: startDate } },
        _count: { device: true },
      });
      
      devices = devicesRaw.reduce((acc, d) => {
        if (d.device) acc[d.device] = d._count.device;
        return acc;
      }, {} as Record<string, number>);
      
      const browsersRaw = await prisma.pageView.groupBy({
        by: ["browser"],
        where: { createdAt: { gte: startDate } },
        _count: { browser: true },
      });
      
      browsers = browsersRaw.reduce((acc, b) => {
        if (b.browser) acc[b.browser] = b._count.browser;
        return acc;
      }, {} as Record<string, number>);
      
      recentEvents = await prisma.analyticsEvent.findMany({
        where: { createdAt: { gte: startDate } },
        orderBy: { createdAt: "desc" },
        take: 50,
      });
      
      const eventsByCategoryRaw = await prisma.analyticsEvent.groupBy({
        by: ["category"],
        where: { createdAt: { gte: startDate } },
        _count: { category: true },
      });
      
      eventsByCategory = eventsByCategoryRaw.map((e) => ({
        category: e.category,
        count: e._count.category,
      }));
      
      const avgDurationResult = await prisma.pageView.aggregate({
        where: { 
          createdAt: { gte: startDate },
          duration: { not: null },
        },
        _avg: { duration: true },
      });
      
      avgDuration = Math.round(avgDurationResult._avg.duration || 0);
      
    } catch (dbError) {
      console.log("Analytics tables not ready:", dbError);
    }
    
    // Get donations
    try {
      const donations = await prisma.donation.aggregate({
        where: { 
          createdAt: { gte: startDate },
          status: "completed",
        },
        _sum: { amount: true },
        _count: true,
      });
      donationsTotal = donations._sum.amount || 0;
      donationsCount = donations._count;
    } catch (e) {
      // Donations table might not exist
    }
    
    return NextResponse.json({
      period,
      summary: {
        pageViews,
        uniqueVisitors: uniqueVisitorsCount,
        sessions: sessionsCount,
        avgDuration,
        bounceRate: sessionsCount > 0 
          ? Math.round((1 - pageViews / sessionsCount) * 100) 
          : 0,
      },
      topPages,
      topReferrers,
      devices,
      browsers,
      events: {
        recent: recentEvents,
        byCategory: eventsByCategory,
      },
      dailyViews,
      donations: {
        total: donationsTotal,
        count: donationsCount,
      },
    });
  } catch (error) {
    console.error("Analytics stats error:", error);
    return NextResponse.json({
      period: "7d",
      summary: {
        pageViews: 0,
        uniqueVisitors: 0,
        sessions: 0,
        avgDuration: 0,
        bounceRate: 0,
      },
      topPages: [],
      topReferrers: [],
      devices: {},
      browsers: {},
      events: { recent: [], byCategory: [] },
      dailyViews: [],
      donations: { total: 0, count: 0 },
    });
  }
}
