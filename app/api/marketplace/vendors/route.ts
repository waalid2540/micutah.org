import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/marketplace/vendors - Get all approved vendors
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const status = searchParams.get("status") || "approved";
    const featured = searchParams.get("featured");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: any = {};

    if (status !== "all") {
      where.status = status;
    }

    if (featured === "true") {
      where.plan = { in: ["featured", "premium"] };
    }

    if (search) {
      where.OR = [
        { businessName: { contains: search } },
        { description: { contains: search } },
        { city: { contains: search } },
      ];
    }

    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({
        where,
        include: {
          _count: {
            select: { listings: true, reviews: true },
          },
        },
        orderBy: [
          { plan: "desc" },
          { rating: "desc" },
          { createdAt: "desc" },
        ],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.vendor.count({ where }),
    ]);

    return NextResponse.json({
      vendors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return NextResponse.json(
      { error: "Failed to fetch vendors" },
      { status: 500 }
    );
  }
}

// POST /api/marketplace/vendors - Register a new vendor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      businessName,
      description,
      email,
      phone,
      whatsapp,
      website,
      address,
      city,
      state,
      zipCode,
      serviceArea,
      halalCertified,
      userId,
    } = body;

    // Validate required fields
    if (!businessName || !email || !phone) {
      return NextResponse.json(
        { error: "Business name, email, and phone are required" },
        { status: 400 }
      );
    }

    // Check if vendor already exists with this email
    const existing = await prisma.vendor.findFirst({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A vendor with this email already exists" },
        { status: 400 }
      );
    }

    // Generate slug
    const baseSlug = businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    // Check if slug exists
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.vendor.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const vendor = await prisma.vendor.create({
      data: {
        businessName,
        slug,
        description,
        email,
        phone,
        whatsapp,
        website,
        address,
        city: city || "Salt Lake City",
        state: state || "UT",
        zipCode,
        serviceArea: serviceArea || city || "Salt Lake City",
        halalCertified: halalCertified || false,
        userId: userId || "system", // Will be linked to actual user after auth
        status: "pending", // Needs admin approval
      },
    });

    return NextResponse.json({ vendor }, { status: 201 });
  } catch (error) {
    console.error("Error creating vendor:", error);
    return NextResponse.json(
      { error: "Failed to register vendor" },
      { status: 500 }
    );
  }
}
