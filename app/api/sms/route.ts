import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER;

// Store subscribers in memory for now (upgrade to database later)
let subscribers: { phone: string; name: string; createdAt: Date }[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, phone, name, message } = body;

    if (action === "subscribe") {
      // Add phone to subscriber list
      const exists = subscribers.find((s) => s.phone === phone);
      if (!exists) {
        subscribers.push({ phone, name: name || "", createdAt: new Date() });
      }

      // Send welcome SMS
      if (TWILIO_PHONE) {
        await client.messages.create({
          body: `Assalamu Alaikum ${name || ""}! Welcome to MIC Utah SMS updates. Reply STOP to unsubscribe.`,
          from: TWILIO_PHONE,
          to: phone,
        });
      }

      return NextResponse.json({ success: true, message: "Subscribed!" });
    }

    if (action === "send") {
      // Send single SMS
      if (!TWILIO_PHONE) {
        return NextResponse.json({ error: "Twilio not configured" }, { status: 500 });
      }

      await client.messages.create({
        body: message,
        from: TWILIO_PHONE,
        to: phone,
      });

      return NextResponse.json({ success: true });
    }

    if (action === "broadcast") {
      // Send to all subscribers
      if (!TWILIO_PHONE) {
        return NextResponse.json({ error: "Twilio not configured" }, { status: 500 });
      }

      const results = await Promise.allSettled(
        subscribers.map((sub) =>
          client.messages.create({
            body: message,
            from: TWILIO_PHONE,
            to: sub.phone,
          })
        )
      );

      const sent = results.filter((r) => r.status === "fulfilled").length;
      return NextResponse.json({ success: true, sent, total: subscribers.length });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("SMS error:", error);
    return NextResponse.json({ error: "SMS failed" }, { status: 500 });
  }
}

export async function GET() {
  // Return subscriber count (for admin)
  return NextResponse.json({ count: subscribers.length });
}
