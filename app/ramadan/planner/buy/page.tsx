"use client";

import { Check, Download, Star, Clock, BookOpen, Calendar, Heart, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const STRIPE_BUY_LINK = "https://donate.stripe.com/7sIg20dTDevt22YbII";

const features = [
  "30-Day Ramadan Tracker",
  "Daily Quran Reading Schedule",
  "Iftar & Suhoor Meal Planner",
  "Dua Checklist for Each Day",
  "Last 10 Nights Special Section",
  "Gratitude & Reflection Journal",
  "Prayer Time Log",
  "Sadaqah & Charity Tracker",
  "Printable Format (40+ Pages)",
  "Instant PDF Download",
];

const testimonials = [
  { name: "Fatima S.", text: "This planner changed my Ramadan completely. So organized!" },
  { name: "Ahmed M.", text: "Best $10 I spent. My whole family uses it now." },
  { name: "Khadija R.", text: "The Last 10 Nights section is amazing. JazakAllah khair!" },
];

export default function BuyPlannerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white">
      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-amber-500 text-black text-sm font-bold px-4 py-1 rounded-full mb-6">
            🔥 RAMADAN STARTS IN 8 DAYS - GET READY NOW
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Ultimate
            <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Ramadan Planner 2026
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Make this your most organized, productive & spiritually fulfilling Ramadan ever. 
            40+ pages of daily tracking, duas, meal planning & more.
          </p>

          {/* Price */}
          <div className="mb-8">
            <span className="text-gray-400 line-through text-2xl">$19</span>
            <span className="text-5xl font-bold text-amber-400 ml-4">$10</span>
            <span className="text-gray-400 ml-2">USD</span>
          </div>

          <a href={STRIPE_BUY_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="xl" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-lg px-12 py-6 gap-3">
              <Download className="h-6 w-6" />
              Get Instant Access
              <ExternalLink className="h-5 w-5" />
            </Button>
          </a>
          
          <p className="text-gray-400 text-sm mt-4">
            ✓ Instant PDF Download &nbsp; ✓ Print Unlimited Copies &nbsp; ✓ Secure Payment
          </p>
        </div>
      </section>

      {/* Preview */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <BookOpen className="h-10 w-10 text-amber-400 mx-auto mb-3" />
                <h3 className="font-semibold text-lg">40+ Pages</h3>
                <p className="text-gray-400 text-sm">Comprehensive tracking</p>
              </div>
              <div>
                <Calendar className="h-10 w-10 text-amber-400 mx-auto mb-3" />
                <h3 className="font-semibold text-lg">30 Days Covered</h3>
                <p className="text-gray-400 text-sm">Full Ramadan journey</p>
              </div>
              <div>
                <Clock className="h-10 w-10 text-amber-400 mx-auto mb-3" />
                <h3 className="font-semibold text-lg">Instant Download</h3>
                <p className="text-gray-400 text-sm">Start planning today</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need for a Perfect Ramadan
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 rounded-lg p-4">
                <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Muslims Are Saying
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-white/10 border-0">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">&quot;{t.text}&quot;</p>
                  <p className="font-semibold text-amber-400">— {t.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-8 border border-amber-500/30">
            <h2 className="text-3xl font-bold mb-4">
              Don&apos;t Enter Ramadan Unprepared
            </h2>
            <p className="text-gray-300 mb-6">
              Only 8 days left. Get your planner now and start Ramadan with clarity and intention.
            </p>
            
            <div className="mb-6">
              <span className="text-gray-400 line-through text-xl">$19</span>
              <span className="text-4xl font-bold text-amber-400 ml-3">$10</span>
            </div>

            <a href={STRIPE_BUY_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="xl" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-lg px-12 py-6 gap-3">
                <Heart className="h-6 w-6" />
                Get My Planner Now
              </Button>
            </a>
            
            <p className="text-gray-500 text-sm mt-6">
              100% of profits support Madina Islamic Center
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-gray-500">
        <p>© 2026 MIC Utah · Madina Islamic Center</p>
      </footer>
    </div>
  );
}
