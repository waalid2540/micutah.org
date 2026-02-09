import Link from "next/link";
import { Moon, Heart, Calendar, Clock, Utensils, BookOpen, Download, Sparkles, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const specialPrograms = [
  {
    title: "Daily Iftar",
    description: "Join us for community Iftar every evening",
    time: "At Maghrib",
    icon: Utensils,
  },
  {
    title: "Taraweeh Prayer",
    description: "20 Rakaat with beautiful recitation",
    time: "9:00 PM",
    icon: Moon,
  },
  {
    title: "Qiyam ul-Layl",
    description: "Last 10 nights special prayers",
    time: "2:00 AM",
    icon: Clock,
  },
  {
    title: "Quran Study",
    description: "Daily Tafsir sessions after Fajr",
    time: "After Fajr",
    icon: BookOpen,
  },
];

export default function RamadanPage() {
  // Fundraising tracking removed - will add back when we have real numbers

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 islamic-pattern">
        <div className="container mx-auto px-4 text-center">
          <Moon className="h-16 w-16 text-accent mx-auto mb-6" />
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
            Ramadan 2026
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Join us for a blessed month of fasting, prayer, and community at Madina Islamic Center.
            Experience the spiritual beauty of Ramadan together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ramadan/iftar-sponsor">
              <Button size="xl" variant="secondary" className="gap-2">
                <Heart className="h-5 w-5" />
                Sponsor Iftar ($150)
              </Button>
            </Link>
            <Link href="/ramadan/donations">
              <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Ramadan Donations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FREE Ramadan Planner Banner */}
      <section className="py-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8" />
              <div>
                <p className="font-bold text-lg">FREE: Ultimate Ramadan Planner 2026</p>
                <p className="text-white/90 text-sm">40+ pages of daily trackers, duas, and more!</p>
              </div>
            </div>
            <Link href="/ramadan/planner">
              <Button className="bg-white text-amber-600 hover:bg-white/90 gap-2">
                <Download className="h-4 w-4" />
                Get Free Planner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ramadan Books Section */}
      <section className="py-12 bg-gradient-to-br from-amber-800 via-yellow-900 to-amber-950 text-white relative overflow-hidden">
        {/* Decorative gold pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-amber-300 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-amber-300 rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-amber-300 rotate-45"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Library className="h-10 w-10 text-amber-300" />
                <h2 className="text-3xl font-heading font-bold">Ramadan Reading</h2>
              </div>
              <p className="text-amber-100 mb-6 max-w-xl">
                Short, powerful books to transform your Ramadan. Read online for free or download PDFs.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/ramadan/books">
                  <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-100 gap-2">
                    <BookOpen className="h-5 w-5" />
                    Browse All Books
                  </Button>
                </Link>
                <Link href="/ramadan/books/last-10-nights">
                  <Button size="lg" variant="outline" className="border-amber-300 text-amber-100 hover:bg-amber-800 gap-2">
                    🌙 The Last 10 Nights
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex gap-4">
              {/* Mini book covers */}
              <Link href="/ramadan/books/last-10-nights" className="group">
                <div className="w-28 h-40 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 p-3 transform transition-transform group-hover:scale-105 shadow-xl shadow-black/30">
                  <span className="text-2xl">🌙</span>
                  <p className="text-xs font-semibold mt-2 leading-tight">The Last 10 Nights</p>
                </div>
              </Link>
              <a href="/downloads/virtues-of-ramadan.pdf" target="_blank" className="group">
                <div className="w-28 h-40 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-3 transform transition-transform group-hover:scale-105 shadow-xl shadow-black/30 border border-amber-400/30">
                  <div className="flex justify-between items-start">
                    <span className="text-2xl">✨</span>
                    <span className="text-[10px] bg-red-500 px-1.5 py-0.5 rounded font-bold">PDF</span>
                  </div>
                  <p className="text-xs font-semibold mt-2 leading-tight">Virtues of Ramadan</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ramadan Donation CTA */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                Support Our Ramadan Programs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-gray-600">
                Your generous donations help us provide daily iftars, maintain our 24/7 facilities, 
                and serve the community throughout this blessed month.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link href="/ramadan/donations">
                  <Button size="lg" className="gap-2">
                    <Heart className="h-5 w-5" />
                    Donate Now
                  </Button>
                </Link>
                <Link href="/ramadan/iftar-sponsor">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Utensils className="h-5 w-5" />
                    Sponsor Iftar - $150
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-12">
            Ramadan Programs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialPrograms.map((program) => (
              <Card key={program.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <program.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {program.description}
                  </p>
                  <Badge variant="secondary">{program.time}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Iftar Sponsorship */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">
                Sponsor an Iftar
              </h2>
              <p className="text-gray-600 mb-6">
                The Prophet (PBUH) said: &ldquo;Whoever provides food for breaking of
                the fast for a fasting person receives the reward of the fasting
                person, without the reward of the fasting person being reduced in
                any way.&rdquo;
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="bg-primary rounded-full p-1">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Feed 50+ community members</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary rounded-full p-1">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Full meal including dates, water, and dinner</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary rounded-full p-1">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Your name announced at Iftar (or anonymous)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-primary rounded-full p-1">
                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Tax-deductible donation receipt</span>
                </li>
              </ul>
              <Link href="/ramadan/iftar-sponsor">
                <Button size="xl" className="gap-2">
                  <Utensils className="h-5 w-5" />
                  Sponsor Iftar - $150
                </Button>
              </Link>
            </div>

            {/* Iftar Calendar Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Available Iftar Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 5, 8, 10, 15, 20, 25, 27].map((day) => (
                    <div
                      key={day}
                      className="flex items-center justify-between p-3 bg-cream rounded-lg"
                    >
                      <span className="font-medium">Ramadan {day}</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Available
                      </Badge>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Showing sample dates. View all available dates on the sponsorship page.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-12">
            Important Dates
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center border-2 border-primary">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">First Day of Ramadan</p>
                <p className="text-2xl font-heading font-bold text-primary">
                  February 18, 2026*
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  *Subject to moon sighting
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-accent">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">Last 10 Nights Begin</p>
                <p className="text-2xl font-heading font-bold text-accent">
                  March 10, 2026*
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Seek Laylatul Qadr
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-2 border-primary">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600">Eid ul-Fitr</p>
                <p className="text-2xl font-heading font-bold text-primary">
                  March 20, 2026*
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  *Subject to moon sighting
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Taraweeh Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <Moon className="h-6 w-6" />
                Taraweeh Prayer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-4xl font-heading font-bold text-primary">
                9:00 PM Every Night
              </p>
              <p className="text-gray-600">
                20 Rakaat with beautiful Quran recitation
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Huffaz Leading
                </Badge>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Full Quran Completion
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
