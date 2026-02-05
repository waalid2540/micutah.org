import Link from "next/link";
import { MapPin, Clock, Users, Heart, Truck, Plane, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const milestones = [
  { year: "2010", event: "Madina Islamic Center founded" },
  { year: "2012", event: "Community center expanded" },
  { year: "2015", event: "Youth program launched" },
  { year: "2018", event: "24/7 access established" },
  { year: "2020", event: "Virtual programs started" },
  { year: "2024", event: "Major renovation completed" },
];

const leadership = [
  {
    name: "Imam Abdullah",
    role: "Head Imam",
    description: "Leading prayers and spiritual guidance",
  },
  {
    name: "Sheikh Ahmad",
    role: "Islamic Scholar",
    description: "Teaching and educational programs",
  },
  {
    name: "Board of Directors",
    role: "Governance",
    description: "Overseeing masjid operations",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 islamic-pattern">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
            About Madina Islamic Center
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            A welcoming home for Muslims in Salt Lake City, serving our local
            community and travelers since 2010.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-heading font-bold text-primary mb-6 text-center">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 text-center leading-relaxed">
                  Madina Islamic Center is dedicated to serving the spiritual, educational,
                  and social needs of the Muslim community in Salt Lake City and
                  the surrounding areas. We strive to be a beacon of faith, unity,
                  and service, welcoming both locals and travelers to worship,
                  learn, and connect.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">
            What Makes Us Special
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-none shadow-md">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <Badge className="mb-4">24/7 ACCESS</Badge>
                <h3 className="text-xl font-heading font-semibold mb-3">
                  Always Open
                </h3>
                <p className="text-gray-600">
                  We&apos;re open around the clock, ensuring that prayers are never
                  missed - especially important for travelers and those with
                  non-traditional schedules.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-md">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-10 w-10 text-primary" />
                </div>
                <Badge variant="secondary" className="mb-4">TRAVELER FRIENDLY</Badge>
                <h3 className="text-xl font-heading font-semibold mb-3">
                  Truck Parking
                </h3>
                <p className="text-gray-600">
                  Our large parking lot accommodates big rigs and commercial
                  vehicles, making us a popular stop for Muslim truck drivers
                  along the I-80 corridor.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-md">
              <CardContent className="p-8">
                <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-10 w-10 text-primary" />
                </div>
                <Badge variant="outline" className="mb-4">WELCOMING</Badge>
                <h3 className="text-xl font-heading font-semibold mb-3">
                  Community Spirit
                </h3>
                <p className="text-gray-600">
                  Whether you&apos;re a longtime resident or just passing through,
                  you&apos;ll find a warm welcome and a place to pray and connect
                  with fellow Muslims.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
            Our Strategic Location
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-cream-dark border-none">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-start gap-4 mb-6">
                      <MapPin className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Address</h3>
                        <p className="text-gray-700">
                          1773 West North Temple<br />
                          Salt Lake City, UT 84116
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Located just off I-80, near the intersection of North Temple
                      and Redwood Road. Easy access from the highway makes us the
                      perfect stop for travelers.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Plane className="h-6 w-6 text-primary" />
                      <span>5 minutes from SLC Airport</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Building2 className="h-6 w-6 text-primary" />
                      <span>10 minutes from Downtown</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Truck className="h-6 w-6 text-primary" />
                      <span>Adjacent to Love&apos;s Truck Stop</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Users className="h-6 w-6 text-primary" />
                      <span>Serving the I-80 corridor</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">
            Our Journey
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex items-center mb-8 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                    }`}
                  >
                    <Card className="inline-block">
                      <CardContent className="p-4">
                        <p className="text-2xl font-bold text-primary">
                          {milestone.year}
                        </p>
                        <p className="text-gray-600">{milestone.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-2/12 flex justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-primary mb-12 text-center">
            Leadership
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {leadership.map((leader) => (
              <Card key={leader.name} className="text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white font-bold">
                      {leader.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{leader.name}</h3>
                  <p className="text-primary text-sm mb-2">{leader.role}</p>
                  <p className="text-gray-600 text-sm">{leader.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Come Visit Us
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Whether you&apos;re looking for a place to pray, want to learn more
            about Islam, or simply want to connect with the Muslim community,
            you&apos;re always welcome at Madina Islamic Center.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/prayer-times">
              <Button size="lg" variant="secondary">
                View Prayer Times
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
