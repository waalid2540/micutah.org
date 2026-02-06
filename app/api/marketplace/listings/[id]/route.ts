import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/marketplace/listings/[id] - Get a single listing
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const listing = await prisma.listing.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        vendor: {
          select: {
            id: true,
            businessName: true,
            slug: true,
            logo: true,
            description: true,
            phone: true,
            whatsapp: true,
            rating: true,
            reviewCount: true,
            halalCertified: true,
            verifiedBy: true,
          },
        },
        category: true,
      },
    });

    if (!listing) {
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    }

    // Increment views
    await prisma.listing.update({
      where: { id: listing.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({ listing });
  } catch (error) {
    console.error("Error fetching listing:", error);
    return NextResponse.json(
      { error: "Failed to fetch listing" },
      { status: 500 }
    );
  }
}

// PATCH /api/marketplace/listings/[id] - Update a listing
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const listing = await prisma.listing.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ listing });
  } catch (error) {
    console.error("Error updating listing:", error);
    return NextResponse.json(
      { error: "Failed to update listing" },
      { status: 500 }
    );
  }
}

// DELETE /api/marketplace/listings/[id] - Delete a listing
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.listing.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting listing:", error);
    return NextResponse.json(
      { error: "Failed to delete listing" },
      { status: 500 }
    );
  }
}
