import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Get Recipe Leads
    let recipeLeads: any[] = [];
    
    // Try database first
    try {
      recipeLeads = await prisma.recipeLead.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (dbError) {
      // Fall back to JSON file
      const leadsFile = path.join(process.cwd(), "data", "recipe-leads.json");
      if (fs.existsSync(leadsFile)) {
        const content = fs.readFileSync(leadsFile, "utf-8");
        recipeLeads = JSON.parse(content);
      }
    }

    // Get Planner Leads
    let plannerLeads: any[] = [];
    
    try {
      plannerLeads = await prisma.ramadanPlannerLead.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (dbError) {
      console.log("Could not fetch planner leads from DB");
    }

    return NextResponse.json({
      recipeLeads,
      plannerLeads,
      stats: {
        totalRecipe: recipeLeads.length,
        totalPlanner: plannerLeads.length,
        total: recipeLeads.length + plannerLeads.length,
        umrahInterested: plannerLeads.filter((l: any) => l.interestedInUmrah).length,
      },
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
