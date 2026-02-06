import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Default categories if none exist
const defaultCategories = [
  { name: "Food & Catering", slug: "food-catering", icon: "🍽️", order: 1 },
  { name: "Services", slug: "services", icon: "🔧", order: 2 },
  { name: "Products", slug: "products", icon: "📦", order: 3 },
  { name: "Real Estate", slug: "real-estate", icon: "🏠", order: 4 },
  { name: "Jobs", slug: "jobs", icon: "💼", order: 5 },
  { name: "Health & Wellness", slug: "health-wellness", icon: "💊", order: 6 },
  { name: "Education", slug: "education", icon: "📚", order: 7 },
  { name: "Automotive", slug: "automotive", icon: "🚗", order: 8 },
  { name: "Events", slug: "events", icon: "🎉", order: 9 },
  { name: "Other", slug: "other", icon: "📌", order: 99 },
];

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
