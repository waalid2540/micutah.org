"use client";

import Image from "next/image";

const ramadanData = [
  { day: 1, weekday: "Wed", date: "Feb 18", fajr: "6:02", sunrise: "7:17", dhuhr: "12:41", asr: "3:39", maghrib: "6:06", isha: "7:22" },
  { day: 2, weekday: "Thu", date: "Feb 19", fajr: "6:00", sunrise: "7:16", dhuhr: "12:41", asr: "3:40", maghrib: "6:07", isha: "7:23" },
  { day: 3, weekday: "Fri", date: "Feb 20", fajr: "5:59", sunrise: "7:15", dhuhr: "12:41", asr: "3:41", maghrib: "6:09", isha: "7:24" },
  { day: 4, weekday: "Sat", date: "Feb 21", fajr: "5:58", sunrise: "7:13", dhuhr: "12:41", asr: "3:42", maghrib: "6:10", isha: "7:25" },
  { day: 5, weekday: "Sun", date: "Feb 22", fajr: "5:56", sunrise: "7:12", dhuhr: "12:41", asr: "3:43", maghrib: "6:11", isha: "7:26" },
  { day: 6, weekday: "Mon", date: "Feb 23", fajr: "5:55", sunrise: "7:10", dhuhr: "12:41", asr: "3:43", maghrib: "6:12", isha: "7:27" },
  { day: 7, weekday: "Tue", date: "Feb 24", fajr: "5:54", sunrise: "7:09", dhuhr: "12:41", asr: "3:44", maghrib: "6:13", isha: "7:29" },
  { day: 8, weekday: "Wed", date: "Feb 25", fajr: "5:52", sunrise: "7:07", dhuhr: "12:41", asr: "3:45", maghrib: "6:14", isha: "7:30" },
  { day: 9, weekday: "Thu", date: "Feb 26", fajr: "5:51", sunrise: "7:06", dhuhr: "12:40", asr: "3:46", maghrib: "6:16", isha: "7:31" },
  { day: 10, weekday: "Fri", date: "Feb 27", fajr: "5:49", sunrise: "7:04", dhuhr: "12:40", asr: "3:47", maghrib: "6:17", isha: "7:32" },
  { day: 11, weekday: "Sat", date: "Feb 28", fajr: "5:48", sunrise: "7:03", dhuhr: "12:40", asr: "3:47", maghrib: "6:18", isha: "7:33" },
  { day: 12, weekday: "Sun", date: "Mar 1", fajr: "5:46", sunrise: "7:01", dhuhr: "12:40", asr: "3:48", maghrib: "6:19", isha: "7:34" },
  { day: 13, weekday: "Mon", date: "Mar 2", fajr: "5:45", sunrise: "7:00", dhuhr: "12:40", asr: "3:49", maghrib: "6:20", isha: "7:35" },
  { day: 14, weekday: "Tue", date: "Mar 3", fajr: "5:43", sunrise: "6:58", dhuhr: "12:39", asr: "3:50", maghrib: "6:21", isha: "7:36" },
  { day: 15, weekday: "Wed", date: "Mar 4", fajr: "5:42", sunrise: "6:57", dhuhr: "12:39", asr: "3:50", maghrib: "6:22", isha: "7:37" },
  { day: 16, weekday: "Thu", date: "Mar 5", fajr: "5:40", sunrise: "6:55", dhuhr: "12:39", asr: "3:51", maghrib: "6:24", isha: "7:38" },
  { day: 17, weekday: "Fri", date: "Mar 6", fajr: "5:39", sunrise: "6:53", dhuhr: "12:39", asr: "3:52", maghrib: "6:25", isha: "7:40" },
  { day: 18, weekday: "Sat", date: "Mar 7", fajr: "5:37", sunrise: "6:52", dhuhr: "12:38", asr: "3:52", maghrib: "6:26", isha: "7:41" },
  { day: 19, weekday: "Sun", date: "Mar 8", fajr: "5:35", sunrise: "6:50", dhuhr: "12:38", asr: "3:53", maghrib: "6:27", isha: "7:42", dst: true },
  { day: 20, weekday: "Mon", date: "Mar 9", fajr: "6:34", sunrise: "7:49", dhuhr: "1:38", asr: "4:54", maghrib: "7:28", isha: "8:43" },
  { day: 21, weekday: "Tue", date: "Mar 10", fajr: "6:32", sunrise: "7:47", dhuhr: "1:38", asr: "4:54", maghrib: "7:29", isha: "8:44", lastTen: true, oddNight: true },
  { day: 22, weekday: "Wed", date: "Mar 11", fajr: "6:31", sunrise: "7:45", dhuhr: "1:37", asr: "4:55", maghrib: "7:30", isha: "8:45", lastTen: true },
  { day: 23, weekday: "Thu", date: "Mar 12", fajr: "6:29", sunrise: "7:44", dhuhr: "1:37", asr: "4:56", maghrib: "7:31", isha: "8:46", lastTen: true, oddNight: true },
  { day: 24, weekday: "Fri", date: "Mar 13", fajr: "6:27", sunrise: "7:42", dhuhr: "1:37", asr: "4:56", maghrib: "7:32", isha: "8:47", lastTen: true },
  { day: 25, weekday: "Sat", date: "Mar 14", fajr: "6:26", sunrise: "7:41", dhuhr: "1:37", asr: "4:57", maghrib: "7:33", isha: "8:49", lastTen: true, oddNight: true },
  { day: 26, weekday: "Sun", date: "Mar 15", fajr: "6:24", sunrise: "7:39", dhuhr: "1:36", asr: "4:58", maghrib: "7:35", isha: "8:50", lastTen: true },
  { day: 27, weekday: "Mon", date: "Mar 16", fajr: "6:22", sunrise: "7:37", dhuhr: "1:36", asr: "4:58", maghrib: "7:36", isha: "8:51", lastTen: true, oddNight: true },
  { day: 28, weekday: "Tue", date: "Mar 17", fajr: "6:20", sunrise: "7:36", dhuhr: "1:36", asr: "4:59", maghrib: "7:37", isha: "8:52", lastTen: true },
  { day: 29, weekday: "Wed", date: "Mar 18", fajr: "6:19", sunrise: "7:34", dhuhr: "1:36", asr: "4:59", maghrib: "7:38", isha: "8:53", lastTen: true, oddNight: true },
  { day: 30, weekday: "Thu", date: "Mar 19", fajr: "6:17", sunrise: "7:32", dhuhr: "1:35", asr: "5:00", maghrib: "7:39", isha: "8:54", lastTen: true },
];

