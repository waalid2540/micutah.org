"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactReasons = [
  "General Inquiry",
  "Prayer Times Question",
  "Event Information",
  "Donation Question",
  "Volunteer Opportunity",
  "Facility Rental",
  "Report an Issue",
  "Other",
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In production, this would submit to an API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert(
        "Thank you for your message! We will get back to you within 24-48 hours."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question, feedback, or want to get involved? We&apos;d love to
            hear from you. Reach out using any of the methods below.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-lg p-3">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <p className="text-gray-600">
                      1773 West North Temple<br />
                      Salt Lake City, UT 84116
                    </p>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=1773+West+North+Temple+Salt+Lake+City+UT+84116"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-light text-sm"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-lg p-3">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <a
                      href="tel:+18015551234"
                      className="text-gray-600 hover:text-primary"
                    >
                      (801) 555-1234
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      Office hours: 9am - 5pm
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-lg p-3">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <a
                      href="mailto:info@masjidmadina.org"
                      className="text-gray-600 hover:text-primary"
                    >
                      info@masjidmadina.org
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      We respond within 24-48 hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-lg p-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Hours</h3>
                    <p className="text-accent font-bold text-lg">OPEN 24/7</p>
                    <p className="text-sm text-gray-500 mt-1">
                      For prayers and worship
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Office: Mon-Fri 9am-5pm
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number (optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="(801) 555-1234"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) =>
                          setFormData({ ...formData, subject: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactReasons.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="How can we help you?"
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="mt-6">
              <CardContent className="p-0">
                <div className="rounded-xl overflow-hidden h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8396!2d-111.9298!3d40.7718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ2JzE4LjUiTiAxMTHCsDU1JzQ3LjMiVw!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Masjid Madina Location"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="mt-12 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-primary mb-1">
                What are the prayer times?
              </h3>
              <p className="text-gray-600 text-sm">
                Prayer times vary daily based on the sun&apos;s position. Visit our{" "}
                <a href="/prayer-times" className="text-primary hover:underline">
                  Prayer Times page
                </a>{" "}
                for the current schedule.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">
                Is the masjid open 24/7?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes! Our doors are always open for prayers. The office has
                regular hours (Mon-Fri 9am-5pm), but the prayer hall is
                accessible around the clock.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">
                Do you have parking for trucks?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes! We have a large parking lot that can accommodate big rigs
                and commercial vehicles. Many truck drivers stop here while
                traveling on I-80.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-1">
                How can I donate?
              </h3>
              <p className="text-gray-600 text-sm">
                You can donate online through our{" "}
                <a href="/donate" className="text-primary hover:underline">
                  Donation page
                </a>
                , in person at the masjid, or by mail. We accept Zakat, Sadaqah,
                and general donations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
