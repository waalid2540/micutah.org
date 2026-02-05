"use client";

import { useState } from "react";
import { Moon, Heart, Target, Users, Utensils, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const fundCategories = [
  {
    id: "iftar",
    title: "Daily Iftar Program",
    description: "Provide meals for community members breaking their fast",
    icon: Utensils,
    goal: 20000,
    raised: 14500,
  },
  {
    id: "taraweeh",
    title: "Taraweeh & Qiyam",
    description: "Support our nightly prayer programs and Quran recitation",
    icon: Moon,
    goal: 5000,
    raised: 3200,
  },
  {
    id: "education",
    title: "Ramadan Education",
    description: "Fund Islamic classes, lectures, and children's programs",
    icon: BookOpen,
    goal: 8000,
    raised: 5100,
  },
  {
    id: "community",
    title: "Community Support",
    description: "Help families in need during the blessed month",
    icon: Users,
    goal: 15000,
    raised: 9700,
  },
];

const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

export default function RamadanDonationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const totalGoal = fundCategories.reduce((sum, cat) => sum + cat.goal, 0);
  const totalRaised = fundCategories.reduce((sum, cat) => sum + cat.raised, 0);
  const overallProgress = Math.round((totalRaised / totalGoal) * 100);

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0) {
      setAmount(num);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would create a Stripe checkout session
    alert(
      `In production, this would process a $${amount} donation for ${
        selectedCategory || "general Ramadan fund"
      }. Thank you!`
    );
  };

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

        {/* Overall Progress */}
        <Card className="max-w-3xl mx-auto mb-12">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Total Raised</p>
                <p className="text-3xl font-bold text-primary">
                  ${totalRaised.toLocaleString()}
                </p>
              </div>
              <Target className="h-12 w-12 text-accent" />
              <div className="text-right">
                <p className="text-sm text-gray-600">Goal</p>
                <p className="text-3xl font-bold text-gray-400">
                  ${totalGoal.toLocaleString()}
                </p>
              </div>
            </div>
            <Progress value={overallProgress} className="h-4" />
            <p className="text-center text-sm text-gray-600 mt-2">
              {overallProgress}% of our Ramadan goal reached
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Fund Categories */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Choose a Fund
            </h2>
            {fundCategories.map((category) => {
              const progress = Math.round(
                (category.raised / category.goal) * 100
              );
              return (
                <Card
                  key={category.id}
                  className={`cursor-pointer transition-all ${
                    selectedCategory === category.id
                      ? "ring-2 ring-primary ring-offset-2"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 rounded-lg p-3">
                        <category.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {category.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {category.description}
                            </p>
                          </div>
                          {selectedCategory === category.id && (
                            <div className="bg-primary text-white rounded-full p-1">
                              <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>${category.raised.toLocaleString()} raised</span>
                            <span>${category.goal.toLocaleString()} goal</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <Card
              className={`cursor-pointer transition-all ${
                selectedCategory === null
                  ? "ring-2 ring-primary ring-offset-2"
                  : "hover:shadow-md"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-accent/20 rounded-lg p-3">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      General Ramadan Fund
                    </h3>
                    <p className="text-sm text-gray-600">
                      Let us allocate your donation where it&apos;s needed most
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donation Form */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-accent" />
                  Make a Donation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Amount Selection */}
                  <div>
                    <Label>Select Amount</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {suggestedAmounts.map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant={amount === value && !customAmount ? "default" : "outline"}
                          onClick={() => handleAmountClick(value)}
                        >
                          ${value}
                        </Button>
                      ))}
                    </div>
                    <div className="mt-3">
                      <Label htmlFor="customAmount">Custom Amount</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <Input
                          id="customAmount"
                          type="number"
                          min="1"
                          value={customAmount}
                          onChange={(e) =>
                            handleCustomAmountChange(e.target.value)
                          }
                          className="pl-8"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
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
                      required
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
                      Make this donation anonymous
                    </Label>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ${amount.toLocaleString()}
                      </span>
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2">
                      <Heart className="h-5 w-5" />
                      Donate Now
                    </Button>

                    <p className="text-xs text-gray-500 text-center mt-3">
                      All donations are tax-deductible. You will receive a receipt via email.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
