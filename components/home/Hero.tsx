"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Clock, Truck, Heart, Moon, Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calculatePrayerTimes, getNextPrayer } from "@/lib/prayer-times";

const slides = [
  {
    id: 1,
    headline: "Welcome, Travelers",
    accent: "Stop & Pray",
    description:
      "A warm, welcoming masjid right next to Love's Truck Stop & Flying J. Serving travelers along I-80 and our local Salt Lake City community.",
    badges: ["OPEN 24/7", "Near Love's & Flying J"],
    image: "/images/masjid-1.jpg",
    cta: { label: "Navigate Here", href: "https://www.google.com/maps/dir/?api=1&destination=1773+West+North+Temple+Salt+Lake+City+UT+84116", icon: Navigation, external: true },
    ctaSecondary: { label: "View Prayer Times", href: "/prayer-times" },
  },
  {
    id: 2,
    headline: "Open 24/7",
    accent: "Always Welcome",
    description:
      "Free truck parking, clean wudu facilities, climate-controlled prayer halls, and free WiFi. Everything you need, any time of day or night.",
    badges: ["Free Truck Parking", "Clean Facilities"],
    image: "/images/masjid-2.jpg",
    cta: { label: "Our Facilities", href: "#facilities", icon: Truck, external: false },
    ctaSecondary: { label: "Get Directions", href: "https://www.google.com/maps/dir/?api=1&destination=1773+West+North+Temple+Salt+Lake+City+UT+84116" },
  },
  {
    id: 3,
    headline: "Ramadan at",
    accent: "Masjid Madina",
    description:
      "Join our vibrant community for Iftar, Taraweeh, and special Ramadan programs. Sponsor an Iftar and feed the community.",
    badges: ["Iftar Daily", "Taraweeh Nightly"],
    image: "/images/masjid-3.jpg",
    cta: { label: "Ramadan Programs", href: "/ramadan", icon: Moon, external: false },
    ctaSecondary: { label: "Sponsor Iftar", href: "/ramadan/iftar-sponsor" },
  },
  {
    id: 4,
    headline: "Support",
    accent: "Masjid Madina",
    description:
      "Your donations help us maintain 24/7 services, support travelers, and serve the Salt Lake City Muslim community. Every contribution matters.",
    badges: ["Zakat", "Sadaqah", "Monthly Giving"],
    image: "/images/masjid-1.jpg",
    cta: { label: "Donate Now", href: "/donate", icon: Heart, external: false },
    ctaSecondary: { label: "Learn More", href: "/about" },
  },
];

