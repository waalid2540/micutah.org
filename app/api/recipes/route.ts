import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Clean phone number
    const cleanPhone = phone.replace(/\D/g, "");

    // Try to store in database
    try {
      await prisma.recipeLead.create({
        data: {
          name,
          phone: cleanPhone,
          source: "ramadan-recipes-2026",
        },
      });
      console.log(`✓ Recipe lead saved to DB: ${name} - ${cleanPhone}`);
    } catch (dbError: any) {
      // If table doesn't exist or other DB error, fall back to file
      console.log("Database note:", dbError.message);
      
      // Save to JSON file as backup
      const leadsFile = path.join(process.cwd(), "data", "recipe-leads.json");
      
      // Create data directory if it doesn't exist
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      // Read existing leads or create empty array
      let leads: any[] = [];
      if (fs.existsSync(leadsFile)) {
        const content = fs.readFileSync(leadsFile, "utf-8");
        leads = JSON.parse(content);
      }
      
      // Add new lead
      leads.push({
        name,
        phone: cleanPhone,
        source: "ramadan-recipes-2026",
        createdAt: new Date().toISOString(),
      });
      
      // Save back to file
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
      console.log(`✓ Recipe lead saved to file: ${name} - ${cleanPhone}`);
    }

    // Log to console (always works)
    console.log("📱 NEW RECIPE LEAD:", {
      name,
      phone: cleanPhone,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true,
      message: "Thank you! Downloading your recipes...",
    });
  } catch (error) {
    console.error("Error processing recipe signup:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve leads (admin only)
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Try database first
    try {
      const leads = await prisma.recipeLead.findMany({
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ leads, source: "database" });
    } catch (dbError) {
      // Fall back to file
      const leadsFile = path.join(process.cwd(), "data", "recipe-leads.json");
      if (fs.existsSync(leadsFile)) {
        const content = fs.readFileSync(leadsFile, "utf-8");
        const leads = JSON.parse(content);
        return NextResponse.json({ leads, source: "file" });
      }
      return NextResponse.json({ leads: [], source: "none" });
    }
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
