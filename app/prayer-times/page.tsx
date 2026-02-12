"use client";

import { useState, useEffect } from "react";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { Calendar, Clock, ChevronLeft, ChevronRight, Bell, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculatePrayerTimes, getNextPrayer, getHijriDate } from "@/lib/prayer-times";
import { formatTime } from "@/lib/utils";

interface PrayerTime {
  name: string;
  adhan: string;
  isNext: boolean;
}

export default function PrayerTimesPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);
  const [hijriDate, setHijriDate] = useState("");

  useEffect(() => {
    const times = calculatePrayerTimes(currentDate);
    const next = getNextPrayer(times);
    setHijriDate(getHijriDate(currentDate));

    const prayerList: PrayerTime[] = [
      { name: "Fajr", adhan: times.fajr, isNext: next.name === "Fajr" },
      { name: "Sunrise", adhan: times.sunrise, isNext: next.name === "Sunrise" },
      { name: "Dhuhr", adhan: times.dhuhr, isNext: next.name === "Dhuhr" },
      { name: "Asr", adhan: times.asr, isNext: next.name === "Asr" },
      { name: "Maghrib", adhan: times.maghrib, isNext: next.name === "Maghrib" },
      { name: "Isha", adhan: times.isha, isNext: next.name === "Isha" },
    ];

    setPrayerTimes(prayerList);
    setNextPrayer(next);
  }, [currentDate]);

  const goToPreviousDay = () => setCurrentDate(addDays(currentDate, -1));
  const goToNextDay = () => setCurrentDate(addDays(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Generate monthly calendar
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">
            Prayer Times
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <MapPin className="h-5 w-5" />
            <span>Salt Lake City, UT - Madina Islamic Center</span>
          </div>
        </div>

        {/* Date selector */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={goToPreviousDay}>
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-primary">
                  {format(currentDate, "EEEE, MMMM d, yyyy")}
                </p>
                <p className="text-sm text-gray-600 font-arabic">{hijriDate}</p>
              </div>

              <Button variant="ghost" onClick={goToNextDay}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {format(currentDate, "yyyy-MM-dd") !== format(new Date(), "yyyy-MM-dd") && (
              <div className="text-center mt-4">
                <Button variant="outline" size="sm" onClick={goToToday}>
                  Go to Today
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="w-full max-w-md mx-auto">
            <TabsTrigger value="daily" className="flex-1">Daily View</TabsTrigger>
            <TabsTrigger value="monthly" className="flex-1">Monthly View</TabsTrigger>
          </TabsList>

          {/* Daily View */}
          <TabsContent value="daily">
            {/* Next Prayer Highlight */}
            {nextPrayer && (
              <Card className="bg-primary text-white mb-8">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/70">Next Prayer</p>
                      <p className="text-3xl font-heading font-bold">{nextPrayer.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold">{formatTime(nextPrayer.time)}</p>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="mt-2 gap-2"
                      >
                        <Bell className="h-4 w-4" />
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Prayer Times Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prayerTimes.map((prayer) => (
                <Card
                  key={prayer.name}
                  className={`${
                    prayer.isNext ? "ring-2 ring-primary ring-offset-2" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-heading font-semibold text-primary">
                        {prayer.name}
                      </h3>
                      {prayer.isNext && (
                        <Badge variant="default">Next</Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Time</span>
                      <span className="text-2xl font-bold">
                        {formatTime(prayer.adhan)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Jummah Prayer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">First Khutbah</p>
                    <p className="text-xl font-bold">1:00 PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Second Khutbah</p>
                    <p className="text-xl font-bold">2:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monthly View */}
          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  {format(currentDate, "MMMM yyyy")} Prayer Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2">Fajr</th>
                        <th className="p-2">Sunrise</th>
                        <th className="p-2">Dhuhr</th>
                        <th className="p-2">Asr</th>
                        <th className="p-2">Maghrib</th>
                        <th className="p-2">Isha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthDays.map((day) => {
                        const times = calculatePrayerTimes(day);
                        const isToday =
                          format(day, "yyyy-MM-dd") ===
                          format(new Date(), "yyyy-MM-dd");
                        return (
                          <tr
                            key={day.toISOString()}
                            className={`border-b ${
                              isToday ? "bg-primary/10 font-semibold" : ""
                            }`}
                          >
                            <td className="p-2">
                              {format(day, "EEE, MMM d")}
                            </td>
                            <td className="p-2 text-center">
                              {formatTime(times.fajr)}
                            </td>
                            <td className="p-2 text-center">
                              {formatTime(times.sunrise)}
                            </td>
                            <td className="p-2 text-center">
                              {formatTime(times.dhuhr)}
                            </td>
                            <td className="p-2 text-center">
                              {formatTime(times.asr)}
                            </td>
                            <td className="p-2 text-center">
                              {formatTime(times.maghrib)}
                            </td>
                            <td className="p-2 text-center">
                              {formatTime(times.isha)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Calculation Method Info */}
        <Card className="mt-8 bg-cream-dark border-none">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-primary mb-2">
                  Calculation Method
                </h3>
                <p className="text-sm text-gray-600">
                  Prayer times are calculated using the Islamic Finder / ISNA method 
                  (15° for Fajr and Isha) with Shafi'i jurisprudence for Asr.
                  Coordinates: 40.7718°N, 111.9298°W (Salt Lake City, UT)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
