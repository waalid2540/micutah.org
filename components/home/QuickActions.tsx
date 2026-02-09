"use client";

import Link from "next/link";
import {
  Heart,
  Calendar,
  ShoppingBag,
  BookOpen,
  MessageCircle,
  Users,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const largeActions = [
  {
    icon: Heart,
    title: "Donate",
    description: "Support our masjid with Zakat, Sadaqah, or general donations",
    href: "/donate",
    gradient: "from-red-500 to-rose-600",
    iconBg: "bg-white/20",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "View upcoming classes, lectures, and community events",
    href: "/events",
    gradient: "from-blue-500 to-indigo-600",
    iconBg: "bg-white/20",
  },
];

const smallActions = [
  {
    icon: ShoppingBag,
    title: "Halal Directory",
    description: "Browse halal products and services",
    href: "/directory",
    color: "bg-green-50 text-green-600",
    borderColor: "hover:border-green-200",
  },
  {
    icon: BookOpen,
    title: "Islamic Quizzes",
    description: "Test your knowledge",
    href: "/quizzes",
    color: "bg-purple-50 text-purple-600",
    borderColor: "hover:border-purple-200",
  },
  {
    icon: MessageCircle,
    title: "Contact Us",
    description: "Get in touch with us",
    href: "/contact",
    color: "bg-yellow-50 text-yellow-600",
    borderColor: "hover:border-yellow-200",
  },
  {
    icon: Users,
    title: "About Us",
    description: "Learn about our community",
    href: "/about",
    color: "bg-teal-50 text-teal-600",
    borderColor: "hover:border-teal-200",
  },
];

export default function QuickActions() {
  const ref = useScrollAnimation();

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Get Involved
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mt-2 mb-4">
            How Can We Help You?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our services and get involved with the Masjid Madina community
          </p>
        </div>

        {/* Top row: 2 large horizontal cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {largeActions.map((action, i) => (
            <Link key={action.title} href={action.href}>
              <div
                className={`animate-on-scroll stagger-${i + 1} group relative overflow-hidden rounded-2xl bg-gradient-to-r ${action.gradient} p-6 lg:p-8 text-white card-hover-lift cursor-pointer h-full`}
              >
                {/* Decorative circle */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full transition-transform group-hover:scale-125" />

                <div className="relative flex items-start gap-5">
                  <div
                    className={`${action.iconBg} rounded-xl p-4 flex-shrink-0`}
                  >
                    <action.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2 group-hover:translate-x-1 transition-transform">
                      {action.title}
                    </h3>
                    <p className="text-white/80 text-sm">{action.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom row: 4 smaller cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {smallActions.map((action, i) => (
            <Link key={action.title} href={action.href}>
              <div
                className={`animate-on-scroll stagger-${i + 3} group bg-white rounded-xl p-5 border border-gray-100 ${action.borderColor} card-hover-lift cursor-pointer h-full transition-colors`}
              >
                <div className={`rounded-lg p-2.5 w-fit mb-3 ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
