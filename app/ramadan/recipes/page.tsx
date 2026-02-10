"use client";

import { useState } from "react";
import { Clock, Flame, Heart, Download, Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const recipes = [
  {
    id: 1,
    title: "Lentil Soup (Shorbat Adas)",
    subtitle: "The Prophet's ﷺ Favorite",
    description: "Warm, nourishing, and perfect for breaking your fast. Rich in protein and easy to digest.",
    time: "25 min",
    calories: "180 cal",
    servings: 6,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
    tags: ["High Protein", "Easy Digest", "Sunnah"],
    ingredients: ["1 cup red lentils", "1 onion, diced", "2 carrots", "4 cups water", "Cumin, turmeric, salt"],
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    subtitle: "Light & Energizing",
    description: "Fresh greens with tender chicken. Won't make you sleepy for Taraweeh!",
    time: "20 min",
    calories: "320 cal",
    servings: 4,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    tags: ["High Protein", "Low Carb", "Energy"],
    ingredients: ["2 chicken breasts", "Mixed greens", "Cherry tomatoes", "Olive oil", "Lemon dressing"],
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 3,
    title: "Stuffed Dates with Almonds",
    subtitle: "Sunnah Starter",
    description: "Break your fast the Sunnah way. Natural sugars for instant energy.",
    time: "5 min",
    calories: "120 cal",
    servings: 8,
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&h=400&fit=crop",
    tags: ["Sunnah", "Quick", "Natural Sugar"],
    ingredients: ["12 Medjool dates", "24 almonds", "Honey drizzle", "Cinnamon"],
    color: "from-yellow-600 to-amber-700",
  },
  {
    id: 4,
    title: "Baked Salmon with Vegetables",
    subtitle: "Brain & Body Fuel",
    description: "Omega-3 rich salmon keeps you focused during long Taraweeh nights.",
    time: "30 min",
    calories: "380 cal",
    servings: 4,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop",
    tags: ["Omega-3", "Brain Food", "Healthy Fats"],
    ingredients: ["4 salmon fillets", "Broccoli", "Bell peppers", "Olive oil", "Garlic, herbs"],
    color: "from-rose-500 to-pink-600",
  },
  {
    id: 5,
    title: "Chickpea & Spinach Curry",
    subtitle: "Plant Power",
    description: "Hearty, filling, and packed with iron. Perfect for vegetarian iftars.",
    time: "25 min",
    calories: "280 cal",
    servings: 6,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
    tags: ["Vegetarian", "High Fiber", "Iron Rich"],
    ingredients: ["2 cans chickpeas", "Fresh spinach", "Coconut milk", "Curry spices", "Ginger, garlic"],
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: 6,
    title: "Yogurt Parfait with Fruits",
    subtitle: "Refreshing Finish",
    description: "Cool, creamy, and probiotic-rich. Aids digestion after fasting.",
    time: "10 min",
    calories: "220 cal",
    servings: 4,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop",
    tags: ["Probiotics", "Refreshing", "Quick"],
    ingredients: ["Greek yogurt", "Mixed berries", "Honey", "Granola", "Mint leaves"],
    color: "from-purple-500 to-violet-600",
  },
];

export default function RecipesPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleDownload = () => {
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, save to database/send to API
    setSubmitted(true);
    // Trigger download
    window.open("/downloads/healthy-iftar-recipes.pdf", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-emerald-900 to-black text-white">
      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block bg-green-500/20 text-green-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
            🥗 FREE DOWNLOAD - 15 Healthy Recipes
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Healthy Iftar Recipes
            <span className="block text-green-400">That Won&apos;t Slow You Down</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Light, nutritious meals so you feel energized for Taraweeh — not sleepy on the couch.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-400" />
              <span>Healthy & Light</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-400" />
              <span>Quick to Make</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-green-400" />
              <span>Sunnah Inspired</span>
            </div>
          </div>

          <Button 
            size="xl" 
            onClick={handleDownload}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-lg px-10 py-6 gap-3"
          >
            <Download className="h-6 w-6" />
            Download Free Recipe Book
          </Button>
        </div>
      </section>

      {/* Download Form Modal */}
      {showForm && !submitted && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="bg-gradient-to-br from-green-900 to-emerald-900 border-green-500/30 max-w-md w-full">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Get Your Free Recipes</h3>
              <p className="text-gray-300 mb-6">Enter your info for instant download</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Input
                  type="tel"
                  placeholder="Phone (801) 555-1234"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-6">
                  <Download className="h-5 w-5 mr-2" />
                  Download Now - FREE
                </Button>
              </form>
              
              <button 
                onClick={() => setShowForm(false)}
                className="w-full text-gray-400 text-sm mt-4 hover:text-white"
              >
                Maybe later
              </button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recipe Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Preview: What&apos;s Inside
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <Card key={recipe.id} className="bg-white/5 border-0 overflow-hidden group hover:scale-[1.02] transition-transform">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${recipe.color} opacity-40`} />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {recipe.tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="bg-black/50 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold text-white mb-1">{recipe.title}</h3>
                  <p className="text-green-400 text-sm mb-3">{recipe.subtitle}</p>
                  <p className="text-gray-400 text-sm mb-4">{recipe.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-4 w-4" />
                      {recipe.calories}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {recipe.servings}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Eat Healthy This Ramadan?
          </h2>
          <p className="text-gray-300 mb-8">
            Get all 15 recipes with full instructions, nutrition info, and shopping lists.
          </p>
          
          <Button 
            size="xl" 
            onClick={handleDownload}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-lg px-10 py-6 gap-3"
          >
            <Download className="h-6 w-6" />
            Get Free Recipe Book
          </Button>
          
          <p className="text-gray-500 text-sm mt-4">
            Join 500+ Muslims eating healthy this Ramadan
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-gray-500">
        <p>© 2026 MIC Utah · Madina Islamic Center</p>
      </footer>
    </div>
  );
}
