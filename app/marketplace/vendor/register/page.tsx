'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Store, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function VendorRegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    email: '',
    phone: '',
    whatsapp: '',
    website: '',
    address: '',
    city: 'Salt Lake City',
    state: 'UT',
    zipCode: '',
    serviceArea: '',
    halalCertified: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/marketplace/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to register');
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
                Application Submitted!
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Thank you for registering! Your vendor application is under review. 
                We verify all vendors to maintain trust in our marketplace.
                You&apos;ll receive an email once approved (usually within 24-48 hours).
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/marketplace">
                  <Button variant="outline">Browse Marketplace</Button>
                </Link>
                <Link href="/">
                  <Button>Return Home</Button>
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
          <CardHeader className="text-center">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Register as a Vendor</CardTitle>
            <CardDescription>
              Join our halal marketplace and reach the Muslim community in Utah
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Business Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Business Information</h3>
                
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g., Salt Lake Halal Kitchen"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell customers about your business..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="halalCertified"
                    checked={formData.halalCertified}
                    onChange={(e) => setFormData({ ...formData, halalCertified: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="halalCertified" className="font-normal">
                    My business is halal certified
                  </Label>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(801) 555-0123"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp (optional)</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+1 801 555 0123"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website (optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://yourbusiness.com"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Location</h3>
                
                <div>
                  <Label htmlFor="address">Street Address (optional)</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-2">
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
                  <div>
                    <Label htmlFor="zipCode">ZIP</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="84101"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="serviceArea">Service Area</Label>
                  <Input
                    id="serviceArea"
                    value={formData.serviceArea}
                    onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
                    placeholder="e.g., Salt Lake City, Utah County, Statewide"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  By registering, you agree to our marketplace guidelines.
                  All vendors are verified by Madina Islamic Center.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
