import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRamadanPlannerWelcomeEmail } from "@/lib/email-templates/ramadan-planner-welcome";

// Dynamic import to avoid build-time initialization
let resendClient: any = null;

async function getResend() {
  if (!resendClient && process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

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
    let leadId: string | null = null;
    try {
      const lead = await prisma.ramadanPlannerLead.create({
        data: {
          email,
          firstName,
          country,
          interestedInUmrah: interestedInUmrah || false,
          source: "ramadan-planner-2026",
        },
      });
      leadId = lead.id;
    } catch (dbError: any) {
      // If duplicate email or table doesn't exist, log and continue
      console.log("Database note:", dbError.message);
      console.log("New Ramadan Planner Lead:", {
        email,
        firstName,
        country,
        interestedInUmrah,
        timestamp: new Date().toISOString(),
      });
    }

    // Send welcome email with planner
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = await getResend();
        if (resend) {
          const { subject, html } = getRamadanPlannerWelcomeEmail(firstName);
          
          await resend.emails.send({
            from: process.env.EMAIL_FROM || "MIC Utah <noreply@micutah.org>",
            to: email,
            subject,
            html,
          });

          // Update lead to mark email as sent
          if (leadId) {
            await prisma.ramadanPlannerLead.update({
              where: { id: leadId },
              data: { emailSent: true },
            });
          }

          console.log(`✓ Welcome email sent to ${email}`);
        }
      } catch (emailError: any) {
        console.error("Email send error:", emailError.message);
        // Don't fail the request if email fails - they can still download
      }
    } else {
      console.log("RESEND_API_KEY not set - skipping email");
    }

    return NextResponse.json({ 
      success: true,
      message: "Signup successful",
      downloadUrl: "/downloads/ramadan-planner-2026.pdf"
    });
  } catch (error) {
    console.error("Error processing ramadan planner signup:", error);
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

    const leads = await prisma.ramadanPlannerLead.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Stats
    const stats = {
      total: leads.length,
      interestedInUmrah: leads.filter(l => l.interestedInUmrah).length,
      byCountry: leads.reduce((acc: any, l) => {
        acc[l.country] = (acc[l.country] || 0) + 1;
        return acc;
      }, {}),
    };

    return NextResponse.json({ leads, stats });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
