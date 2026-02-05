"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Upload, X } from "lucide-react";
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
  "Food & Catering",
  "Services",
  "Products",
  "Real Estate",
  "Jobs",
  "Other",
];

export default function PostListingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    priceType: "fixed",
    contactName: "",
    email: "",
    phone: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In production, this would submit to the API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert(
        "In production, your listing would be submitted for review. Thank you!"
      );
      router.push("/marketplace");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Back link */}
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-light mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-6 w-6" />
              Post a New Listing
            </CardTitle>
            <CardDescription>
              Share your products or services with the community. All listings
              are reviewed before being published.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-primary">Listing Details</h3>

                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="What are you offering?"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Provide details about your product or service..."
                    rows={6}
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        className="pl-8"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="priceType">Price Type</Label>
                    <Select
                      value={formData.priceType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, priceType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Price</SelectItem>
                        <SelectItem value="hourly">Per Hour</SelectItem>
                        <SelectItem value="daily">Per Day</SelectItem>
                        <SelectItem value="monthly">Per Month</SelectItem>
                        <SelectItem value="negotiable">Negotiable</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <Label>Images (optional)</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center mt-2">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop images here, or click to browse
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      Upload Images
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Max 5 images, 5MB each
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="font-semibold text-primary">Contact Information</h3>

                <div>
                  <Label htmlFor="contactName">Your Name *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    placeholder="How should buyers contact you?"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
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
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g., Near Masjid Madina, Salt Lake City"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="bg-cream-dark rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 rounded border-gray-300"
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    I confirm that this listing is halal and complies with
                    Islamic guidelines. I agree to the marketplace terms and
                    understand that listings are subject to review before
                    publication.
                  </Label>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Listing"}
                </Button>
                <Link href="/marketplace">
                  <Button type="button" variant="outline" size="lg">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
