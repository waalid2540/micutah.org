import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "7d"; // 7d, 30d, 90d, all
    
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
        startDate = new Date(0); // All time
    }
    
    // Get page views
    const pageViews = await prisma.pageView.count({
      where: { createdAt: { gte: startDate } },
    });
    
    // Get unique visitors
    const uniqueVisitors = await prisma.pageView.groupBy({
      by: ["visitorId"],
      where: { createdAt: { gte: startDate } },
    });
    
    // Get unique sessions
    const sessions = await prisma.pageView.groupBy({
      by: ["sessionId"],
      where: { createdAt: { gte: startDate } },
    });
    
    // Get top pages
    const topPagesRaw = await prisma.pageView.groupBy({
      by: ["path"],
      where: { createdAt: { gte: startDate } },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    });
    
    const topPages = topPagesRaw.map((p) => ({
      path: p.path,
      views: p._count.path,
    }));
    
    // Get top referrers
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
    
    const topReferrers = topReferrersRaw
      .filter((r) => r.referrer)
      .map((r) => ({
        referrer: r.referrer,
        count: r._count.referrer,
      }));
    
    // Get device breakdown
    const devicesRaw = await prisma.pageView.groupBy({
      by: ["device"],
      where: { createdAt: { gte: startDate } },
      _count: { device: true },
    });
    
    const devices = devicesRaw.reduce((acc, d) => {
      if (d.device) acc[d.device] = d._count.device;
      return acc;
    }, {} as Record<string, number>);
    
    // Get browser breakdown
    const browsersRaw = await prisma.pageView.groupBy({
      by: ["browser"],
      where: { createdAt: { gte: startDate } },
      _count: { browser: true },
    });
    
    const browsers = browsersRaw.reduce((acc, b) => {
      if (b.browser) acc[b.browser] = b._count.browser;
      return acc;
    }, {} as Record<string, number>);
    
    // Get recent events
    const recentEvents = await prisma.analyticsEvent.findMany({
      where: { createdAt: { gte: startDate } },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    
    // Get events by category
    const eventsByCategory = await prisma.analyticsEvent.groupBy({
      by: ["category"],
      where: { createdAt: { gte: startDate } },
      _count: { category: true },
    });
    
    // Get daily page views for chart
    const dailyViews = await prisma.$queryRaw`
      SELECT 
        DATE(createdAt) as date,
        COUNT(*) as views,
        COUNT(DISTINCT visitorId) as visitors
      FROM PageView
      WHERE createdAt >= ${startDate.toISOString()}
      GROUP BY DATE(createdAt)
      ORDER BY date ASC
    ` as { date: string; views: number; visitors: number }[];
    
    // Calculate average session duration
    const avgDurationResult = await prisma.pageView.aggregate({
      where: { 
        createdAt: { gte: startDate },
        duration: { not: null },
      },
      _avg: { duration: true },
    });
    
    // Get total donations in period
    const donations = await prisma.donation.aggregate({
      where: { 
        createdAt: { gte: startDate },
        status: "completed",
      },
      _sum: { amount: true },
      _count: true,
    });
    
    return NextResponse.json({
      period,
      summary: {
        pageViews,
        uniqueVisitors: uniqueVisitors.length,
        sessions: sessions.length,
        avgDuration: Math.round(avgDurationResult._avg.duration || 0),
        bounceRate: sessions.length > 0 
          ? Math.round((1 - pageViews / sessions.length) * 100) 
          : 0,
      },
      topPages,
      topReferrers,
      devices,
      browsers,
      events: {
        recent: recentEvents,
        byCategory: eventsByCategory.map((e) => ({
          category: e.category,
          count: e._count.category,
        })),
      },
      dailyViews,
      donations: {
        total: donations._sum.amount || 0,
        count: donations._count,
      },
    });
  } catch (error) {
    console.error("Analytics stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
