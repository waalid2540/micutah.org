import Link from "next/link";
import { Moon, Heart, Calendar, Clock, Utensils, BookOpen, Download, Sparkles, Library, Salad, Star, Gift, ArrowRight, FileText } from "lucide-react";
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
    time: "7:40 PM",
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

const toolkitItems = [
  {
    title: "Ramadan Calendar",
    description: "All 30 days with Fajr & Maghrib times. Perfect for WhatsApp sharing!",
    icon: Calendar,
    color: "from-emerald-500 to-teal-600",
    href: "/ramadan/calendar",
    badge: "2026",
    buttonText: "View Calendar",
  },
  {
    title: "Ramadan Planner",
    description: "40+ pages: daily trackers, dua lists, Quran goals, reflection journals",
    icon: FileText,
    color: "from-amber-500 to-orange-600",
    href: "/ramadan/planner",
    badge: "FREE",
    buttonText: "Get Planner",
  },
  {
    title: "Ramadan Books",
    description: "Short, powerful reads: Last 10 Nights, Virtues of Ramadan & more",
    icon: Library,
    color: "from-purple-500 to-indigo-600",
    href: "/ramadan/books",
    badge: "PDF",
    buttonText: "Browse Books",
  },
  {
    title: "Healthy Recipes",
    description: "Light, energizing iftar meals so you're ready for Taraweeh!",
    icon: Salad,
    color: "from-green-500 to-emerald-600",
    href: "/ramadan/recipes",
    badge: "NEW",
    buttonText: "Get Recipes",
  },
];

