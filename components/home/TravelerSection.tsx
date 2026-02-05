"use client";

import {
  Fuel,
  Plane,
  Building2,
  Navigation,
  Phone,
  Truck,
  Clock,
  Wifi,
  Droplets,
  ThermometerSun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const distanceMarkers = [
  { label: "Love's Truck Stop", distance: "Adjacent", icon: Fuel },
  { label: "SLC Airport", distance: "5 min", icon: Plane },
  { label: "Downtown SLC", distance: "10 min", icon: Building2 },
  { label: "I-80 Access", distance: "Direct", icon: Navigation },
];

const features = [
  { icon: Truck, title: "Free Truck Parking", desc: "Big rig friendly lot" },
  { icon: Clock, title: "Open 24/7", desc: "Never closed" },
  { icon: Droplets, title: "Wudu Facilities", desc: "Clean ablution areas" },
  { icon: ThermometerSun, title: "Climate Controlled", desc: "A/C & heating" },
  { icon: Wifi, title: "Free WiFi", desc: "Stay connected" },
  { icon: Fuel, title: "Near Fuel Stops", desc: "Love's & Flying J" },
];

export default function TravelerSection() {
  const ref = useScrollAnimation();

  return (
    <section className="py-20 bg-cream relative overflow-hidden" ref={ref}>
      {/* Decorative background elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Route map card */}
          <div className="animate-on-scroll-left">
            <div className="bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
              {/* Decorative pattern */}
              <div className="absolute inset-0 islamic-pattern opacity-5" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent text-sm font-medium tracking-wider uppercase">
                    Your Route to Prayer
                  </span>
                </div>

                <div className="space-y-0">
                  {distanceMarkers.map((marker, i) => (
                    <div key={marker.label} className="flex items-center gap-4">
                      {/* Timeline dot & line */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            i === 0
                              ? "bg-accent text-accent-foreground"
                              : "bg-white/15"
                          }`}
                        >
                          <marker.icon className="h-5 w-5" />
                        </div>
                        {i < distanceMarkers.length - 1 && (
                          <div className="w-0.5 h-12 bg-white/20 my-1" />
                        )}
                      </div>

                      {/* Label & distance */}
                      <div className="flex-1 flex items-center justify-between pb-4">
                        <span className="font-medium">{marker.label}</span>
                        <span
                          className={`text-sm font-bold px-3 py-1 rounded-full ${
                            i === 0
                              ? "bg-accent/20 text-accent"
                              : "bg-white/10 text-white/80"
                          }`}
                        >
                          {marker.distance}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white/70 text-sm">
                    Masjid Madina is conveniently located at the intersection of
                    I-80 and North Temple, making it the perfect stop for
                    travelers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="animate-on-scroll-right">
            <div className="inline-flex items-center gap-2 mb-4">
              <Fuel className="h-5 w-5 text-accent" />
              <span className="text-accent font-semibold text-sm tracking-wider uppercase">
                Traveler Friendly
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">
              Right Next to{" "}
              <span className="gradient-text">
                Love&apos;s Truck Stop
              </span>
            </h2>

            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              Whether you&apos;re a long-haul trucker, a traveler passing
              through, or flying in and out of SLC, Masjid Madina is your
              convenient stop for prayer and rest.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {features.map((feature, i) => (
                <div
                  key={feature.title}
                  className={`animate-on-scroll stagger-${i + 1} flex items-start gap-3 p-3 rounded-xl bg-white/60 hover:bg-white transition-colors`}
                >
                  <div className="bg-primary/10 rounded-lg p-2 flex-shrink-0">
                    <feature.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      {feature.title}
                    </p>
                    <p className="text-xs text-gray-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=1773+West+North+Temple+Salt+Lake+City+UT+84116"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2">
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </Button>
              </a>
              <a href="tel:+18015551234">
                <Button size="lg" variant="outline" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
