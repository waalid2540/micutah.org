import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/marketplace/admin/pending - Get pending approvals
export async function GET(request: NextRequest) {
  try {
    const [pendingListings, pendingVendors] = await Promise.all([
      prisma.listing.findMany({
        where: { status: "pending" },
        orderBy: { createdAt: "asc" },
        include: {
          vendor: {
            select: {
              businessName: true,
              slug: true,
            },
          },
        },
      }),
      prisma.vendor.findMany({
        where: { status: "pending" },
        orderBy: { createdAt: "asc" },
        include: {
          _count: {
            select: { listings: true },
          },
        },
      }),
    ]);

    return NextResponse.json({
      pendingListings,
      pendingVendors,
      counts: {
        listings: pendingListings.length,
        vendors: pendingVendors.length,
        total: pendingListings.length + pendingVendors.length,
      },
    });
  } catch (error) {
    console.error("Error fetching pending items:", error);
    return NextResponse.json(
      { error: "Failed to fetch pending items" },
      { status: 500 }
    );
  }
}

// POST /api/marketplace/admin/pending - Bulk approve/reject
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, type, ids } = body;

    if (!action || !type || !ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { error: "Action, type, and ids are required" },
        { status: 400 }
      );
    }

    const status = action === "approve" ? "approved" : "rejected";

    if (type === "listings") {
      await prisma.listing.updateMany({
        where: { id: { in: ids } },
        data: { 
          status,
          approved: action === "approve",
        },
      });
    } else if (type === "vendors") {
      await prisma.vendor.updateMany({
        where: { id: { in: ids } },
        data: { 
          status,
          verifiedAt: action === "approve" ? new Date() : null,
          verifiedBy: action === "approve" ? "Madina Islamic Center" : null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `${ids.length} ${type} ${action}d successfully`,
    });
  } catch (error) {
    console.error("Error processing approvals:", error);
    return NextResponse.json(
      { error: "Failed to process approvals" },
      { status: 500 }
    );
  }
}
