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
  Building2,
  GraduationCap,
  Heart,
  Plus,
  Star,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "All", icon: Store, slug: "all" },
  { name: "Restaurants", icon: UtensilsCrossed, slug: "restaurants" },
  { name: "Grocery & Meat", icon: ShoppingBag, slug: "grocery" },
  { name: "Services", icon: Scissors, slug: "services" },
  { name: "Professionals", icon: Building2, slug: "professionals" },
  { name: "Education", icon: GraduationCap, slug: "education" },
  { name: "Health", icon: Heart, slug: "health" },
];

// Real Utah Halal Businesses
const businesses = [
  {
    id: "1",
    name: "Shahrazad Market & Restaurant",
    category: "Restaurants",
    description: "Middle Eastern restaurant, marketplace, and Halal butcher shop. Authentic cuisine and fresh halal meat.",
    address: "1615 W 2100 S, Salt Lake City, UT 84119",
    phone: "(801) 975-7273",
    website: "https://shahrazadslc.com",
    hours: "9:00 AM - 7:00 PM (Restaurant 11 AM, closed Sundays)",
    verified: true,
    featured: true,
  },
  {
    id: "2",
    name: "Curry In A Hurry",
    category: "Restaurants",
    description: "Award-winning halal curries since 1998. Fast, flavorful Pakistani and Indian cuisine.",
    address: "2020 S State St, Salt Lake City, UT 84115",
    phone: "(801) 467-4137",
    website: "https://ilovecurryinahurry.com",
    hours: "11:00 AM - 9:00 PM",
    verified: true,
    featured: true,
  },
  {
    id: "3",
    name: "Habibi Grill",
    category: "Restaurants",
    description: "Authentic Pakistani food. Famous for Shinwari chicken karahi and delicious falooda.",
    address: "3355 S Redwood Rd, West Valley City, UT 84119",
    phone: "(801) 890-0012",
    website: "https://myhabibigrill.com",
    hours: "11:00 AM - 10:00 PM",
    verified: true,
    featured: false,
  },
  {
    id: "4",
    name: "Kabob Bros",
    category: "Restaurants",
    description: "Fresh halal kabobs and Mediterranean cuisine in West Jordan.",
    address: "7091 S Redwood Rd, West Jordan, UT 84084",
    phone: "(801) 302-0020",
    hours: "11:00 AM - 9:00 PM",
    verified: true,
    featured: false,
  },
  {
    id: "5",
    name: "Saffron Valley",
    category: "Restaurants",
    description: "Fine Indian dining with halal options. Multiple locations across Utah.",
    address: "26 E St E, Salt Lake City, UT 84103",
    phone: "(801) 203-3325",
    website: "https://saffronvalley.com",
    hours: "11:00 AM - 10:00 PM",
    verified: true,
    featured: true,
  },
  {
    id: "6",
    name: "O'Falafel Etc",
    category: "Restaurants",
    description: "Mediterranean and Middle Eastern food. Fresh falafel, shawarma, and more.",
    address: "790 E 2100 S, Salt Lake City, UT 84106",
    phone: "(801) 487-7747",
    website: "https://ofalafel.com",
    hours: "11:00 AM - 9:00 PM",
    verified: true,
    featured: false,
  },
  {
    id: "7",
    name: "Shawarma Shack",
    category: "Restaurants",
    description: "Authentic shawarma and Mediterranean cuisine. Quick and delicious halal food.",
    address: "2843 S Highland Dr, Salt Lake City, UT 84106",
    phone: "(801) 883-9030",
    hours: "11:00 AM - 9:00 PM",
    verified: true,
    featured: false,
  },
  {
    id: "8",
    name: "Afghan Kitchen",
    category: "Restaurants",
    description: "Traditional Afghan cuisine. Kabobs, rice dishes, and authentic flavors.",
    address: "3300 S State St, Salt Lake City, UT 84115",
    phone: "(385) 229-4992",
    hours: "11:00 AM - 9:00 PM",
    verified: true,
    featured: false,
  },
  {
    id: "9",
    name: "Halal Meat Market",
    category: "Grocery & Meat",
    description: "Fresh hand-slaughtered halal meat. Beef, lamb, goat, and chicken.",
    address: "1465 W 3500 S, West Valley City, UT 84119",
    phone: "(801) 966-4110",
    hours: "10:00 AM - 8:00 PM",
    verified: true,
    featured: true,
  },
  {
    id: "10",
    name: "Laziz Kitchen",
    category: "Restaurants",
    description: "Middle Eastern fusion. Fresh ingredients and creative halal dishes.",
    address: "912 Jefferson St, Salt Lake City, UT 84101",
    phone: "(801) 441-1228",
    website: "https://lazizkitchen.com",
    hours: "11:00 AM - 9:00 PM",
    verified: true,
    featured: false,
  },
  {
    id: "11",
    name: "Beirut Cafe",
    category: "Restaurants",
    description: "Lebanese cuisine with vegetarian and halal options. Family recipes.",
    address: "174 E 200 S, Salt Lake City, UT 84111",
    phone: "(801) 366-8484",
    hours: "11:00 AM - 8:00 PM",
    verified: true,
    featured: false,
  },
  {
    id: "12",
    name: "Sumac",
    category: "Restaurants",
    description: "Upscale Middle Eastern dining in Cottonwood Heights. Halal menu options.",
    address: "6985 S Union Park Center, Cottonwood Heights, UT 84047",
    phone: "(801) 944-6600",
    website: "https://sumacutah.com",
    hours: "11:00 AM - 9:00 PM",
    verified: true,
    featured: false,
  },
  {
    id: "13",
    name: "Kohinoor Indian Restaurant",
    category: "Restaurants",
    description: "Authentic Indian cuisine with halal options. Located in Orem.",
    address: "75 S State St, Orem, UT 84058",
    phone: "(801) 226-6666",
    hours: "11:00 AM - 10:00 PM",
    verified: true,
    featured: false,
  },
  {
    id: "14",
    name: "Pizza Twist",
    category: "Restaurants",
    description: "Halal pizza and Indian fusion. Ask about halal options when ordering.",
    address: "1886 S State St, Salt Lake City, UT 84115",
    phone: "(801) 953-1999",
    website: "https://pizzatwist.com",
    hours: "11:00 AM - 10:00 PM",
    verified: true,
    featured: false,
  },
  {
    id: "15",
    name: "Noor Restaurant",
    category: "Restaurants",
    description: "Pakistani and Indian cuisine. Fresh halal meat and authentic spices.",
    address: "755 S State St, Salt Lake City, UT 84111",
    phone: "(801) 953-0500",
    hours: "11:00 AM - 10:00 PM",
    verified: true,
    featured: false,
  },
];

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch =
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBusinesses = filteredBusinesses.filter((b) => b.featured);
  const regularBusinesses = filteredBusinesses.filter((b) => !b.featured);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-heading font-bold mb-4">
              Utah Halal Directory
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Find verified halal restaurants, grocery stores, and Muslim-owned businesses in Utah.
              Trusted by the community, verified by MIC Utah.
            </p>
            <div className="flex gap-4 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search businesses, food, location..."
                  className="pl-10 bg-white text-gray-900 border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Business CTA */}
      <section className="py-4 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-700">
              <strong>Own a halal business in Utah?</strong> Get listed for free.
            </p>
            <Link href="/directory/add">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your Business
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.name)}
                className="gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Business Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Showing <strong>{filteredBusinesses.length}</strong> verified halal businesses in Utah
            </p>
          </div>

          {/* Featured */}
          {featuredBusinesses.length > 0 && (
            <>
              <h2 className="text-2xl font-heading font-bold text-primary mb-6 flex items-center gap-2">
                <Star className="h-6 w-6 text-accent" />
                Featured Businesses
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {featuredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} featured />
                ))}
              </div>
            </>
          )}

          {/* All Businesses */}
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            All Businesses
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>

          {filteredBusinesses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No businesses found matching your search.</p>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Know a Halal Business We&apos;re Missing?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Help grow our directory by adding businesses you know. 
            All submissions are reviewed by MIC Utah for verification.
          </p>
          <Link href="/directory/add">
            <Button size="lg" variant="secondary" className="gap-2">
              <Plus className="h-5 w-5" />
              Submit a Business
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function BusinessCard({ business, featured = false }: { business: any; featured?: boolean }) {
  return (
    <Card className={`hover:shadow-lg transition-shadow ${featured ? 'border-2 border-accent' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
              {business.name}
              {business.verified && (
                <CheckCircle className="h-4 w-4 text-green-500" />
              )}
            </h3>
            <Badge variant="secondary" className="mt-1">{business.category}</Badge>
          </div>
          {featured && (
            <Badge className="bg-accent text-white">Featured</Badge>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4">{business.description}</p>
        
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 text-primary" />
            {business.address}
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4 text-primary" />
            <a href={`tel:${business.phone}`} className="hover:text-primary">
              {business.phone}
            </a>
          </p>
          {business.hours && (
            <p className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4 text-primary" />
              {business.hours}
            </p>
          )}
        </div>
        
        {business.website && (
          <a 
            href={business.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline mt-4 text-sm"
          >
            <Globe className="h-4 w-4" />
            Visit Website
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </CardContent>
    </Card>
  );
}
