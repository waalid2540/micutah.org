'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Store, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PendingData {
  pendingListings: any[];
  pendingVendors: any[];
  counts: {
    listings: number;
    vendors: number;
    total: number;
  };
}

export default function MarketplaceAdminPage() {
  const [data, setData] = useState<PendingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/marketplace/admin/pending');
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching pending:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (type: 'listings' | 'vendors', id: string, action: 'approve' | 'reject') => {
    setProcessing(id);
    try {
      const res = await fetch('/api/marketplace/admin/pending', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ids: [id], action }),
      });

      if (res.ok) {
        fetchPending(); // Refresh
      }
    } catch (error) {
      console.error('Error processing:', error);
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              href="/admin" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Marketplace Admin</h1>
            <p className="text-gray-600">Manage listings and vendors</p>
          </div>
          <Button onClick={fetchPending} variant="outline" disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {data?.counts.total || 0}
                </p>
                <p className="text-gray-600 text-sm">Pending Review</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {data?.counts.listings || 0}
                </p>
                <p className="text-gray-600 text-sm">Pending Listings</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Store className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  {data?.counts.vendors || 0}
                </p>
                <p className="text-gray-600 text-sm">Pending Vendors</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Vendors */}
        {data?.pendingVendors && data.pendingVendors.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Pending Vendor Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.pendingVendors.map((vendor) => (
                  <div 
                    key={vendor.id} 
                    className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{vendor.businessName}</h3>
                        {vendor.halalCertified && (
                          <Badge variant="secondary" className="text-xs">
                            Halal Certified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {vendor.description || 'No description'}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>{vendor.email}</span>
                        <span>{vendor.phone}</span>
                        <span>{vendor.city}, {vendor.state}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAction('vendors', vendor.id, 'reject')}
                        disabled={processing === vendor.id}
                      >
                        <XCircle className="h-4 w-4 mr-1 text-red-500" />
                        Reject
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleAction('vendors', vendor.id, 'approve')}
                        disabled={processing === vendor.id}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pending Listings */}
        {data?.pendingListings && data.pendingListings.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Pending Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.pendingListings.map((listing) => (
                  <div 
                    key={listing.id} 
                    className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{listing.title}</h3>
                        <Badge variant="outline">{listing.categoryName}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {listing.description}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>
                          {listing.price 
                            ? `$${listing.price} ${listing.priceLabel || ''}` 
                            : listing.priceLabel || 'Contact for price'}
                        </span>
                        <span>Contact: {listing.contactName}</span>
                        {listing.vendor && (
                          <span className="text-primary">
                            Vendor: {listing.vendor.businessName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAction('listings', listing.id, 'reject')}
                        disabled={processing === listing.id}
                      >
                        <XCircle className="h-4 w-4 mr-1 text-red-500" />
                        Reject
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleAction('listings', listing.id, 'approve')}
                        disabled={processing === listing.id}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!loading && data?.counts.total === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                All caught up!
              </h3>
              <p className="text-gray-600">
                No pending listings or vendor applications to review.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
