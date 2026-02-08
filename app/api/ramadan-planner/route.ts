import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName, country, interestedInUmrah } = body;

    // Validate required fields
    if (!email || !firstName || !country) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Store the lead in database
    // Note: You'll need to create this table in your Prisma schema
    // For now, we'll try to store it and handle if table doesn't exist
    try {
      await prisma.ramadanPlannerLead.create({
        data: {
          email,
          firstName,
          country,
          interestedInUmrah: interestedInUmrah || false,
          source: "ramadan-planner-2026",
          createdAt: new Date(),
        },
      });
    } catch (dbError) {
      // If table doesn't exist, log to console (you can see in Render logs)
      console.log("New Ramadan Planner Lead:", {
        email,
        firstName,
        country,
        interestedInUmrah,
        timestamp: new Date().toISOString(),
      });
    }

    // TODO: Integrate with email service (ConvertKit, Mailchimp, etc.)
    // For now, we'll just return success and let the client handle download
    
    // Example ConvertKit integration (uncomment when ready):
    /*
    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;
    
    if (CONVERTKIT_API_KEY && CONVERTKIT_FORM_ID) {
      await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email,
          first_name: firstName,
          fields: {
            country,
            interested_in_umrah: interestedInUmrah ? "yes" : "no",
          },
        }),
      });
    }
    */

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing ramadan planner signup:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve leads (admin only - add auth in production)
export async function GET(request: Request) {
  try {
    // Basic auth check - improve this for production
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const leads = await prisma.ramadanPlannerLead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ leads, count: leads.length });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
