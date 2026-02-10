import OpenAI from "openai";
import { CHATBOT_SYSTEM_PROMPT } from "@/lib/masjid-knowledge";
import { calculatePrayerTimes, DEFAULT_IQAMAH_TIMES } from "@/lib/prayer-times";
import { prisma } from "@/lib/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getContextData() {
  const now = new Date();
  const prayerTimes = calculatePrayerTimes(now);
  
  let upcomingEvents: any[] = [];
  let directoryListings: any[] = [];

  if (prisma) {
    try {
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
      directoryListings = await prisma.listing.findMany({
        where: { approved: true },
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
    directoryListings,
  };
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const context = await getContextData();

    const contextMessage = `
CURRENT TIME: ${context.currentTime}

TODAY'S PRAYER TIMES:
- Fajr: ${context.prayerTimes.fajr} (Iqamah: ${context.prayerTimes.iqamah.fajr})
- Dhuhr: ${context.prayerTimes.dhuhr} (Iqamah: ${context.prayerTimes.iqamah.dhuhr})
- Asr: ${context.prayerTimes.asr} (Iqamah: ${context.prayerTimes.iqamah.asr})
- Maghrib: ${context.prayerTimes.maghrib} (Iqamah: ${context.prayerTimes.iqamah.maghrib})
- Isha: ${context.prayerTimes.isha} (Iqamah: ${context.prayerTimes.iqamah.isha})

${context.upcomingEvents.length > 0 ? `UPCOMING EVENTS:\n${context.upcomingEvents.map((e: any) => `- ${e.title} on ${new Date(e.date).toLocaleDateString()}`).join("\n")}` : ""}
`;

    // Stream the response
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
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

    // Create a readable stream
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Assalamu alaikum, I'm having a moment of difficulty. Please try again.", {
      status: 500,
    });
  }
}
