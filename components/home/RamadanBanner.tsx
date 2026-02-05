"use client";

import Link from "next/link";
import { Moon, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRamadanCountdown } from "@/lib/prayer-times";

export default function RamadanBanner() {
  const { days, isRamadan } = getRamadanCountdown();

  if (isRamadan) {
    return (
      <section className="relative bg-gradient-to-r from-primary via-primary-light to-primary py-10 overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer bg-[length:200%_100%]" />

        {/* Decorative crescent SVG */}
        <svg
          className="absolute right-8 top-1/2 -translate-y-1/2 w-24 h-24 text-white/10"
          viewBox="0 0 100 100"
        >
          <path
            d="M50 5 C72 5, 90 23, 90 50 C90 77, 72 95, 50 95 C62 85, 68 68, 68 50 C68 32, 62 15, 50 5Z"
            fill="currentColor"
          />
        </svg>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5 text-white">
              <div className="bg-accent/20 rounded-2xl p-4">
                <Moon className="h-10 w-10 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-heading font-bold">
                  Ramadan Mubarak!
                </h2>
                <p className="text-white/80">
                  Join us for Iftar, Taraweeh, and special programs
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/ramadan/iftar-sponsor">
                <Button size="lg" variant="secondary" className="gap-2 shadow-lg">
                  <Heart className="h-5 w-5" />
                  Sponsor Iftar
                </Button>
              </Link>
              <Link href="/ramadan">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Ramadan Schedule
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (days <= 30 && days > 0) {
    return (
      <section className="relative bg-gradient-to-r from-accent/20 via-accent/30 to-accent/20 py-8 overflow-hidden">
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]" />

        {/* Decorative crescent SVG */}
        <svg
          className="absolute right-8 top-1/2 -translate-y-1/2 w-20 h-20 text-accent/20"
          viewBox="0 0 100 100"
        >
          <path
            d="M50 5 C72 5, 90 23, 90 50 C90 77, 72 95, 50 95 C62 85, 68 68, 68 50 C68 32, 62 15, 50 5Z"
            fill="currentColor"
          />
        </svg>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-5">
              <div className="bg-primary rounded-2xl p-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-heading font-bold text-primary">
                  Ramadan is Coming!
                </h2>
                <p className="text-gray-600">
                  <span className="text-4xl lg:text-5xl font-bold text-accent leading-none">
                    {days}
                  </span>{" "}
                  days until the blessed month
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link href="/ramadan/iftar-sponsor">
                <Button size="lg" className="gap-2 shadow-md">
                  <Heart className="h-5 w-5" />
                  Sponsor Iftar ($150)
                </Button>
              </Link>
              <Link href="/ramadan">
                <Button size="lg" variant="outline">
                  View Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