export default function RamadanPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-white py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-white rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 border border-white rotate-45"></div>
        </div>
        
        {/* Stars decoration */}
        <div className="absolute top-20 left-20 text-accent/30 text-6xl">✦</div>
        <div className="absolute top-40 right-40 text-accent/20 text-4xl">✦</div>
        <div className="absolute bottom-20 left-1/3 text-accent/20 text-3xl">✦</div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Star className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">February 18 - March 19, 2026</span>
          </div>
          
          <Moon className="h-20 w-20 text-accent mx-auto mb-6 drop-shadow-lg" />
          
          <h1 className="text-5xl lg:text-6xl font-heading font-bold mb-6">
            Ramadan 2026
          </h1>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join us for a blessed month of fasting, prayer, and community at Madina Islamic Center.
            Experience the spiritual beauty of Ramadan together.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ramadan/iftar-sponsor">
              <Button size="xl" className="bg-accent hover:bg-accent/90 text-primary gap-2 shadow-lg shadow-accent/30">
                <Heart className="h-5 w-5" />
                Sponsor Iftar ($250)
              </Button>
            </Link>
            <Link href="/ramadan/donations">
              <Button size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary">
                Ramadan Donations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FREE RAMADAN TOOLKIT - Main Feature Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full mb-6 shadow-lg shadow-amber-500/30">
              <Gift className="h-5 w-5" />
              <span className="font-bold uppercase tracking-wide">100% Free Resources</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              Your Ramadan Toolkit
            </h2>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need for a transformative Ramadan — calendars, planners, books, and recipes. 
              All free, ready to download.
            </p>
          </div>
          
          {/* Toolkit Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {toolkitItems.map((item) => (
              <Link key={item.title} href={item.href} className="group">
                <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-slate-500 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl overflow-hidden">
                  <CardContent className="p-6">
                    {/* Icon with gradient background */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Badge */}
                    <Badge className={`mb-3 bg-gradient-to-r ${item.color} text-white border-0`}>
                      {item.badge}
                    </Badge>
                    
                    {/* Title */}
                    <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    {/* Button */}
                    <div className="flex items-center text-accent font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                      {item.buttonText}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-slate-400 mb-4">
              ✨ No signup required • Instant download • Share with family & friends
            </p>
          </div>
        </div>
      </section>

      {/* Quick Access Bar */}
      <section className="py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <Link href="/ramadan/calendar" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Calendar className="h-4 w-4" /> Prayer Calendar
            </Link>
            <span className="text-white/40">•</span>
            <Link href="/ramadan/planner" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <FileText className="h-4 w-4" /> Free Planner
            </Link>
            <span className="text-white/40">•</span>
            <Link href="/ramadan/books" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <BookOpen className="h-4 w-4" /> Books
            </Link>
            <span className="text-white/40">•</span>
            <Link href="/ramadan/recipes" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Salad className="h-4 w-4" /> Recipes
            </Link>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">
            Important Dates
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            Mark your calendars for these key moments of Ramadan 2026
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center border-2 border-primary hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Moon className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-gray-600 mb-1">First Day of Ramadan</p>
                <p className="text-2xl font-heading font-bold text-primary">
                  February 18, 2026*
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  *Subject to moon sighting
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 border-accent hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-accent" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Last 10 Nights Begin</p>
                <p className="text-2xl font-heading font-bold text-accent">
                  March 10, 2026*
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Seek Laylatul Qadr
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 border-primary hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Eid ul-Fitr</p>
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

      {/* Programs Grid */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">
            Ramadan Programs
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
            Join us for daily prayers, learning, and community gatherings
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialPrograms.map((program) => (
              <Card key={program.title} className="text-center hover:shadow-lg transition-shadow bg-white">
                <CardContent className="pt-8 pb-6">
                  <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <program.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {program.description}
                  </p>
                  <Badge className="bg-primary/10 text-primary border-0 font-semibold">
                    {program.time}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Iftar Sponsorship */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-accent text-primary mb-4">Multiply Your Rewards</Badge>
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                Sponsor an Iftar
              </h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                The Prophet ﷺ said: <em>&ldquo;Whoever provides food for breaking of
                the fast for a fasting person receives the reward of the fasting
                person, without the reward of the fasting person being reduced in
                any way.&rdquo;</em>
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Feed 50+ community members",
                  "Full meal including dates, water, and dinner",
                  "Your name announced at Iftar (or anonymous)",
                  "Tax-deductible donation receipt"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="bg-green-500 rounded-full p-1.5 shadow-sm">
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/ramadan/iftar-sponsor">
                  <Button size="xl" className="gap-2 shadow-lg">
                    <Utensils className="h-5 w-5" />
                    Sponsor Iftar - $250
                  </Button>
                </Link>
                <Link href="/ramadan/donations">
                  <Button size="xl" variant="outline" className="gap-2">
                    <Heart className="h-5 w-5" />
                    Other Donations
                  </Button>
                </Link>
              </div>
            </div>

            {/* Iftar Calendar Preview */}
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Available Iftar Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {[1, 2, 3, 5, 8, 10, 15, 20, 25, 27].map((day) => (
                    <div
                      key={day}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors"
                    >
                      <span className="font-medium text-gray-800">Ramadan {day}</span>
                      <Badge className="bg-green-500 text-white border-0">
                        Available
                      </Badge>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  Showing sample dates. View all on the sponsorship page.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Taraweeh Info */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary to-primary/90 text-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur border-white/20">
            <CardContent className="text-center py-10">
              <Moon className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="text-2xl font-heading font-bold mb-2">Taraweeh Prayer</h3>
              <p className="text-5xl font-heading font-bold text-accent my-4">
                7:40 PM
              </p>
              <p className="text-xl text-white/90 mb-6">
                Every Night of Ramadan
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge className="bg-white/20 text-white border-0 text-sm px-4 py-2">
                  20 Rakaat
                </Badge>
                <Badge className="bg-white/20 text-white border-0 text-sm px-4 py-2">
                  Huffaz Leading
                </Badge>
                <Badge className="bg-white/20 text-white border-0 text-sm px-4 py-2">
                  Full Quran Completion
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">
            Support Our Ramadan Programs
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Your generous donations help us provide daily iftars, maintain our 24/7 facilities, 
            and serve the community throughout this blessed month.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ramadan/donations">
              <Button size="lg" className="gap-2">
                <Heart className="h-5 w-5" />
                Donate Now
              </Button>
            </Link>
            <Link href="/ramadan/iftar-sponsor">
              <Button size="lg" variant="outline" className="gap-2">
                <Utensils className="h-5 w-5" />
                Sponsor Iftar - $250
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
