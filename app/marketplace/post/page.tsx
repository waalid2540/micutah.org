'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Plus, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const listingTypes = [
  { value: 'product', label: 'Product', icon: '📦' },
  { value: 'service', label: 'Service', icon: '🔧' },
  { value: 'job', label: 'Job Posting', icon: '💼' },
  { value: 'housing', label: 'Housing', icon: '🏠' },
  { value: 'event', label: 'Event', icon: '🎉' },
];

const priceTypes = [
  { value: 'fixed', label: 'Fixed Price' },
  { value: 'negotiable', label: 'Negotiable' },
  { value: 'free', label: 'Free' },
  { value: 'contact', label: 'Contact for Price' },
];

export default function PostListingPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    priceLabel: '',
    priceType: 'fixed',
    categoryName: '',
    listingType: 'product',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    contactWhatsapp: '',
    city: 'Salt Lake City',
    state: 'UT',
  });

  useEffect(() => {
    fetch('/api/marketplace/categories')
      .then(res => res.json())
      .then(data => setCategories(data.categories || []))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/marketplace/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create listing');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-cream py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardContent className="py-12">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Listing Submitted!
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your listing is pending review. Once approved, it will appear in the marketplace.
                This usually takes less than 24 hours.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => setSuccess(false)} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Post Another
                </Button>
                <Link href="/marketplace">
                  <Button>View Marketplace</Button>
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
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Back Link */}
        <Link 
          href="/marketplace" 
          className="inline-flex items-center text-primary hover:text-primary-dark mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Post a Listing</CardTitle>
            <CardDescription>
              Share your product, service, job, or listing with the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Listing Type */}
              <div>
                <Label>What are you listing? *</Label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2">
                  {listingTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, listingType: type.value })}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        formData.listingType === type.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{type.icon}</span>
                      <span className="text-xs">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Homemade Samosas - Fresh Daily"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what you're offering..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    required
                    value={formData.categoryName}
                    onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.name}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <Label>Pricing</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {priceTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, priceType: type.value })}
                      className={`p-2 rounded-lg border text-sm transition-all ${
                        formData.priceType === type.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                {(formData.priceType === 'fixed' || formData.priceType === 'negotiable') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="priceLabel">Price Label</Label>
                      <Input
                        id="priceLabel"
                        value={formData.priceLabel}
                        onChange={(e) => setFormData({ ...formData, priceLabel: e.target.value })}
                        placeholder="e.g., per hour, per dozen"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Your Name *</Label>
                    <Input
                      id="contactName"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Phone *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      required
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="(801) 555-0123"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Email (optional)</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactWhatsapp">WhatsApp (optional)</Label>
                    <Input
                      id="contactWhatsapp"
                      type="tel"
                      value={formData.contactWhatsapp}
                      onChange={(e) => setFormData({ ...formData, contactWhatsapp: e.target.value })}
                      placeholder="+1 801 555 0123"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4 space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Listing'}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  Listings are reviewed before appearing publicly.
                  <Link href="/marketplace/vendor/register" className="text-primary hover:underline ml-1">
                    Register as a vendor
                  </Link> for faster approvals.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
