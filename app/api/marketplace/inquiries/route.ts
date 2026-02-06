import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/marketplace/inquiries - Send inquiry about a listing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { listingId, name, email, phone, message } = body;

    if (!listingId || !name || !email || !message) {
      return NextResponse.json(
        { error: "Listing ID, name, email, and message are required" },
        { status: 400 }
      );
    }

    // Verify listing exists
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        vendor: {
          select: { email: true, businessName: true },
        },
      },
    });

    if (!listing) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }

    // Create inquiry
    const inquiry = await prisma.marketplaceInquiry.create({
      data: {
        listingId,
        name,
        email,
        phone,
        message,
      },
    });

    // Increment inquiry count on listing
    await prisma.listing.update({
      where: { id: listingId },
      data: { inquiries: { increment: 1 } },
    });

    // TODO: Send email notification to vendor/contact

    return NextResponse.json({ 
      inquiry,
      message: "Inquiry sent successfully" 
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry" },
      { status: 500 }
    );
  }
}
