import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      businessName,
      ownerName,
      email,
      phone,
      category,
      address,
      city,
      website,
      hours,
      description,
      isHalal,
    } = body;

    // Validate required fields
    if (!businessName || !ownerName || !email || !phone || !category || !address || !city || !description || !isHalal) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Store the submission
    try {
      await prisma.directorySubmission.create({
        data: {
          businessName,
          ownerName,
          email,
          phone,
          category,
          address: `${address}, ${city}`,
          website: website || null,
          hours: hours || null,
          description,
          halalInfo: isHalal,
          status: "pending",
        },
      });
    } catch (dbError: any) {
      // If table doesn't exist, log to console
      console.log("New Directory Submission:", {
        businessName,
        ownerName,
        email,
        phone,
        category,
        address: `${address}, ${city}`,
        website,
        hours,
        description,
        halalInfo: isHalal,
        timestamp: new Date().toISOString(),
      });
    }

    // Send notification email to admin (optional)
    // TODO: Add email notification

    return NextResponse.json({ 
      success: true,
      message: "Business submitted for review"
    });
  } catch (error) {
    console.error("Error processing directory submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve pending submissions (admin only)
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const submissions = await prisma.directorySubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ submissions, count: submissions.length });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
