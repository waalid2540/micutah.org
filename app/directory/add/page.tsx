"use client";

import { useState } from "react";
import Link from "next/link";
import { Store, CheckCircle, ArrowLeft } from "lucide-react";
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
  "Grocery",
  "Services",
  "Automotive",
  "Real Estate",
  "Education",
  "Health",
  "Clothing",
  "Beauty & Salon",
  "Professional Services",
  "Other",
];

export default function AddBusinessPage() {
  const [submitted, setSubmitted] = useState(false);
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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an API/database
    console.log("Business submission:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-lg mx-auto text-center">
            <CardContent className="p-8">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-primary mb-4">
                Thank You!
              </h1>
              <p className="text-gray-600 mb-6">
                Your business has been submitted for review. We&apos;ll add it to our
                directory within 24-48 hours after verification.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                We may contact you at {formData.email} if we need any additional information.
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/directory">
                  <Button variant="outline">View Directory</Button>
                </Link>
                <Link href="/">
                  <Button>Back to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Back link */}
        <Link
          href="/directory"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-light mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Directory
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Store className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-primary mb-2">
              Add Your Business
            </h1>
            <p className="text-gray-600">
              List your halal business in our directory for free. Reach the Utah Muslim community.
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Fill out the form below. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Name */}
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    required
                    placeholder="e.g., Halal Bites Restaurant"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                  />
                </div>

                {/* Owner Name */}
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner/Contact Name *</Label>
                  <Input
                    id="ownerName"
                    required
                    placeholder="Your name"
                    value={formData.ownerName}
                    onChange={(e) =>
                      setFormData({ ...formData, ownerName: e.target.value })
                    }
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Business Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="(801) 555-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    required
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
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

                {/* Address & City */}
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    required
                    placeholder="1234 Main St"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    required
                    placeholder="Salt Lake City, UT"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website">Website (optional)</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourbusiness.com"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </div>

                {/* Hours */}
                <div className="space-y-2">
                  <Label htmlFor="hours">Business Hours *</Label>
                  <Input
                    id="hours"
                    required
                    placeholder="e.g., Mon-Sat 9AM-9PM, Sun Closed"
                    value={formData.hours}
                    onChange={(e) =>
                      setFormData({ ...formData, hours: e.target.value })
                    }
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Business Description *</Label>
                  <Textarea
                    id="description"
                    required
                    rows={4}
                    placeholder="Tell us about your business, products/services, what makes you unique..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                  <p className="text-xs text-gray-500">
                    Maximum 300 characters. Be clear and concise.
                  </p>
                </div>

                {/* Terms */}
                <div className="bg-cream p-4 rounded-lg text-sm text-gray-600">
                  <p>
                    By submitting, you confirm that:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Your business serves halal products/services or is Muslim-owned</li>
                    <li>All information provided is accurate</li>
                    <li>You have authority to list this business</li>
                  </ul>
                </div>

                {/* Submit */}
                <Button type="submit" size="lg" className="w-full">
                  Submit Business for Review
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Questions? Contact us at{" "}
              <a href="mailto:info@micutah.org" className="text-primary hover:underline">
                info@micutah.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
