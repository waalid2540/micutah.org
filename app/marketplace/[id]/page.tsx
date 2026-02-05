import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Clock, Share2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample listing data (would come from database in production)
const sampleListing = {
  id: "1",
  title: "Homemade Samosas - Fresh Daily",
  description: `Delicious homemade samosas made fresh daily using traditional family recipes. Perfect for Iftar, parties, or any occasion.

Our samosas are made with 100% halal certified ingredients:
- Premium quality beef or vegetable filling
- Fresh herbs and spices
- Crispy, flaky pastry

Available flavors:
- Classic Beef
- Spiced Potato & Pea (Vegetarian)
- Chicken Keema

We also offer bulk orders for events and catering. Special Ramadan pricing available!

Pickup available near Madina Islamic Center or delivery within Salt Lake Valley for orders over $30.`,
  category: "Food & Catering",
  price: 15,
  priceLabel: "per dozen",
  contact: "Sister Fatima",
  phone: "(801) 555-0101",
  email: "fatima@example.com",
  location: "Near Madina Islamic Center, Salt Lake City",
  image: null,
  featured: true,
  createdAt: "2026-02-15",
};

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  // In production, fetch the listing by ID
  const listing = sampleListing;

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4">
        {/* Back link */}
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-light mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">{listing.category}</Badge>
                  {listing.featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                </div>

                <h1 className="text-3xl font-heading font-bold text-primary mb-4">
                  {listing.title}
                </h1>

                <div className="flex items-baseline gap-2 mb-6">
                  {listing.price ? (
                    <>
                      <span className="text-4xl font-bold text-primary">
                        ${listing.price}
                      </span>
                      <span className="text-gray-600">{listing.priceLabel}</span>
                    </>
                  ) : (
                    <span className="text-2xl text-gray-600">
                      {listing.priceLabel}
                    </span>
                  )}
                </div>

                {/* Image placeholder */}
                <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-6">
                  <p className="text-gray-400">Product Image</p>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-line">
                    {listing.description}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-cream rounded-lg p-2">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{listing.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-cream rounded-lg p-2">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Posted</p>
                      <p className="font-medium">
                        {new Date(listing.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Contact Info */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Seller</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white font-semibold">
                      {listing.contact.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{listing.contact}</p>
                      <p className="text-sm text-gray-600">Seller</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <a href={`tel:${listing.phone}`} className="block">
                    <Button size="lg" className="w-full gap-2">
                      <Phone className="h-5 w-5" />
                      Call Seller
                    </Button>
                  </a>
                  <a href={`mailto:${listing.email}`} className="block">
                    <Button size="lg" variant="outline" className="w-full gap-2">
                      <Mail className="h-5 w-5" />
                      Send Email
                    </Button>
                  </a>
                </div>

                <div className="border-t mt-6 pt-6">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1 gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 gap-2">
                      <Flag className="h-4 w-4" />
                      Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="bg-cream-dark border-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Safety Tips</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>- Meet in a public place for transactions</li>
                  <li>- Verify product quality before purchasing</li>
                  <li>- Use secure payment methods</li>
                  <li>- Report suspicious listings</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
