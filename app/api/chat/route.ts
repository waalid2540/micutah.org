import { NextResponse } from "next/server";
import OpenAI from "openai";
import { CHATBOT_SYSTEM_PROMPT } from "@/lib/masjid-knowledge";
import { calculatePrayerTimes, DEFAULT_IQAMAH_TIMES } from "@/lib/prayer-times";
import { prisma } from "@/lib/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getContextData() {
  const now = new Date();
  
  // Get today's prayer times
  const prayerTimes = calculatePrayerTimes(now);
  
  // Initialize empty arrays for database queries
  let upcomingEvents: any[] = [];
  let featuredListings: any[] = [];
  let directoryListings: any[] = [];

  // Only query database if prisma is available
  if (prisma) {
    try {
      // Get upcoming events (next 14 days)
      upcomingEvents = await prisma.event.findMany({
        where: {
          date: {
            gte: now,
            lte: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
          },
        },
        orderBy: { date: "asc" },
        take: 5,
      });
    } catch {}

    try {
      // Get featured marketplace listings
      featuredListings = await prisma.listing.findMany({
        where: {
          approved: true,
          featured: true,
        },
        take: 5,
      });
    } catch {}

    try {
      // Get recent directory businesses
      directoryListings = await prisma.listing.findMany({
        where: {
          approved: true,
        },
        take: 10,
        orderBy: { createdAt: "desc" },
      });
    } catch {}
  }

  return {
    currentTime: now.toLocaleString("en-US", { 
      timeZone: "America/Denver",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }),
    prayerTimes: {
      fajr: prayerTimes.fajr,
      sunrise: prayerTimes.sunrise,
      dhuhr: prayerTimes.dhuhr,
      asr: prayerTimes.asr,
      maghrib: prayerTimes.maghrib,
      isha: prayerTimes.isha,
      iqamah: DEFAULT_IQAMAH_TIMES,
    },
    upcomingEvents,
    featuredListings,
    directoryListings,
  };
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get real-time context
    const context = await getContextData();

    const contextMessage = `
CURRENT CONTEXT (${context.currentTime}):

TODAY'S PRAYER TIMES:
- Fajr: ${context.prayerTimes.fajr} (Iqamah: ${context.prayerTimes.iqamah.fajr})
- Sunrise: ${context.prayerTimes.sunrise}
- Dhuhr: ${context.prayerTimes.dhuhr} (Iqamah: ${context.prayerTimes.iqamah.dhuhr})
- Asr: ${context.prayerTimes.asr} (Iqamah: ${context.prayerTimes.iqamah.asr})
- Maghrib: ${context.prayerTimes.maghrib} (Iqamah: ${context.prayerTimes.iqamah.maghrib})
- Isha: ${context.prayerTimes.isha} (Iqamah: ${context.prayerTimes.iqamah.isha})

${context.upcomingEvents.length > 0 ? `
UPCOMING EVENTS:
${context.upcomingEvents.map((e: any) => `- ${e.title} on ${new Date(e.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}${e.location ? ` at ${e.location}` : ""}`).join("\n")}
` : ""}

${context.featuredListings.length > 0 ? `
FEATURED MARKETPLACE LISTINGS:
${context.featuredListings.map((l: any) => `- ${l.title} (${l.category})${l.price ? ` - $${l.price}` : ""}`).join("\n")}
` : ""}

${context.directoryListings.length > 0 ? `
DIRECTORY BUSINESSES:
${context.directoryListings.map((l: any) => `- ${l.title} (${l.category})`).join("\n")}
` : ""}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: CHATBOT_SYSTEM_PROMPT + "\n\n" + contextMessage,
        },
        ...messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

    return NextResponse.json({
      role: "assistant",
      content,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
