"use client";

import { useState } from "react";
import { Calendar, Heart, Utensils, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const STRIPE_DONATE_LINK = "https://donate.stripe.com/7sIg20dTDevt22YbII";

// Ramadan 2026 dates (Feb 28 - March 29)
const ramadanDates = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 1, 28 + i); // Feb 28, 2026
  if (date.getMonth() > 2) return null; // Stop after March
  return {
    day: i + 1,
    date: date.toISOString().split("T")[0],
    displayDate: date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    available: true,
  };
}).filter(Boolean);

export default function IftarSponsorPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open Stripe with the selected date info
    window.open(STRIPE_DONATE_LINK, "_blank");
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Utensils className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Sponsor an Iftar
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Feed the community and earn the reward of everyone who breaks their
            fast at Madina Islamic Center. Each sponsorship provides a complete Iftar meal
            for 50+ community members.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Date Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Select a Date to Sponsor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {ramadanDates.map((day: any) => (
                    <button
                      key={day.day}
                      onClick={() => setSelectedDate(day.date)}
                      className={`p-3 rounded-lg text-center transition-all ${
                        selectedDate === day.date
                          ? "bg-primary text-white ring-2 ring-primary ring-offset-2"
                          : "bg-white hover:bg-primary/10 border"
                      }`}
                    >
                      <p className="text-xs opacity-70">Ramadan</p>
                      <p className="text-2xl font-bold">{day.day}</p>
                      <p className="text-xs mt-1">{day.displayDate.split(",")[0]}</p>
                    </button>
                  ))}
                </div>

                {selectedDate && (
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <p className="text-primary font-semibold flex items-center gap-2">
                      <Check className="h-5 w-5" />
                      You selected: Ramadan{" "}
                      {ramadanDates.find((d: any) => d.date === selectedDate)?.day}
                      {" - "}
                      {ramadanDates.find((d: any) => d.date === selectedDate)?.displayDate}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sponsorship Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Sponsorship Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="(801) 555-1234"
                      required
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Sponsorship Amount</span>
                      <span className="text-2xl font-bold text-primary">
                        $150
                      </span>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2"
                      disabled={!selectedDate}
                    >
                      <Heart className="h-5 w-5" />
                      Sponsor This Iftar
                      <ExternalLink className="h-4 w-4" />
                    </Button>

                    {!selectedDate && (
                      <p className="text-sm text-amber-600 text-center mt-2">
                        Please select a date above
                      </p>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">What&apos;s Included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Dates & water for 50+ people
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Full dinner meal
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Name announcement (optional)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Tax-deductible receipt
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Reward of all who break fast
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
