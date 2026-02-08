"use client";

import { useState } from "react";
import { Moon, BookOpen, Calendar, CheckCircle2, Heart, Download, Clock, Users, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Calendar,
    title: "30-Day Daily Planner",
    description: "Track prayers, Quran, good deeds, and reflections every day of Ramadan",
  },
  {
    icon: BookOpen,
    title: "30 Daily Duas",
    description: "Arabic text, transliteration, meaning, and context for each day",
  },
  {
    icon: CheckCircle2,
    title: "Quran Completion Tracker",
    description: "Juz-by-juz progress tracker to finish the entire Quran",
  },
  {
    icon: Star,
    title: "Last 10 Nights Battle Plan",
    description: "Special section for maximizing Laylatul Qadr with charity tracker",
  },
  {
    icon: Heart,
    title: "Pre-Ramadan Checklist",
    description: "Spiritual and practical preparation to start strong",
  },
  {
    icon: Users,
    title: "Kids Section",
    description: "Good deed charts and activities to get children excited",
  },
];

const testimonials = [
  {
    quote: "This planner transformed how I approach Ramadan. Everything in one place!",
    author: "Sister Amina",
    location: "California",
  },
  {
    quote: "The daily duas with meanings helped me connect deeper with my worship.",
    author: "Brother Hassan",
    location: "Texas",
  },
  {
    quote: "My kids love the good deed chart. They're more engaged than ever!",
    author: "Sister Fatima",
    location: "New York",
  },
];

export default function RamadanPlannerPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [country, setCountry] = useState("");
  const [interestedInUmrah, setInterestedInUmrah] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/ramadan-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          country,
          interestedInUmrah,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-emerald-800 text-white py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-8xl">🌙</div>
          <div className="absolute bottom-20 right-10 text-6xl">⭐</div>
          <div className="absolute top-40 right-1/4 text-4xl">✨</div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-amber-500 text-white mb-6 text-sm px-4 py-1">
              100% FREE • Instant Download
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
              The Ultimate<br />
              <span className="text-amber-400">Ramadan Planner 2026</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Your complete 40+ page guide to the most blessed month — goals, duas, trackers, 
              and everything you need for your best Ramadan yet.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <Badge variant="outline" className="border-white/50 text-white px-4 py-2">
                📄 40+ Pages
              </Badge>
              <Badge variant="outline" className="border-white/50 text-white px-4 py-2">
                🤲 30 Daily Duas
              </Badge>
              <Badge variant="outline" className="border-white/50 text-white px-4 py-2">
                📖 Quran Tracker
              </Badge>
              <Badge variant="outline" className="border-white/50 text-white px-4 py-2">
                ⭐ Last 10 Nights Plan
              </Badge>
            </div>

            <a href="#get-planner">
              <Button size="xl" className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6 h-auto">
                <Download className="mr-2 h-5 w-5" />
                Get Your Free Planner
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-8 bg-amber-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-5 w-5" />
            <span className="text-lg font-medium">
              Ramadan starts February 28, 2026 — Get prepared now!
            </span>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-center text-primary mb-4">
            What&apos;s Inside Your Planner
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Everything you need to make this Ramadan transformative — organized, intentional, and spiritually fulfilling.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 hover:border-primary transition-colors">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Dua Preview */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="h-12 w-12 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl font-heading font-bold mb-8">
              Preview: The Laylatul Qadr Dua
            </h2>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-8">
              <p className="text-3xl lg:text-4xl font-arabic mb-4 leading-relaxed" dir="rtl">
                اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي
              </p>
              <p className="text-amber-300 italic mb-4">
                Allahumma innaka &apos;afuwwun tuhibbul &apos;afwa fa&apos;fu &apos;anni
              </p>
              <p className="text-xl">
                &ldquo;O Allah, You are Forgiving and love forgiveness, so forgive me.&rdquo;
              </p>
              <p className="text-white/70 mt-4 text-sm">
                The Prophet ﷺ taught this to Aisha (RA) specifically for Laylatul Qadr
              </p>
            </div>
            
            <p className="text-white/80">
              This is just ONE of the 30 powerful duas included with full Arabic, 
              transliteration, meaning, and context.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center text-primary mb-12">
            What Muslims Are Saying
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="font-semibold text-primary">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="get-planner" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <Moon className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-heading font-bold text-primary mb-2">
                Get Your Free Planner
              </h2>
              <p className="text-gray-600">
                Instant download. No spam. Just value.
              </p>
            </div>

            {isSubmitted ? (
              <Card className="border-2 border-green-500 bg-green-50">
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-700 mb-2">
                    Alhamdulillah! Check Your Email 📬
                  </h3>
                  <p className="text-green-600 mb-6">
                    Your Ramadan Planner is on its way to <strong>{email}</strong>
                  </p>
                  <div className="bg-white rounded-lg p-4 text-left">
                    <p className="font-semibold mb-2">While you wait:</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>✓ Check your inbox (and spam folder)</li>
                      <li>✓ Add hello@micutah.org to your contacts</li>
                      <li>✓ Share this with friends and family</li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        // Direct download as backup
                        window.open("/downloads/ramadan-planner-2026.pdf", "_blank");
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Directly
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-2 border-primary">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Your name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <select
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="">Select your country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="PK">Pakistan</option>
                        <option value="IN">India</option>
                        <option value="BD">Bangladesh</option>
                        <option value="EG">Egypt</option>
                        <option value="MY">Malaysia</option>
                        <option value="ID">Indonesia</option>
                        <option value="NG">Nigeria</option>
                        <option value="ZA">South Africa</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="umrah"
                        checked={interestedInUmrah}
                        onChange={(e) => setInterestedInUmrah(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="umrah" className="font-normal text-sm">
                        I&apos;m interested in Umrah 2026/2027
                      </Label>
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Download className="mr-2 h-5 w-5" />
                          Get My Free Planner
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-center text-gray-500">
                      By signing up, you agree to receive emails from MIC Utah. 
                      We respect your privacy and will never spam you.
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* About MIC Utah */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-heading font-bold text-primary mb-4">
            From Madina Islamic Center (MIC Utah)
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            We&apos;re a community masjid in Salt Lake City, serving Muslims locally and globally. 
            We believe every Muslim deserves access to quality Islamic resources — that&apos;s why 
            this planner is 100% free.
          </p>
          <p className="text-primary font-semibold">
            🌍 Serving Muslims everywhere
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Ready to Make This Your Best Ramadan?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of Muslims preparing for a transformative month.
          </p>
          <a href="#get-planner">
            <Button size="xl" className="bg-amber-500 hover:bg-amber-600 text-white">
              <Download className="mr-2 h-5 w-5" />
              Download Free Planner
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
