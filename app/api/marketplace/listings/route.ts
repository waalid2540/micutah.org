import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/marketplace/listings - Get all approved listings
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const featured = searchParams.get("featured");
    const status = searchParams.get("status") || "approved";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: any = {};

    // Only show approved listings by default (unless admin)
    if (status === "approved") {
      where.status = "approved";
    } else if (status === "all") {
      // Admin view - show all
    } else {
      where.status = status;
    }

    if (category && category !== "all") {
      where.categoryName = category;
    }

    if (type) {
      where.listingType = type;
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { contactName: { contains: search } },
      ];
    }

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: {
          vendor: {
            select: {
              id: true,
              businessName: true,
              slug: true,
              logo: true,
              rating: true,
              halalCertified: true,
            },
          },
          category: true,
        },
        orderBy: [
          { featured: "desc" },
          { createdAt: "desc" },
        ],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.listing.count({ where }),
    ]);

    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}

// POST /api/marketplace/listings - Create a new listing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      price,
      priceLabel,
      priceType,
      categoryName,
      listingType,
      images,
      contactName,
      contactPhone,
      contactEmail,
      contactWhatsapp,
      vendorId,
      city,
      state,
    } = body;

    // Validate required fields
    if (!title || !description || !categoryName) {
      return NextResponse.json(
        { error: "Title, description, and category are required" },
        { status: 400 }
      );
    }

    // Generate slug
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const slug = `${baseSlug}-${Date.now().toString(36)}`;

    // Set expiration (30 days for free listings)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const listing = await prisma.listing.create({
      data: {
        title,
        slug,
        description,
        price: price ? parseFloat(price) : null,
        priceLabel,
        priceType: priceType || "fixed",
        categoryName,
        listingType: listingType || "product",
        images: images ? JSON.stringify(images) : null,
        contactName,
        contactPhone,
        contactEmail,
        contactWhatsapp,
        vendorId,
        city: city || "Salt Lake City",
        state: state || "UT",
        status: "pending", // Needs admin approval
        expiresAt,
        // Legacy fields
        contact: contactName,
        phone: contactPhone,
        approved: false,
      },
    });

    return NextResponse.json({ listing }, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}
