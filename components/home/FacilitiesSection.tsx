"use client";

import {
  Truck,
  Droplets,
  Car,
  Wifi,
  ThermometerSun,
  Baby,
  Accessibility,
  Clock,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const facilities = [
  {
    icon: Truck,
    title: "Truck Parking",
    description: "Large lot accommodates big rigs and commercial vehicles",
    large: true,
    bgClass: "bg-gradient-to-br from-primary to-primary-light text-white",
    iconBg: "bg-white/20",
    iconColor: "text-white",
    titleColor: "text-white",
    descColor: "text-white/80",
  },
  {
    icon: Clock,
    title: "24/7 Open",
    description: "Always open for travelers and night prayers",
    large: true,
    bgClass: "bg-gradient-to-br from-accent-dark to-accent text-white",
    iconBg: "bg-white/20",
    iconColor: "text-white",
    titleColor: "text-white",
    descColor: "text-white/80",
  },
  {
    icon: Car,
    title: "Ample Parking",
    description: "Free parking with easy access for all vehicles",
    large: false,
    bgClass: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    titleColor: "text-gray-800",
    descColor: "text-gray-600",
  },
  {
    icon: Droplets,
    title: "Wudu Facilities",
    description: "Clean ablution areas for brothers and sisters",
    large: false,
    bgClass: "bg-cyan-50",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    titleColor: "text-gray-800",
    descColor: "text-gray-600",
  },
  {
    icon: ThermometerSun,
    title: "Climate Controlled",
    description: "Air conditioning in summer, heating in winter",
    large: false,
    bgClass: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    titleColor: "text-gray-800",
    descColor: "text-gray-600",
  },
  {
    icon: Baby,
    title: "Family Friendly",
    description: "Dedicated sisters area and children-friendly spaces",
    large: false,
    bgClass: "bg-pink-50",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    titleColor: "text-gray-800",
    descColor: "text-gray-600",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "Stay connected while you visit",
    large: false,
    bgClass: "bg-violet-50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    titleColor: "text-gray-800",
    descColor: "text-gray-600",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description: "Wheelchair accessible entrance and facilities",
    large: false,
    bgClass: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    titleColor: "text-gray-800",
    descColor: "text-gray-600",
  },
];

export default function FacilitiesSection() {
  const ref = useScrollAnimation();

  return (
    <section id="facilities" className="py-20 bg-white wave-divider wave-divider-cream" ref={ref}>
      <div className="container mx-auto px-4 pb-8">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Everything You Need
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mt-2 mb-4">
            Our Facilities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need for a comfortable visit, whether you&apos;re a
            traveler stopping for prayer or a regular community member.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {facilities.map((facility, i) => (
            <div
              key={facility.title}
              className={`animate-on-scroll stagger-${i + 1} ${
                facility.large ? "col-span-2" : ""
              } ${
                facility.bgClass
              } rounded-2xl p-6 card-hover-lift`}
            >
              <div
                className={`${facility.iconBg} rounded-xl w-12 h-12 flex items-center justify-center mb-4`}
              >
                <facility.icon className={`h-6 w-6 ${facility.iconColor}`} />
              </div>
              <h3
                className={`font-semibold text-lg mb-1 ${facility.titleColor}`}
              >
                {facility.title}
              </h3>
              <p className={`text-sm ${facility.descColor}`}>
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