export default function RamadanCalendarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 to-emerald-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-xl p-1">
                <Image
                  src="/images/logo.png"
                  alt="MIC Logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Ramadan 2026</h1>
                <p className="text-emerald-200">1447 AH • February 18 – March 19</p>
              </div>
            </div>
            <div className="text-right text-sm">
              <p className="font-semibold text-lg">Madina Islamic Center</p>
              <p className="text-emerald-200">1773 W North Temple, SLC, UT 84116</p>
              <p className="text-emerald-200">Near Love's & Flying J • Open 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="bg-emerald-700 py-3">
        <div className="container mx-auto px-4 flex justify-center gap-4">
          <a
            href="/ramadan/MIC-Ramadan-2026.png"
            download
            className="bg-white text-emerald-800 px-6 py-2 rounded-full font-semibold hover:bg-emerald-100 transition"
          >
            📥 Download for WhatsApp
          </a>
          <a
            href="/ramadan/MIC-Ramadan-2026.pdf"
            download
            className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-500 transition border border-emerald-400"
          >
            📄 Download PDF
          </a>
        </div>
      </div>

      {/* Calendar Table */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="py-3 px-2 text-left">Day</th>
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2 text-purple-300">Fajr</th>
                  <th className="py-3 px-2">Sunrise</th>
                  <th className="py-3 px-2">Dhuhr</th>
                  <th className="py-3 px-2">Asr</th>
                  <th className="py-3 px-2 text-orange-300">Maghrib</th>
                  <th className="py-3 px-2">Isha</th>
                </tr>
              </thead>
              <tbody>
                {ramadanData.map((row, idx) => (
                  <tr
                    key={row.day}
                    className={`
                      ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      ${row.lastTen ? "!bg-amber-50" : ""}
                      ${row.dst ? "!bg-yellow-100" : ""}
                      hover:bg-emerald-50 transition
                    `}
                  >
                    <td className="py-2 px-2 font-medium">{row.weekday}</td>
                    <td className="py-2 px-2 text-center font-bold text-emerald-700">
                      {row.day}
                      {row.oddNight && <span className="text-amber-500 ml-1">★</span>}
                    </td>
                    <td className="py-2 px-2 text-center text-gray-600">
                      {row.date}
                      {row.dst && <span className="text-orange-500 text-xs ml-1">*</span>}
                    </td>
                    <td className="py-2 px-2 text-center font-semibold text-purple-700">{row.fajr}</td>
                    <td className="py-2 px-2 text-center text-gray-500">{row.sunrise}</td>
                    <td className="py-2 px-2 text-center">{row.dhuhr}</td>
                    <td className="py-2 px-2 text-center">{row.asr}</td>
                    <td className="py-2 px-2 text-center font-bold text-orange-600">{row.maghrib}</td>
                    <td className="py-2 px-2 text-center">{row.isha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="bg-gray-100 px-4 py-3 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-50 border border-amber-300 rounded"></div>
              <span>Last 10 Nights</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-500">★</span>
              <span>Laylatul Qadr Nights</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500">*</span>
              <span>DST starts Mar 8</span>
            </div>
          </div>
        </div>

        {/* Eid Banner */}
        <div className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-6 text-center shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold">🎉 Eid ul-Fitr: Friday, March 20, 2026</h2>
          <p className="mt-2 text-amber-100">Join us for Eid prayer at Madina Islamic Center</p>
        </div>

        {/* Donate CTA */}
        <div className="mt-6 bg-white rounded-2xl p-6 text-center shadow-xl">
          <h3 className="text-xl font-bold text-emerald-800">🤲 Support Your Masjid This Ramadan</h3>
          <p className="text-gray-600 mt-2">Help us serve the community with iftar, programs, and more</p>
          <a
            href="/donate"
            className="inline-block mt-4 bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition"
          >
            Donate Now — micutah.org/donate
          </a>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-emerald-200 text-sm pb-8">
          <p>Source: Islamic Finder • ISNA Method (15°) • Standard Asr</p>
          <p className="mt-1">Madina Islamic Center — Salt Lake City's 24/7 Masjid</p>
        </div>
      </div>
    </div>
  );
}
