"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, DollarSign, RefreshCw, Receipt, Shield, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const donationCategories = [
  {
    id: "zakat",
    title: "Zakat",
    description: "Obligatory charity - purify your wealth",
    icon: Shield,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "sadaqah",
    title: "Sadaqah",
    description: "Voluntary charity for endless blessings",
    icon: Heart,
    color: "bg-red-100 text-red-700",
  },
  {
    id: "masjid",
    title: "Masjid Fund",
    description: "Support operations and maintenance",
    icon: DollarSign,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "ramadan",
    title: "Ramadan Special",
    description: "Support Ramadan programs",
    icon: Moon,
    color: "bg-purple-100 text-purple-700",
  },
];

const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

export default function DonatePage() {
  const [selectedCategory, setSelectedCategory] = useState("sadaqah");
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

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
      `In production, this would process a $${amount} ${
        isRecurring ? "monthly" : "one-time"
      } ${selectedCategory} donation. Thank you!`
    );
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Support Masjid Madina
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your generous donations help us maintain our 24/7 operations, support
            travelers, and serve the Salt Lake City Muslim community. Every
            contribution makes a difference.
          </p>
        </div>

        {/* Quick link to Ramadan donations */}
        <Card className="max-w-3xl mx-auto mb-8 bg-gradient-to-r from-primary to-primary-light text-white">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Moon className="h-10 w-10" />
              <div>
                <h3 className="font-semibold text-lg">Ramadan is Coming!</h3>
                <p className="text-sm text-white/80">
                  Special Ramadan donations and Iftar sponsorship available
                </p>
              </div>
            </div>
            <Link href="/ramadan/donations">
              <Button variant="secondary" className="whitespace-nowrap">
                Ramadan Donations
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>
                Choose your donation type and amount
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Donation Type Selection */}
                <div>
                  <Label className="text-base font-semibold">
                    Donation Type
                  </Label>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                    {donationCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-4 rounded-xl text-left transition-all ${
                          selectedCategory === category.id
                            ? "bg-primary text-white ring-2 ring-primary ring-offset-2"
                            : "bg-white border hover:border-primary"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                            selectedCategory === category.id
                              ? "bg-white/20"
                              : category.color
                          }`}
                        >
                          <category.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold">{category.title}</h3>
                        <p
                          className={`text-xs mt-1 ${
                            selectedCategory === category.id
                              ? "text-white/80"
                              : "text-gray-600"
                          }`}
                        >
                          {category.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* One-time vs Recurring */}
                <div>
                  <Label className="text-base font-semibold">
                    Donation Frequency
                  </Label>
                  <Tabs
                    value={isRecurring ? "recurring" : "onetime"}
                    onValueChange={(v) => setIsRecurring(v === "recurring")}
                    className="mt-3"
                  >
                    <TabsList className="w-full max-w-md">
                      <TabsTrigger value="onetime" className="flex-1">
                        One-Time
                      </TabsTrigger>
                      <TabsTrigger value="recurring" className="flex-1">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Monthly
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  {isRecurring && (
                    <p className="text-sm text-primary mt-2">
                      Monthly giving provides consistent support for our masjid
                    </p>
                  )}
                </div>

                {/* Amount Selection */}
                <div>
                  <Label className="text-base font-semibold">
                    Select Amount
                  </Label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-3">
                    {suggestedAmounts.map((value) => (
                      <Button
                        key={value}
                        type="button"
                        variant={
                          amount === value && !customAmount
                            ? "default"
                            : "outline"
                        }
                        size="lg"
                        onClick={() => handleAmountClick(value)}
                      >
                        ${value}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-4 max-w-xs">
                    <Label htmlFor="customAmount">Or enter custom amount</Label>
                    <div className="relative mt-2">
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

                {/* Contact Information */}
                <div>
                  <Label className="text-base font-semibold">
                    Your Information
                  </Label>
                  <div className="grid sm:grid-cols-2 gap-4 mt-3">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
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
                  </div>
                  <div className="mt-4 max-w-xs">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="(801) 555-1234"
                    />
                  </div>
                </div>

                {/* Summary and Submit */}
                <div className="border-t pt-6">
                  <div className="bg-cream rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Donation Type</p>
                        <p className="font-semibold capitalize">
                          {selectedCategory}
                        </p>
                      </div>
                      <Badge variant={isRecurring ? "secondary" : "outline"}>
                        {isRecurring ? "Monthly" : "One-time"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg">Total</span>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-primary">
                          ${amount.toLocaleString()}
                        </span>
                        {isRecurring && (
                          <span className="text-sm text-gray-600">/month</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="xl" className="w-full gap-2">
                    <Heart className="h-5 w-5" />
                    Complete Donation
                  </Button>

                  <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Secure Payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Receipt className="h-4 w-4" />
                      <span>Tax Deductible</span>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Zakat Eligible</h3>
                <p className="text-sm text-gray-600">
                  100% of Zakat donations go to eligible recipients
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Receipt className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Tax Deductible</h3>
                <p className="text-sm text-gray-600">
                  Receive a tax receipt for all donations
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Transparent Use</h3>
                <p className="text-sm text-gray-600">
                  Regular reports on how donations are used
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
