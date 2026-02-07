import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { marketplaceListings } from "@/lib/marketplace-data";
import { notFound } from "next/navigation";

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  // Find listing by slug or id
  const listing = marketplaceListings.find(
    (l) => l.slug === params.id || l.id === params.id
  );

  if (!listing) {
    notFound();
  }

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
                  <Badge variant="outline">{listing.categoryName}</Badge>
                  {listing.featured && (
                    <Badge variant="secondary">⭐ Featured</Badge>
                  )}
                </div>

                <h1 className="text-3xl font-heading font-bold text-primary mb-4">
                  {listing.title}
                </h1>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <MapPin className="h-5 w-5" />
                  <span>{listing.city}, Utah</span>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">About</h2>
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
                      <p className="font-medium">{listing.city}, Utah</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-cream rounded-lg p-2">
                      <Badge className="bg-green-100 text-green-700 border-0">Halal</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Certification</p>
                      <p className="font-medium">Halal Certified</p>
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
                <h2 className="text-xl font-semibold mb-4">Contact</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white font-semibold">
                      {(listing.contactName || listing.title).charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{listing.contactName || listing.title}</p>
                      <p className="text-sm text-gray-600">{listing.categoryName}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {listing.contactPhone && (
                    <a href={`tel:${listing.contactPhone}`} className="block">
                      <Button size="lg" className="w-full gap-2">
                        <Phone className="h-5 w-5" />
                        {listing.contactPhone}
                      </Button>
                    </a>
                  )}
                  {listing.contactPhone && (
                    <a 
                      href={`https://wa.me/${listing.contactPhone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button size="lg" variant="outline" className="w-full gap-2">
                        <MessageCircle className="h-5 w-5" />
                        WhatsApp
                      </Button>
                    </a>
                  )}
                  {!listing.contactPhone && (
                    <p className="text-center text-gray-500 py-4">
                      Contact information coming soon
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-cream-dark border-none">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">🕌 MIC Utah Verified</h3>
                <p className="text-sm text-gray-600">
                  This business is listed in the MIC Utah Halal Marketplace. 
                  Support local Muslim-owned businesses in our community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
