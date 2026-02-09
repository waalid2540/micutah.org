"use client";

import { useState } from "react";
import Link from "next/link";
import { Store, CheckCircle, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Restaurants",
  "Grocery & Meat",
  "Services",
  "Professionals",
  "Education",
  "Health",
  "Clothing",
  "Beauty & Salon",
  "Other",
];

export default function AddBusinessPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    category: "",
    address: "",
    city: "",
    website: "",
    hours: "",
    description: "",
    isHalal: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/directory/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-2 border-green-500">
            <CardContent className="pt-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-green-700 mb-4">
                Submission Received!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for submitting <strong>{formData.businessName}</strong> to our directory.
                Our team at MIC Utah will review your submission and verify the business
                before it goes live.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <p className="font-semibold mb-2">What happens next:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    We will verify the business information
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    We might contact you for additional details
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    When approved, it will appear in the directory
                  </li>
                </ul>
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Review typically takes 1-3 business days.
              </p>
              <Link href="/directory">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Directory
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link 
          href="/directory" 
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Link>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Add Your Business</CardTitle>
            <CardDescription>
              Submit your halal business to the Utah Halal Directory. 
              All submissions are reviewed and verified by MIC Utah before being published.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Business Information</h3>
                
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleChange("businessName", e.target.value)}
                    required
                    placeholder="e.g., Halal Bites Restaurant"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Business Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    required
                    placeholder="Briefly describe your business, what you offer, and what makes it special..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="isHalal">Halal Information *</Label>
                  <Textarea
                    id="isHalal"
                    value={formData.isHalal}
                    onChange={(e) => handleChange("isHalal", e.target.value)}
                    required
                    placeholder="Explain what makes your business halal (e.g., all meat is halal certified, we use halal suppliers, etc.)"
                    rows={2}
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Contact Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ownerName">Owner/Manager Name *</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => handleChange("ownerName", e.target.value)}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Business Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                    placeholder="(801) 555-0123"
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website (optional)</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    placeholder="https://yourbusiness.com"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Location & Hours</h3>
                
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    required
                    placeholder="123 Main Street"
                  />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    required
                    placeholder="Salt Lake City, UT"
                  />
                </div>

                <div>
                  <Label htmlFor="hours">Business Hours</Label>
                  <Input
                    id="hours"
                    value={formData.hours}
                    onChange={(e) => handleChange("hours", e.target.value)}
                    placeholder="e.g., Mon-Sat 11AM-9PM, Closed Sunday"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> All submissions are reviewed by MIC Utah staff before 
                  being published. We might contact you to verify information. Listing is free 
                  for all halal businesses in Utah.
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit for Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
