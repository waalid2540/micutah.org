"use client";

import Link from "next/link";
import { Heart, Shield, Receipt, Moon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const STRIPE_DONATE_LINK = "https://donate.stripe.com/7sIg20dTDevt22YbII";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Support Madina Islamic Center
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your generous donations help us maintain our 24/7 operations, support
            travelers, and serve the Salt Lake City Muslim community. Every
            contribution makes a difference.
          </p>
        </div>

        {/* Main Donate Button */}
        <div className="max-w-xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-primary to-primary-light text-white overflow-hidden">
            <CardContent className="p-8 text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-2">Make a Donation</h2>
              <p className="text-white/80 mb-6">
                Zakat • Sadaqah • Masjid Fund • Ramadan
              </p>
              <a href={STRIPE_DONATE_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="xl" variant="secondary" className="gap-2 text-lg px-8">
                  Donate Now
                  <ExternalLink className="h-5 w-5" />
                </Button>
              </a>
              <p className="text-white/60 text-sm mt-4">
                Secure payment via Stripe
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ramadan Special */}
        <Card className="max-w-xl mx-auto mb-12 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Moon className="h-10 w-10" />
              <div>
                <h3 className="font-semibold text-lg">Ramadan is Coming!</h3>
                <p className="text-sm text-white/80">
                  Sponsor Iftar or support Ramadan programs
                </p>
              </div>
            </div>
            <Link href="/ramadan">
              <Button variant="secondary" className="whitespace-nowrap">
                Ramadan Programs
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Zakat Eligible</h3>
              <p className="text-sm text-gray-600">
                100% of Zakat donations go to eligible recipients
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Receipt className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Tax Deductible</h3>
              <p className="text-sm text-gray-600">
                Receive a tax receipt for all donations
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Heart className="h-10 w-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Transparent Use</h3>
              <p className="text-sm text-gray-600">
                Regular reports on how donations are used
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
