"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Phone,
  Globe,
  Clock,
  Store,
  UtensilsCrossed,
  ShoppingBag,
  Scissors,
  Car,
  Home,
  GraduationCap,
  Heart,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "All", icon: Store, count: 12 },
  { name: "Restaurants", icon: UtensilsCrossed, count: 4 },
  { name: "Grocery", icon: ShoppingBag, count: 3 },
  { name: "Services", icon: Scissors, count: 2 },
  { name: "Automotive", icon: Car, count: 1 },
  { name: "Real Estate", icon: Home, count: 1 },
  { name: "Education", icon: GraduationCap, count: 1 },
  { name: "Health", icon: Heart, count: 0 },
];

// Sample business listings
const businesses = [
  {
    id: "1",
    name: "Halal Bites Restaurant",
    category: "Restaurants",
    description: "Authentic Middle Eastern cuisine with fresh halal meat. Family owned since 2015.",
    address: "1850 W North Temple, Salt Lake City, UT",
    phone: "(801) 555-0101",
    website: "https://halalbites.com",
    hours: "11:00 AM - 10:00 PM",
    featured: true,
  },
  {
    id: "2",
    name: "Al-Madina Grocery",
    category: "Grocery",
    description: "Fresh halal meat, Middle Eastern groceries, spices, and imported goods.",
    address: "2100 S State St, Salt Lake City, UT",
    phone: "(801) 555-0102",
    hours: "9:00 AM - 9:00 PM",
    featured: true,
  },
  {
    id: "3",
    name: "Sahara Mediterranean Grill",
    category: "Restaurants",
    description: "Mediterranean and Pakistani cuisine. Catering available for events.",
    address: "3300 S Highland Dr, Salt Lake City, UT",
    phone: "(801) 555-0103",
    website: "https://saharagrill.com",
    hours: "11:00 AM - 9:00 PM",
    featured: false,
  },
  {
    id: "4",
    name: "Utah Halal Meat Market",
    category: "Grocery",
    description: "Fresh hand-slaughtered halal meat. Wholesale prices available.",
    address: "1500 W 3500 S, West Valley City, UT",
    phone: "(801) 555-0104",
    hours: "10:00 AM - 8:00 PM",
    featured: false,
  },
  {
    id: "5",
    name: "Noor Auto Repair",
    category: "Automotive",
    description: "Honest and reliable auto repair. Muslim owned and operated.",
    address: "4200 W 4100 S, West Valley City, UT",
    phone: "(801) 555-0105",
    hours: "8:00 AM - 6:00 PM",
    featured: false,
  },
  {
    id: "6",
    name: "Iqra Learning Center",
    category: "Education",
    description: "Quran classes, Arabic language, and Islamic studies for all ages.",
    address: "Near Madina Islamic Center",
    phone: "(801) 555-0106",
    hours: "By appointment",
    featured: false,
  },
  {
    id: "7",
    name: "Kabob House",
    category: "Restaurants",
    description: "Afghan and Persian kabobs, rice dishes, and fresh naan bread.",
    address: "2800 S Redwood Rd, Salt Lake City, UT",
    phone: "(801) 555-0107",
    hours: "11:00 AM - 10:00 PM",
    featured: false,
  },
  {
    id: "8",
    name: "Baraka Real Estate",
    category: "Real Estate",
    description: "Muslim realtor helping families find homes in Utah. Speaks Arabic & Urdu.",
    address: "Salt Lake City, UT",
    phone: "(801) 555-0108",
    hours: "By appointment",
    featured: false,
  },
  {
    id: "9",
    name: "Salam Grocery & Deli",
    category: "Grocery",
    description: "Halal deli, fresh produce, and international groceries.",
    address: "1200 E 3300 S, Salt Lake City, UT",
    phone: "(801) 555-0109",
    hours: "8:00 AM - 10:00 PM",
    featured: false,
  },
  {
    id: "10",
    name: "Jasmine Salon (Sisters Only)",
    category: "Services",
    description: "Women-only salon. Hijab-friendly environment. Hair, nails, and henna.",
    address: "West Valley City, UT",
    phone: "(801) 555-0110",
    hours: "10:00 AM - 7:00 PM",
    featured: false,
  },
  {
    id: "11",
    name: "Biryani Express",
    category: "Restaurants",
    description: "Authentic Pakistani biryani and curry dishes. Catering for large events.",
    address: "3500 S Redwood Rd, West Valley City, UT",
    phone: "(801) 555-0111",
    hours: "11:00 AM - 9:00 PM",
    featured: false,
  },
  {
    id: "12",
    name: "Muslim Tax Services",
    category: "Services",
    description: "Tax preparation and accounting. Knowledgeable about Zakat calculations.",
    address: "Salt Lake City, UT",
    phone: "(801) 555-0112",
    hours: "By appointment",
    featured: false,
  },
];

export default function DirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBusinesses = businesses.filter((business) => {
    const matchesCategory = selectedCategory === "All" || business.category === selectedCategory;
    const matchesSearch =
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort: featured first
  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Store className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Utah Halal Business Directory
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Support local Muslim-owned and halal businesses in Utah. Find restaurants,
            grocery stores, services, and more.
          </p>
          <Link href="/directory/add">
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Add Your Business - Free
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
              className="gap-2"
            >
              <category.icon className="h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-gray-600 mb-6">
          Showing {sortedBusinesses.length} {sortedBusinesses.length === 1 ? "business" : "businesses"}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </p>

        {/* Business Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBusinesses.map((business) => (
            <Card
              key={business.id}
              className={`hover:shadow-lg transition-shadow ${
                business.featured ? "border-2 border-accent ring-2 ring-accent/20" : ""
              }`}
            >
              <CardContent className="p-6">
                {business.featured && (
                  <Badge className="bg-accent text-accent-foreground mb-3">
                    Featured Business
                  </Badge>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading text-xl font-semibold text-primary">
                    {business.name}
                  </h3>
                </div>
                <Badge variant="outline" className="mb-3">
                  {business.category}
                </Badge>
                <p className="text-gray-600 text-sm mb-4">{business.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span>{business.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                    <a
                      href={`tel:${business.phone}`}
                      className="hover:text-primary transition-colors"
                    >
                      {business.phone}
                    </a>
                  </div>
                  {business.website && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Globe className="h-4 w-4 flex-shrink-0 text-primary" />
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors truncate"
                      >
                        Website
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{business.hours}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex gap-2">
                  <a href={`tel:${business.phone}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <Phone className="h-4 w-4" />
                      Call
                    </Button>
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      business.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <MapPin className="h-4 w-4" />
                      Directions
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedBusinesses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No businesses found matching your search.</p>
            <Link href="/directory/add">
              <Button>Add a Business</Button>
            </Link>
          </div>
        )}

        {/* CTA */}
        <Card className="mt-12 bg-primary text-white">
          <CardContent className="p-8 text-center">
            <Store className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold mb-4">
              Own a Halal Business in Utah?
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Get listed in our directory for free! Reach thousands of Muslims
              in Utah looking for halal products and services.
            </p>
            <Link href="/directory/add">
              <Button variant="secondary" size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Add Your Business - It&apos;s Free
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
