"use client";

import {
  MapPin,
  Navigation,
  Clock,
  Phone,
  Plane,
  Building2,
  Fuel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const googleMapsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=1773+West+North+Temple+Salt+Lake+City+UT+84116";

export default function LocationMap() {
  const ref = useScrollAnimation();

  return (
    <section className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">
            Easy to Find
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary mt-2 mb-4">
            Find Us &mdash; Right Next to Love&apos;s Truck Stop
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conveniently located near SLC Airport on the I-80 corridor. Easy
            access for travelers and local community.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2 animate-on-scroll-left">
            <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] bg-gray-100 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8396!2d-111.9298!3d40.7718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ2JzE4LjUiTiAxMTHCsDU1JzQ3LjMiVw!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Masjid Madina Location"
              />

              {/* Glassmorphism badge floating on map */}
              <div className="absolute bottom-4 left-4 glass-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg">
                <div className="bg-primary rounded-lg p-2">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    Masjid Madina
                  </p>
                  <p className="text-xs text-gray-500">Open 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info cards */}
          <div className="space-y-4 animate-on-scroll-right">
            {/* Love's / Flying J - highlighted card */}
            <Card className="border-2 border-accent/30 bg-accent/5 card-glow">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-accent rounded-lg p-3">
                    <Fuel className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-primary">
                      Love&apos;s & Flying J
                    </h3>
                    <p className="text-accent-dark font-bold">Adjacent</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Right next door - fuel up and pray
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll stagger-1">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-lg p-3">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Address</h3>
                    <p className="text-gray-600 text-sm">
                      1773 West North Temple
                      <br />
                      Salt Lake City, UT 84116
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll stagger-2">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-lg p-3">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Hours</h3>
                    <p className="text-accent font-bold text-lg">OPEN 24/7</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll stagger-3">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-lg p-3">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Contact</h3>
                    <a
                      href="tel:+14087919652"
                      className="text-primary hover:text-primary-light transition-colors font-medium"
                    >
                      (408) 791-9652
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nearby landmarks */}
            <Card className="bg-cream border-none animate-on-scroll stagger-4">
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg mb-3">Nearby</h3>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3">
                    <Plane className="h-4 w-4 text-primary" />
                    <span className="text-gray-700 text-sm">SLC Airport</span>
                    <span className="text-xs text-gray-500 ml-auto bg-gray-100 px-2 py-0.5 rounded-full">
                      5 min
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span className="text-gray-700 text-sm">Downtown SLC</span>
                    <span className="text-xs text-gray-500 ml-auto bg-gray-100 px-2 py-0.5 rounded-full">
                      10 min
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block animate-on-scroll stagger-5"
            >
              <Button size="lg" className="w-full gap-2">
                <Navigation className="h-5 w-5" />
                Get Directions
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
