import Link from "next/link";
import { CheckCircle, Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DonationSuccessPage() {
  return (
    <div className="min-h-screen bg-cream py-20">
      <div className="container mx-auto px-4">
        <Card className="max-w-lg mx-auto text-center">
          <CardContent className="pt-12 pb-8">
            <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-heading font-bold text-primary mb-4">
              JazakAllah Khair!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Your donation has been received successfully. May Allah accept your 
              generosity and multiply your rewards. A receipt has been sent to your email.
            </p>

            <div className="bg-primary/10 rounded-xl p-4 mb-8">
              <p className="text-sm text-primary">
                The Prophet ﷺ said: &ldquo;Charity does not decrease wealth.&rdquo;
                <br />
                <span className="text-xs text-gray-600">(Sahih Muslim)</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              <Link href="/donate">
                <Button className="gap-2">
                  <Heart className="h-4 w-4" />
                  Donate Again
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