function formatTime(time24: string): string {
  const [h, m] = time24.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prayerData, setPrayerData] = useState<{
    times: { name: string; time: string }[];
    nextPrayer: string;
  } | null>(null);

  useEffect(() => {
    const pt = calculatePrayerTimes();
    const next = getNextPrayer(pt);
    setPrayerData({
      times: [
        { name: "Fajr", time: formatTime(pt.fajr) },
        { name: "Sunrise", time: formatTime(pt.sunrise) },
        { name: "Dhuhr", time: formatTime(pt.dhuhr) },
        { name: "Asr", time: formatTime(pt.asr) },
        { name: "Maghrib", time: formatTime(pt.maghrib) },
        { name: "Isha", time: formatTime(pt.isha) },
      ],
      nextPrayer: next.name,
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-[600px] max-h-[900px] overflow-hidden wave-divider">
      {/* Background slides with crossfade - real photos */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.image}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/80 to-primary/60" />
        </div>
      ))}

      {/* Decorative SVG shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute -top-20 -right-20 w-96 h-96 text-white/5 animate-float"
          viewBox="0 0 200 200"
        >
          <polygon
            points="100,10 40,180 190,60 10,60 160,180"
            fill="currentColor"
          />
        </svg>
        <svg
          className="absolute bottom-20 -left-10 w-64 h-64 text-white/5"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="90" fill="currentColor" />
        </svg>
        <svg
          className="absolute top-1/3 right-1/4 w-40 h-40 text-accent/10 animate-float"
          style={{ animationDelay: "1.5s" }}
          viewBox="0 0 100 100"
        >
          <path
            d="M50 5 C55 25, 80 30, 95 50 C80 70, 55 75, 50 95 C45 75, 20 70, 5 50 C20 30, 45 25, 50 5Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Islamic pattern overlay */}
      <div className="absolute inset-0 islamic-pattern opacity-5" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 lg:py-24 flex items-center min-h-[600px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left content */}
          <div className="space-y-6 text-white">
            {/* Badges */}
            <div
              className="flex flex-wrap gap-2 animate-fade-in"
              key={`badges-${currentSlide}`}
            >
              {slide.badges.map((badge) => (
                <Badge
                  key={badge}
                  variant="secondary"
                  className="bg-accent/90 text-accent-foreground text-sm px-4 py-1 backdrop-blur-sm"
                >
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Headline */}
            <h1
              className="text-4xl lg:text-6xl font-heading font-bold leading-tight animate-fade-in-up"
              key={`headline-${currentSlide}`}
            >
              {slide.headline}
              <span className="block gradient-text">{slide.accent}</span>
            </h1>

            {/* Description */}
            <p
              className="text-lg text-white/80 max-w-lg animate-fade-in-up"
              key={`desc-${currentSlide}`}
              style={{ animationDelay: "0.15s" }}
            >
              {slide.description}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 animate-fade-in-up"
              key={`cta-${currentSlide}`}
              style={{ animationDelay: "0.3s" }}
            >
              {slide.cta.external ? (
                <a
                  href={slide.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="xl"
                    variant="secondary"
                    className="gap-2 shadow-lg"
                  >
                    <slide.cta.icon className="h-5 w-5" />
                    {slide.cta.label}
                  </Button>
                </a>
              ) : (
                <Link href={slide.cta.href}>
                  <Button
                    size="xl"
                    variant="secondary"
                    className="gap-2 shadow-lg"
                  >
                    <slide.cta.icon className="h-5 w-5" />
                    {slide.cta.label}
                  </Button>
                </Link>
              )}
              <Link href={slide.ctaSecondary.href}>
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/50 text-white hover:bg-white hover:text-primary"
                >
                  {slide.ctaSecondary.label}
                </Button>
              </Link>
            </div>

            {/* Navigation dots */}
            <div className="flex gap-2 pt-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? "w-8 bg-accent"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right content - Prayer times card */}
          <div className="hidden lg:block">
            <div className="glass rounded-2xl p-6 lg:p-8 animate-float shadow-2xl">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <h2 className="text-2xl font-heading font-semibold text-white">
                    Today&apos;s Prayer Times
                  </h2>
                </div>
                <p className="text-white/60 text-sm">Salt Lake City, UT</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {prayerData?.times.map((prayer) => {
                  const isNext = prayer.name === prayerData.nextPrayer;
                  return (
                    <div
                      key={prayer.name}
                      className={`rounded-xl p-4 text-center transition-all ${
                        isNext
                          ? "bg-accent text-accent-foreground prayer-highlight shadow-lg"
                          : "bg-white/10 hover:bg-white/15"
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          isNext ? "text-accent-foreground/70" : "text-white/60"
                        }`}
                      >
                        {prayer.name}
                      </p>
                      <p className="text-xl font-semibold text-white">
                        {prayer.time}
                      </p>
                      {isNext && (
                        <p className="text-xs mt-1 font-medium">Next Prayer</p>
                      )}
                    </div>
                  );
                }) ?? (
                  // Loading state
                  <>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="rounded-xl p-4 bg-white/10 animate-pulse h-20"
                      />
                    ))}
                  </>
                )}
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                <Fuel className="h-4 w-4 text-accent" />
                <span className="text-white/70 text-sm">
                  Adjacent to Love&apos;s Truck Stop & Flying J
                </span>
              </div>

              <Link href="/prayer-times" className="block mt-4">
                <Button variant="secondary" className="w-full">
                  View Full Schedule
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
