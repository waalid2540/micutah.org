import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Madina Islamic Center",
  description: "Privacy Policy for Madina Islamic Center (MIC Utah) - How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 islamic-pattern">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8 prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  <strong>Last Updated:</strong> February 18, 2026
                </p>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  1. Introduction
                </h2>
                <p className="text-gray-700 mb-6">
                  Madina Islamic Center (&quot;MIC Utah,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), located at 1773 W North Temple, Salt Lake City, UT 84116, is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (micutah.org), subscribe to our SMS messaging service, or interact with us in any way.
                </p>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  2. Information We Collect
                </h2>
                <p className="text-gray-700 mb-4">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, and mailing address when you voluntarily provide it.</li>
                  <li><strong>SMS Subscription Information:</strong> Phone number and opt-in consent when you subscribe to our text messaging service.</li>
                  <li><strong>Donation Information:</strong> Payment details when you make a donation (processed securely through third-party payment processors).</li>
                  <li><strong>Website Usage Data:</strong> Anonymous analytics data including pages visited, time spent, and general location (city/country level only).</li>
                </ul>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-gray-700 mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Send prayer time reminders, community announcements, and event notifications via SMS (if you have opted in)</li>
                  <li>Process donations and send tax receipts</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Send occasional email updates about community events (if you have subscribed)</li>
                </ul>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  4. SMS Messaging Privacy
                </h2>
                <div className="bg-cream-dark p-6 rounded-lg mb-6">
                  <p className="text-gray-700 mb-4">
                    When you opt in to receive SMS messages from MIC Utah:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Your phone number is used solely to send you community updates, prayer times, event reminders, and important announcements.</li>
                    <li><strong>We do not sell, rent, or share your phone number with third parties for marketing purposes.</strong></li>
                    <li>Your phone number will not be shared with any external organizations or used for any purpose other than MIC Utah communications.</li>
                    <li>Message frequency varies based on community events and announcements (typically 2-8 messages per week).</li>
                    <li>Message and data rates may apply depending on your mobile carrier plan.</li>
                    <li>You can opt out at any time by replying <strong>STOP</strong> to any message.</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  5. Information Sharing and Disclosure
                </h2>
                <p className="text-gray-700 mb-4">
                  <strong>We do not sell, trade, or rent your personal information to third parties.</strong>
                </p>
                <p className="text-gray-700 mb-6">
                  We may share your information only in the following limited circumstances:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, processing donations, or sending communications (e.g., payment processors, SMS service providers). These providers are contractually obligated to keep your information confidential.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests.</li>
                </ul>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  6. Data Security
                </h2>
                <p className="text-gray-700 mb-6">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  7. Your Rights and Choices
                </h2>
                <p className="text-gray-700 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li><strong>Opt out of SMS messages:</strong> Reply <strong>STOP</strong> to any text message</li>
                  <li><strong>Get help:</strong> Reply <strong>HELP</strong> to any text message for assistance</li>
                  <li><strong>Access your information:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Update your information:</strong> Contact us to correct any inaccurate information</li>
                  <li><strong>Delete your information:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                </ul>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  8. Children&apos;s Privacy
                </h2>
                <p className="text-gray-700 mb-6">
                  Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                </p>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  9. Changes to This Privacy Policy
                </h2>
                <p className="text-gray-700 mb-6">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. We encourage you to review this Privacy Policy periodically.
                </p>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  10. Contact Us
                </h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-cream-dark p-6 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>Madina Islamic Center (MIC Utah)</strong>
                  </p>
                  <p className="text-gray-700 mb-2">
                    1773 W North Temple<br />
                    Salt Lake City, UT 84116
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-gray-700">(385) 215-9346</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-gray-700">info@micutah.org</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Link href="/">
                <Button variant="outline">Return to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
