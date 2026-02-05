"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Heart, CreditCard, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const donationTypes = [
  {
    title: "Zakat",
    description: "Fulfill your obligation and purify your wealth",
    icon: Heart,
  },
  {
    title: "Sadaqah",
    description: "Give voluntary charity for countless blessings",
    icon: CreditCard,
  },
  {
    title: "Monthly Giving",
    description: "Set up recurring donations for ongoing support",
    icon: RefreshCw,
  },
];

const impactCounters = [
  { target: 500, label: "Families Fed", suffix: "+" },
  { target: 24, label: "Hours Open", suffix: "/7" },
  { target: 1000, label: "Travelers Served", suffix: "+" },
  { target: 365, label: "Days a Year", suffix: "" },
];

const donationAmounts = [25, 50, 100, 150, 250, 500];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function DonationCTA() {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const ref = useScrollAnimation();

  return (
    <section
      className="py-20 relative overflow-hidden"
      ref={ref}
    >
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />
      <div className="absolute inset-0 islamic-pattern opacity-5" />

      {/* Decorative SVG elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Crescent moon */}
        <svg
          className="absolute top-10 right-10 w-32 h-32 text-white/5"
          viewBox="0 0 100 100"
        >
          <path
            d="M50 5 C72 5, 90 23, 90 50 C90 77, 72 95, 50 95 C62 85, 68 68, 68 50 C68 32, 62 15, 50 5Z"
            fill="currentColor"
          />
        </svg>
        {/* Geometric shape */}
        <svg
          className="absolute bottom-10 left-10 w-48 h-48 text-accent/5"
          viewBox="0 0 100 100"
        >
          <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="currentColor" />
        </svg>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white animate-on-scroll-left">
            <span className="text-accent font-semibold text-sm tracking-wider uppercase">
              Make a Difference
            </span>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold mt-2 mb-4">
              Support Your Masjid
            </h2>
            <p className="text-white/80 mb-8 text-lg max-w-lg">
              Your donations help us maintain our 24/7 services, support
              travelers, and serve the Salt Lake City Muslim community. Every
              contribution makes a difference.
            </p>

            {/* Impact counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {impactCounters.map((counter) => (
                <div key={counter.label} className="text-center">
                  <p className="text-3xl lg:text-4xl font-bold text-accent">
                    <AnimatedCounter
                      target={counter.target}
                      suffix={counter.suffix}
                    />
                  </p>
                  <p className="text-white/60 text-xs mt-1">{counter.label}</p>
                </div>
              ))}
            </div>

            {/* Donation types */}
            <div className="space-y-3 mb-8">
              {donationTypes.map((type) => (
                <div key={type.title} className="flex items-start gap-4">
                  <div className="bg-accent/20 rounded-lg p-2 flex-shrink-0">
                    <type.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{type.title}</h3>
                    <p className="text-sm text-white/60">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/donate">
              <Button
                size="xl"
                variant="secondary"
                className="gap-2 shadow-lg"
              >
                <Heart className="h-5 w-5" />
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Right content: Donation amount pills + cards */}
          <div className="animate-on-scroll-right">
            <div className="glass rounded-2xl p-6 lg:p-8">
              <h3 className="text-xl font-heading font-semibold text-white mb-6 text-center">
                Choose an Amount
              </h3>

              {/* Donation amount pills */}
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                      selectedAmount === amount
                        ? "bg-accent text-accent-foreground shadow-lg scale-105"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Impact description for selected amount */}
              <div className="bg-white/10 rounded-xl p-4 mb-6 text-center">
                <p className="text-4xl font-bold text-accent mb-1">
                  ${selectedAmount}
                </p>
                <p className="text-white/70 text-sm">
                  {selectedAmount <= 25 && "Helps keep the lights on for a day"}
                  {selectedAmount === 50 && "Supports utilities for a day"}
                  {selectedAmount === 100 && "Feeds 10 families at Iftar"}
                  {selectedAmount === 150 && "Sponsors one full Iftar"}
                  {selectedAmount === 250 && "Covers a week of operations"}
                  {selectedAmount >= 500 && "Monthly operating costs"}
                </p>
              </div>

              <Link href="/donate" className="block">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Donate ${selectedAmount}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
