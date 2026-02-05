import { NextResponse } from "next/server";
import { calculatePrayerTimes, DEFAULT_IQAMAH_TIMES } from "@/lib/prayer-times";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");

  const date = dateParam ? new Date(dateParam) : new Date();

  try {
    const prayerTimes = calculatePrayerTimes(date);

    return NextResponse.json({
      success: true,
      data: {
        ...prayerTimes,
        iqamah: DEFAULT_IQAMAH_TIMES,
      },
    });
  } catch (error) {
    console.error("Error calculating prayer times:", error);
    return NextResponse.json(
      { success: false, error: "Failed to calculate prayer times" },
      { status: 500 }
    );
  }
}
