'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, ShoppingBag, Phone, Store, MapPin, Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Fallback data for when DB is empty
const fallbackListings = [
  {
    id: "1",
    title: "Homemade Samosas - Fresh Daily",
    description: "Delicious homemade samosas made fresh daily. Perfect for Iftar or any occasion. Halal certified ingredients.",
    categoryName: "Food & Catering",
    price: 15,
    priceLabel: "per dozen",
    contactName: "Sister Fatima",
    contactPhone: "(801) 555-0101",
    featured: true,
    status: "approved",
  },
  {
    id: "2",
    title: "Islamic Tutoring - Quran & Arabic",
    description: "Experienced teacher offering Quran memorization, tajweed, and Arabic language classes. Online and in-person available.",
    categoryName: "Education",
    price: 30,
    priceLabel: "per hour",
    contactName: "Brother Ahmad",
    contactPhone: "(801) 555-0102",
    featured: true,
    status: "approved",
  },
  {
    id: "3",
    title: "Halal Catering for Events",
    description: "Full-service halal catering for weddings, parties, and community events. Pakistani, Arabic, and American cuisines.",
    categoryName: "Food & Catering",
    price: null,
    priceLabel: "Contact for quote",
    contactName: "Salt Lake Halal Kitchen",
    contactPhone: "(801) 555-0103",
    featured: false,
    status: "approved",
  },
  {
    id: "4",
    title: "Apartment for Rent - Near Masjid",
    description: "2-bedroom apartment available for rent, walking distance to Madina Islamic Center. Family-friendly building.",
    categoryName: "Real Estate",
    price: 1200,
    priceLabel: "per month",
    contactName: "Brother Yusuf",
    contactPhone: "(801) 555-0105",
    featured: false,
    status: "approved",
  },
];

export default function MarketplacePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listingsRes, categoriesRes] = await Promise.all([
          fetch('/api/marketplace/listings'),
          fetch('/api/marketplace/categories'),
        ]);
        
        const listingsData = await listingsRes.json();
        const categoriesData = await categoriesRes.json();
        
        // Use API data if available, fallback otherwise
        setListings(listingsData.listings?.length > 0 ? listingsData.listings : fallbackListings);
        setCategories(categoriesData.categories || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setListings(fallbackListings);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredListings = listings.filter(listing => {
    const matchesCategory = selectedCategory === 'All' || listing.categoryName === selectedCategory;
    const matchesSearch = !searchQuery || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredListings = filteredListings.filter(l => l.featured);
  const regularListings = filteredListings.filter(l => !l.featured);

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
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Support Muslim-owned businesses and find halal products and services
            from our community. All listings are from verified community members.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/marketplace/post">
              <Button className="gap-2">
                <Plus className="h-5 w-5" />
                Post a Listing
              </Button>
            </Link>
            <Link href="/marketplace/vendor/register">
              <Button variant="outline" className="gap-2">
                <Store className="h-5 w-5" />
                Register as Vendor
              </Button>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search listings..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('All')}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.slug}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.icon} {category.name}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading listings...</p>
          </div>
        ) : (
          <>
            {/* Featured Listings */}
            {featuredListings.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                  ⭐ Featured Listings
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} featured />
                  ))}
                </div>
              </div>
            )}

            {/* All Listings */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">
                {selectedCategory === 'All' ? 'All Listings' : selectedCategory}
                <span className="text-gray-500 font-normal text-lg ml-2">
                  ({regularListings.length})
                </span>
              </h2>
              
              {filteredListings.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No listings found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {searchQuery 
                        ? 'Try a different search term'
                        : 'Be the first to post in this category!'}
                    </p>
                    <Link href="/marketplace/post">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Post a Listing
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularListings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* CTA */}
        <Card className="mt-12 bg-primary text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Have something to offer?
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Whether you&apos;re selling products, offering services, or looking
              to hire - post your listing and reach our community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/marketplace/post">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Plus className="h-5 w-5" />
                  Post a Free Listing
                </Button>
              </Link>
              <Link href="/marketplace/vendor/register">
                <Button size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white hover:text-primary">
                  <Store className="h-5 w-5" />
                  Become a Vendor
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ListingCard({ listing, featured = false }: { listing: any; featured?: boolean }) {
  return (
    <Card className={featured ? 'border-2 border-accent' : ''}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline">{listing.categoryName}</Badge>
          {featured && <Badge variant="secondary">Featured</Badge>}
          {listing.vendor?.halalCertified && (
            <Badge className="bg-green-100 text-green-700">Halal Certified</Badge>
          )}
        </div>
        <h3 className={`font-semibold mb-2 ${featured ? 'text-xl' : 'text-lg'}`}>
          {listing.title}
        </h3>
        <p className={`text-gray-600 text-sm mb-4 ${featured ? '' : 'line-clamp-2'}`}>
          {listing.description}
        </p>
        
        {/* Price */}
        <div className="mb-4">
          {listing.price ? (
            <p className="text-xl font-bold text-primary">
              ${listing.price}
              {listing.priceLabel && (
                <span className="text-sm font-normal text-gray-600"> {listing.priceLabel}</span>
              )}
            </p>
          ) : (
            <p className="text-gray-600">{listing.priceLabel || 'Contact for price'}</p>
          )}
        </div>

        {/* Vendor badge */}
        {listing.vendor && (
          <div className="flex items-center gap-2 mb-4 text-sm">
            <Store className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium">{listing.vendor.businessName}</span>
            {listing.vendor.rating > 0 && (
              <span className="flex items-center gap-1 text-yellow-600">
                <Star className="h-3 w-3 fill-current" />
                {listing.vendor.rating.toFixed(1)}
              </span>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-cream-dark px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <div className="flex-1">
            <p className="text-sm text-gray-600">Contact</p>
            <p className="font-medium">{listing.contactName || listing.vendor?.businessName}</p>
          </div>
          <div className="flex gap-2">
            {(listing.contactPhone || listing.vendor?.phone) && (
              <a href={`tel:${listing.contactPhone || listing.vendor?.phone}`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
              </a>
            )}
            {(listing.contactWhatsapp || listing.vendor?.whatsapp) && (
              <a 
                href={`https://wa.me/${(listing.contactWhatsapp || listing.vendor?.whatsapp).replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            )}
            <Link href={`/marketplace/${listing.id}`}>
              <Button size="sm">View</Button>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
