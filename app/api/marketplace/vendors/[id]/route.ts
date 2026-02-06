import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/marketplace/vendors/[id] - Get a single vendor with listings
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const vendor = await prisma.vendor.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        listings: {
          where: { status: "approved" },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        reviews: {
          include: {
            user: {
              select: { name: true },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
        _count: {
          select: { listings: true, reviews: true },
        },
      },
    });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    return NextResponse.json({ vendor });
  } catch (error) {
    console.error("Error fetching vendor:", error);
    return NextResponse.json(
      { error: "Failed to fetch vendor" },
      { status: 500 }
    );
  }
}

// PATCH /api/marketplace/vendors/[id] - Update vendor (admin or owner)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // If approving, set verifiedAt
    if (body.status === "approved" && !body.verifiedAt) {
      body.verifiedAt = new Date();
      body.verifiedBy = body.verifiedBy || "Madina Islamic Center";
    }

    const vendor = await prisma.vendor.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ vendor });
  } catch (error) {
    console.error("Error updating vendor:", error);
    return NextResponse.json(
      { error: "Failed to update vendor" },
      { status: 500 }
    );
  }
}
