"use client";

import Link from "next/link";
import { Moon, Heart, Target, Users, Utensils, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STRIPE_DONATE_LINK = "https://donate.stripe.com/7sIg20dTDevt22YbII";

const fundCategories = [
  {
    id: "iftar",
    title: "Daily Iftar Program",
    description: "Provide meals for community members breaking their fast",
    icon: Utensils,
    goal: 50000,
  },
  {
    id: "taraweeh",
    title: "Taraweeh & Qiyam",
    description: "Support our nightly prayer programs and Quran recitation",
    icon: Moon,
    goal: 15000,
  },
  {
    id: "education",
    title: "Ramadan Education",
    description: "Fund Islamic classes, lectures, and children's programs",
    icon: BookOpen,
    goal: 20000,
  },
  {
    id: "community",
    title: "Community Support",
    description: "Help families in need during the blessed month",
    icon: Users,
    goal: 35000,
  },
];

export default function RamadanDonationsPage() {
  const totalGoal = 120000;

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Moon className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Ramadan Donations
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Support our Ramadan programs and make this blessed month special for
            our entire community. Every donation multiplies in reward during Ramadan.
          </p>
        </div>

        {/* Goal Card */}
        <Card className="max-w-3xl mx-auto mb-12 bg-gradient-to-br from-primary to-primary-light text-white">
          <CardContent className="p-8 text-center">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <p className="text-white/80 text-lg mb-2">Ramadan 2026 Goal</p>
            <p className="text-5xl font-bold mb-6">
              ${totalGoal.toLocaleString()}
            </p>
            <a href={STRIPE_DONATE_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="xl" variant="secondary" className="gap-2 text-lg px-8">
                <Heart className="h-5 w-5" />
                Donate Now
                <ExternalLink className="h-5 w-5" />
              </Button>
            </a>
            <p className="text-white/60 text-sm mt-4">
              Secure payment via Stripe • Tax-deductible
            </p>
          </CardContent>
        </Card>

        {/* Fund Categories */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-primary mb-6 text-center">
            Your Donation Supports
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {fundCategories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{category.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                      <p className="text-primary font-semibold">
                        Goal: ${category.goal.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Iftar Sponsor CTA */}
        <Card className="max-w-3xl mx-auto mt-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Utensils className="h-10 w-10" />
              <div>
                <h3 className="font-semibold text-lg">Sponsor an Iftar</h3>
                <p className="text-sm text-white/80">
                  Feed 50+ community members for $150
                </p>
              </div>
            </div>
            <Link href="/ramadan/iftar-sponsor">
              <Button variant="secondary" className="whitespace-nowrap">
                Sponsor Iftar
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
