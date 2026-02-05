import Link from "next/link";
import { Plus, Search, Filter, ShoppingBag, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Sample listings data (would come from database in production)
const categories = [
  "All",
  "Food & Catering",
  "Services",
  "Products",
  "Real Estate",
  "Jobs",
  "Other",
];

const sampleListings = [
  {
    id: "1",
    title: "Homemade Samosas - Fresh Daily",
    description:
      "Delicious homemade samosas made fresh daily. Perfect for Iftar or any occasion. Halal certified ingredients.",
    category: "Food & Catering",
    price: 15,
    priceLabel: "per dozen",
    contact: "Sister Fatima",
    phone: "(801) 555-0101",
    image: null,
    featured: true,
  },
  {
    id: "2",
    title: "Islamic Tutoring - Quran & Arabic",
    description:
      "Experienced teacher offering Quran memorization, tajweed, and Arabic language classes. Online and in-person available.",
    category: "Services",
    price: 30,
    priceLabel: "per hour",
    contact: "Brother Ahmad",
    phone: "(801) 555-0102",
    image: null,
    featured: true,
  },
  {
    id: "3",
    title: "Halal Catering for Events",
    description:
      "Full-service halal catering for weddings, parties, and community events. Pakistani, Arabic, and American cuisines.",
    category: "Food & Catering",
    price: null,
    priceLabel: "Contact for quote",
    contact: "Salt Lake Halal Kitchen",
    phone: "(801) 555-0103",
    image: null,
    featured: false,
  },
  {
    id: "4",
    title: "Prayer Rugs & Islamic Gifts",
    description:
      "Beautiful selection of prayer rugs, tasbihs, Islamic wall art, and gifts. Great for Eid and special occasions.",
    category: "Products",
    price: null,
    priceLabel: "Various prices",
    contact: "Islamic Gifts SLC",
    phone: "(801) 555-0104",
    image: null,
    featured: false,
  },
  {
    id: "5",
    title: "Apartment for Rent - Near Masjid",
    description:
      "2-bedroom apartment available for rent, walking distance to Madina Islamic Center. Family-friendly building.",
    category: "Real Estate",
    price: 1200,
    priceLabel: "per month",
    contact: "Brother Yusuf",
    phone: "(801) 555-0105",
    image: null,
    featured: false,
  },
  {
    id: "6",
    title: "Looking for Halal Restaurant Staff",
    description:
      "Local halal restaurant seeking experienced cooks and servers. Competitive pay, flexible hours.",
    category: "Jobs",
    price: null,
    priceLabel: "Competitive pay",
    contact: "Madina Grill",
    phone: "(801) 555-0106",
    image: null,
    featured: false,
  },
];

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Halal Marketplace
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Support Muslim-owned businesses and find halal products and services
            from our community. All listings are from verified community members.
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search listings..."
              className="pl-10"
            />
          </div>
          <Link href="/marketplace/post">
            <Button className="gap-2 whitespace-nowrap">
              <Plus className="h-5 w-5" />
              Post a Listing
            </Button>
          </Link>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Listings */}
        {sampleListings.some((l) => l.featured) && (
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">
              Featured Listings
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {sampleListings
                .filter((l) => l.featured)
                .map((listing) => (
                  <Card key={listing.id} className="border-2 border-accent">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="secondary">Featured</Badge>
                        <Badge variant="outline">{listing.category}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {listing.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {listing.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div>
                          {listing.price ? (
                            <p className="text-2xl font-bold text-primary">
                              ${listing.price}
                              <span className="text-sm font-normal text-gray-600">
                                {" "}
                                {listing.priceLabel}
                              </span>
                            </p>
                          ) : (
                            <p className="text-lg text-gray-600">
                              {listing.priceLabel}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-cream-dark px-6 py-4">
                      <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">Contact</p>
                          <p className="font-medium">{listing.contact}</p>
                        </div>
                        <div className="flex gap-2">
                          <a href={`tel:${listing.phone}`}>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Phone className="h-4 w-4" />
                              Call
                            </Button>
                          </a>
                          <Link href={`/marketplace/${listing.id}`}>
                            <Button size="sm">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* All Listings */}
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            All Listings
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleListings.map((listing) => (
              <Card key={listing.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline">{listing.category}</Badge>
                    {listing.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {listing.description}
                  </p>
                  <div className="mb-4">
                    {listing.price ? (
                      <p className="text-xl font-bold text-primary">
                        ${listing.price}
                        <span className="text-sm font-normal text-gray-600">
                          {" "}
                          {listing.priceLabel}
                        </span>
                      </p>
                    ) : (
                      <p className="text-gray-600">{listing.priceLabel}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="bg-cream-dark px-6 py-3 flex justify-between items-center">
                  <p className="text-sm text-gray-600">{listing.contact}</p>
                  <Link href={`/marketplace/${listing.id}`}>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA to post listing */}
        <Card className="mt-12 bg-primary text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Have something to offer?
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Whether you&apos;re selling products, offering services, or looking
              to hire - post your listing and reach our community.
            </p>
            <Link href="/marketplace/post">
              <Button size="lg" variant="secondary" className="gap-2">
                <Plus className="h-5 w-5" />
                Post a Free Listing
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
