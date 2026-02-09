"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Heart, Utensils, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// Generate Ramadan dates (sample - would be calculated properly in production)
const ramadanDates = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2026, 2, 1 + i); // March 2026
  return {
    day: i + 1,
    date: date.toISOString().split("T")[0],
    displayDate: date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    available: Math.random() > 0.3, // Simulating availability
  };
});

export default function IftarSponsorPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    amount: 150,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) return;

    setIsSubmitting(true);

    // In production, this would create a Stripe checkout session
    // For now, we'll simulate the submission
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Would redirect to Stripe checkout in production
      alert("In production, this would redirect to Stripe checkout. Thank you for your sponsorship!");
      router.push("/ramadan");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
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
                  {ramadanDates.map((day) => (
                    <button
                      key={day.day}
                      onClick={() =>
                        day.available && setSelectedDate(day.date)
                      }
                      disabled={!day.available}
                      className={`p-3 rounded-lg text-center transition-all ${
                        selectedDate === day.date
                          ? "bg-primary text-white ring-2 ring-primary ring-offset-2"
                          : day.available
                          ? "bg-white hover:bg-primary/10 border"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <p className="text-xs text-opacity-70">Ramadan</p>
                      <p className="text-2xl font-bold">{day.day}</p>
                      <p className="text-xs mt-1">
                        {day.available ? (
                          day.displayDate.split(",")[0]
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            Taken
                          </Badge>
                        )}
                      </p>
                    </button>
                  ))}
                </div>

                {selectedDate && (
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <p className="text-primary font-semibold flex items-center gap-2">
                      <Check className="h-5 w-5" />
                      You selected: Ramadan{" "}
                      {ramadanDates.find((d) => d.date === selectedDate)?.day}
                      {" - "}
                      {
                        ramadanDates.find((d) => d.date === selectedDate)
                          ?.displayDate
                      }
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
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="(000) 000-0000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message (optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="In memory of... / On behalf of..."
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="anonymous" className="text-sm">
                      Keep my sponsorship anonymous
                    </Label>
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
                      disabled={!selectedDate || isSubmitting}
                    >
                      {isSubmitting ? (
                        "Processing..."
                      ) : (
                        <>
                          <Heart className="h-5 w-5" />
                          Sponsor This Iftar
                        </>
                      )}
                    </Button>
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
