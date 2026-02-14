import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER;
const TWILIO_WHATSAPP = process.env.TWILIO_WHATSAPP_NUMBER; // e.g., "whatsapp:+14155238886"

// Helper to get all phone leads
async function getAllPhoneLeads(): Promise<{ name: string; phone: string }[]> {
  let leads: { name: string; phone: string }[] = [];

  // Try Recipe leads from DB
  try {
    const recipeLeads = await prisma.recipeLead.findMany();
    leads = recipeLeads.map((l) => ({ name: l.name, phone: l.phone }));
  } catch {
    // Try JSON file
    const leadsFile = path.join(process.cwd(), "data", "recipe-leads.json");
    if (fs.existsSync(leadsFile)) {
      const content = fs.readFileSync(leadsFile, "utf-8");
      const jsonLeads = JSON.parse(content);
      leads = jsonLeads.map((l: any) => ({ name: l.name, phone: l.phone }));
    }
  }

  // Remove duplicates by phone
  const uniquePhones = new Map<string, { name: string; phone: string }>();
  leads.forEach((l) => {
    const cleanPhone = l.phone.replace(/\D/g, "");
    if (cleanPhone.length >= 10) {
      uniquePhones.set(cleanPhone, { name: l.name, phone: cleanPhone });
    }
  });

  return Array.from(uniquePhones.values());
}

// Format phone for Twilio
function formatPhone(phone: string): string {
  const clean = phone.replace(/\D/g, "");
  if (clean.length === 10) return `+1${clean}`;
  if (clean.length === 11 && clean.startsWith("1")) return `+${clean}`;
  return `+${clean}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, phone, message, channel = "sms" } = body;

    // Verify Twilio is configured
    if (!TWILIO_PHONE && channel === "sms") {
      return NextResponse.json({ error: "Twilio SMS not configured" }, { status: 500 });
    }
    if (!TWILIO_WHATSAPP && channel === "whatsapp") {
      return NextResponse.json({ error: "Twilio WhatsApp not configured" }, { status: 500 });
    }

    // Send single message
    if (action === "send") {
      const from = channel === "whatsapp" ? TWILIO_WHATSAPP : TWILIO_PHONE;
      const to = channel === "whatsapp" ? `whatsapp:${formatPhone(phone)}` : formatPhone(phone);

      await client.messages.create({
        body: message,
        from,
        to,
      });

      return NextResponse.json({ success: true });
    }

    // Broadcast to all leads
    if (action === "broadcast") {
      const leads = await getAllPhoneLeads();
      
      if (leads.length === 0) {
        return NextResponse.json({ error: "No leads found" }, { status: 400 });
      }

      const from = channel === "whatsapp" ? TWILIO_WHATSAPP : TWILIO_PHONE;
      
      const results = await Promise.allSettled(
        leads.map((lead) => {
          const to = channel === "whatsapp" 
            ? `whatsapp:${formatPhone(lead.phone)}` 
            : formatPhone(lead.phone);
          
          // Personalize message
          const personalizedMsg = message.replace("{name}", lead.name || "there");
          
          return client.messages.create({
            body: personalizedMsg,
            from,
            to,
          });
        })
      );

      const sent = results.filter((r) => r.status === "fulfilled").length;
      const failed = results.filter((r) => r.status === "rejected").length;
      
      // Log failures
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error(`Failed to send to ${leads[i].phone}:`, r.reason);
        }
      });

      return NextResponse.json({ 
        success: true, 
        sent, 
        failed,
        total: leads.length 
      });
    }

    // Test message (send to single number)
    if (action === "test") {
      const from = channel === "whatsapp" ? TWILIO_WHATSAPP : TWILIO_PHONE;
      const to = channel === "whatsapp" 
        ? `whatsapp:${formatPhone(phone)}` 
        : formatPhone(phone);

      await client.messages.create({
        body: `[TEST] ${message}`,
        from,
        to,
      });

      return NextResponse.json({ success: true, message: "Test sent!" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("SMS/WhatsApp error:", error);
    return NextResponse.json({ 
      error: error.message || "Message failed" 
    }, { status: 500 });
  }
}

// GET - Return lead count and Twilio status
export async function GET() {
  const leads = await getAllPhoneLeads();
  
  return NextResponse.json({ 
    leadCount: leads.length,
    smsConfigured: !!TWILIO_PHONE,
    whatsappConfigured: !!TWILIO_WHATSAPP,
  });
}
