import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Mail, Phone, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Madina Islamic Center",
  description: "Terms and Conditions for Madina Islamic Center (MIC Utah) services including SMS messaging program.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 islamic-pattern">
        <div className="container mx-auto px-4 text-center">
          <FileText className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
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
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-700 mb-6">
                  By accessing or using the services of Madina Islamic Center (&quot;MIC Utah,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), including our website (micutah.org) and SMS messaging service, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                </p>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  2. About Our Organization
                </h2>
                <p className="text-gray-700 mb-6">
                  Madina Islamic Center is a nonprofit religious organization located at 1773 W North Temple, Salt Lake City, UT 84116. We serve the Muslim community in Salt Lake City and surrounding areas, providing a place for worship, education, and community gathering.
                </p>

                {/* SMS Terms - Important Section */}
                <div className="bg-primary/5 border-2 border-primary/20 p-6 rounded-lg mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-heading font-bold text-primary m-0">
                      3. SMS Messaging Program Terms
                    </h2>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Program Name: MIC Utah Community Updates
                  </h3>
                  
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Program Description</h4>
                  <p className="text-gray-700 mb-4">
                    By opting in to the MIC Utah SMS program, you will receive text messages containing:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                    <li>Prayer time reminders and Jummah announcements</li>
                    <li>Ramadan schedules and Eid notifications</li>
                    <li>Community event updates and reminders</li>
                    <li>Emergency closures or schedule changes</li>
                    <li>Donation reminders and fundraising updates</li>
                    <li>Important community announcements</li>
                  </ul>

                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Message Frequency</h4>
                  <p className="text-gray-700 mb-4">
                    Message frequency varies based on community events and announcements. You can expect approximately <strong>2-8 messages per week</strong>, with increased frequency during Ramadan and special events.
                  </p>

                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Message and Data Rates</h4>
                  <p className="text-gray-700 mb-4">
                    <strong>Message and data rates may apply.</strong> Please check with your mobile carrier for details about your text messaging plan. MIC Utah does not charge for SMS messages, but your carrier may apply standard messaging fees.
                  </p>

                  <h4 className="text-lg font-semibold text-gray-800 mb-2">How to Get Help</h4>
                  <p className="text-gray-700 mb-4">
                    For assistance with our SMS program, you can:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
                    <li>Reply <strong>HELP</strong> to any message for help information</li>
                    <li>Call us at (408) 791-9652</li>
                    <li>Email us at info@micutah.org</li>
                  </ul>

                  <h4 className="text-lg font-semibold text-gray-800 mb-2">How to Opt Out</h4>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-700 mb-2">
                      You can stop receiving SMS messages at any time by:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Replying <strong className="text-red-600 text-lg">STOP</strong> to any message</li>
                      <li>Replying <strong>UNSUBSCRIBE</strong>, <strong>CANCEL</strong>, <strong>END</strong>, or <strong>QUIT</strong></li>
                    </ul>
                    <p className="text-gray-700 mt-3">
                      After opting out, you will receive a confirmation message and will no longer receive SMS messages from MIC Utah unless you opt in again.
                    </p>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Supported Carriers</h4>
                  <p className="text-gray-700">
                    Our SMS service is supported by all major U.S. carriers including AT&T, Verizon, T-Mobile, Sprint, and most regional carriers. Carriers are not liable for delayed or undelivered messages.
                  </p>
                </div>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  4. Website Use
                </h2>
                <p className="text-gray-700 mb-4">
                  By using our website, you agree to:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Use the website only for lawful purposes</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not interfere with the proper functioning of the website</li>
                  <li>Provide accurate information when submitting forms or making donations</li>
                </ul>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  5. Donations
                </h2>
                <p className="text-gray-700 mb-6">
                  All donations made through our website are processed securely. Donations to Madina Islamic Center may be tax-deductible as allowed by law. Please consult with a tax professional regarding the deductibility of your donation. Refunds for donations may be issued at our discretion upon request.
                </p>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  6. Intellectual Property
                </h2>
                <p className="text-gray-700 mb-6">
                  All content on our website, including text, graphics, logos, and images, is the property of Madina Islamic Center or its content suppliers and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our written permission.
                </p>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  7. Disclaimer of Warranties
                </h2>
                <p className="text-gray-700 mb-6">
                  Our services are provided &quot;as is&quot; without warranties of any kind, either express or implied. We do not guarantee that our website or SMS service will be uninterrupted, error-free, or free of viruses or other harmful components.
                </p>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  8. Limitation of Liability
                </h2>
                <p className="text-gray-700 mb-6">
                  Madina Islamic Center shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
                </p>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  9. Changes to Terms
                </h2>
                <p className="text-gray-700 mb-6">
                  We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes are posted constitutes acceptance of the modified terms.
                </p>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  10. Governing Law
                </h2>
                <p className="text-gray-700 mb-6">
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of Utah, without regard to its conflict of law provisions.
                </p>

                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  11. Contact Information
                </h2>
                <p className="text-gray-700 mb-4">
                  For questions about these Terms and Conditions, please contact us:
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
                    <span className="text-gray-700">(408) 791-9652</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-gray-700">info@micutah.org</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-8 space-x-4">
              <Link href="/privacy">
                <Button variant="outline">Privacy Policy</Button>
              </Link>
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
