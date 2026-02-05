import Link from "next/link";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample events data (would come from database in production)
const events = [
  {
    id: "1",
    title: "Ramadan Preparation Workshop",
    description:
      "Join us for a comprehensive workshop on preparing spiritually, mentally, and physically for Ramadan.",
    date: "2025-02-22",
    time: "2:00 PM - 4:00 PM",
    location: "Main Prayer Hall",
    category: "Workshop",
    featured: true,
  },
  {
    id: "2",
    title: "Youth Islamic Quiz Night",
    description:
      "Fun and educational quiz competition for youth ages 10-18. Prizes for winners!",
    date: "2025-02-23",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center",
    category: "Youth",
    featured: true,
  },
  {
    id: "3",
    title: "Sisters' Halaqah",
    description:
      "Weekly sisters' study circle discussing Tafsir of Surah Al-Baqarah.",
    date: "2025-02-24",
    time: "11:00 AM - 12:30 PM",
    location: "Sisters' Section",
    category: "Sisters",
    featured: false,
  },
  {
    id: "4",
    title: "New Muslim Support Group",
    description:
      "Monthly meeting for new Muslims to learn, connect, and grow together in faith.",
    date: "2025-02-25",
    time: "7:00 PM - 8:30 PM",
    location: "Meeting Room B",
    category: "Community",
    featured: false,
  },
  {
    id: "5",
    title: "Fiqh of Fasting Class",
    description:
      "Learn the essential rulings of fasting in preparation for Ramadan with Sheikh Ahmad.",
    date: "2025-02-28",
    time: "After Maghrib",
    location: "Main Prayer Hall",
    category: "Education",
    featured: false,
  },
  {
    id: "6",
    title: "Community Clean-up Day",
    description:
      "Help beautify our masjid and surrounding area in preparation for Ramadan.",
    date: "2025-03-01",
    time: "9:00 AM - 12:00 PM",
    location: "Masjid Grounds",
    category: "Volunteer",
    featured: false,
  },
];

const categories = [
  "All",
  "Workshop",
  "Education",
  "Youth",
  "Sisters",
  "Community",
  "Volunteer",
];

export default function EventsPage() {
  const featuredEvents = events.filter((e) => e.featured);
  const upcomingEvents = events.filter((e) => !e.featured);

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Calendar className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Events & Programs
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for educational programs, community gatherings, and special
            events at Masjid Madina. Something for everyone!
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">
              Featured Events
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden border-2 border-accent"
                >
                  <div className="bg-accent/20 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-white rounded-lg p-3 text-center min-w-[60px]">
                        <p className="text-2xl font-bold">
                          {new Date(event.date).getDate()}
                        </p>
                        <p className="text-xs uppercase">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </p>
                      </div>
                      <div>
                        <Badge variant="secondary">{event.category}</Badge>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-accent text-accent">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <Button className="mt-4 w-full">Learn More</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Date */}
                    <div className="bg-cream rounded-lg p-4 text-center min-w-[80px]">
                      <p className="text-3xl font-bold text-primary">
                        {new Date(event.date).getDate()}
                      </p>
                      <p className="text-sm text-gray-600 uppercase">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                        })}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-1">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div>
                      <Button variant="outline" className="gap-2">
                        Details
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Weekly Programs */}
        <Card className="mt-12 bg-white">
          <CardContent className="p-8">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6 text-center">
              Weekly Programs
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-cream rounded-xl">
                <p className="font-semibold text-primary mb-2">Friday</p>
                <p className="text-sm font-medium">Jummah Prayer</p>
                <p className="text-xs text-gray-600">1:00 PM & 2:00 PM</p>
              </div>
              <div className="text-center p-4 bg-cream rounded-xl">
                <p className="font-semibold text-primary mb-2">Saturday</p>
                <p className="text-sm font-medium">Youth Program</p>
                <p className="text-xs text-gray-600">10:00 AM - 12:00 PM</p>
              </div>
              <div className="text-center p-4 bg-cream rounded-xl">
                <p className="font-semibold text-primary mb-2">Sunday</p>
                <p className="text-sm font-medium">Quran Class</p>
                <p className="text-xs text-gray-600">After Dhuhr</p>
              </div>
              <div className="text-center p-4 bg-cream rounded-xl">
                <p className="font-semibold text-primary mb-2">Daily</p>
                <p className="text-sm font-medium">5 Daily Prayers</p>
                <p className="text-xs text-gray-600">See Prayer Times</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Volunteer CTA */}
        <Card className="mt-8 bg-primary text-white">
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-bold mb-4">
              Want to Help?
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              We&apos;re always looking for volunteers to help with events,
              programs, and masjid operations. Join our volunteer team!
            </p>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Become a Volunteer
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
