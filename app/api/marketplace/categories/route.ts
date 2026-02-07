import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { marketplaceCategories } from "@/lib/marketplace-data";

// Default categories if none exist
const defaultCategories = marketplaceCategories;

// GET /api/marketplace/categories - Get all categories
export async function GET() {
  try {
    let categories = await prisma.listingCategory.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { listings: true },
        },
      },
    });

    // If no categories exist, create defaults
    if (categories.length === 0) {
      await prisma.listingCategory.createMany({
        data: defaultCategories,
      });
      categories = await prisma.listingCategory.findMany({
        where: { active: true },
        orderBy: { order: "asc" },
        include: {
          _count: {
            select: { listings: true },
          },
        },
      });
    }

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return default categories if DB fails
    return NextResponse.json({ 
      categories: defaultCategories.map(c => ({ ...c, _count: { listings: 0 } }))
    });
  }
}

// POST /api/marketplace/categories - Create a category (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, icon, order } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const category = await prisma.listingCategory.create({
      data: {
        name,
        slug,
        description,
        icon,
        order: order || 50,
      },
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
