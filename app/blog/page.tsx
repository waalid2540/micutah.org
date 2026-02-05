import Link from "next/link";
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample blog posts (would come from database in production)
const blogPosts = [
  {
    id: "1",
    slug: "preparing-for-ramadan-2026",
    title: "Preparing for Ramadan 2026: A Spiritual Guide",
    excerpt:
      "As Ramadan approaches, learn how to prepare yourself spiritually, mentally, and physically for the blessed month ahead.",
    author: "Imam Abdullah",
    category: "Spiritual",
    date: "2026-02-15",
    image: null,
    featured: true,
  },
  {
    id: "2",
    slug: "friday-khutbah-patience-in-trials",
    title: "Friday Khutbah Summary: Patience in Times of Trial",
    excerpt:
      "Key lessons from last Friday's khutbah on maintaining sabr (patience) during difficult times and finding strength in faith.",
    author: "Imam Abdullah",
    category: "Khutbah",
    date: "2026-02-10",
    image: null,
    featured: false,
  },
  {
    id: "3",
    slug: "community-iftar-preparations",
    title: "Community Iftar Preparations Underway",
    excerpt:
      "Volunteers are working hard to prepare for our daily community Iftar program. Learn how you can contribute.",
    author: "Masjid Admin",
    category: "Community",
    date: "2026-02-08",
    image: null,
    featured: false,
  },
  {
    id: "4",
    slug: "understanding-zakat-calculation",
    title: "Understanding Zakat: A Complete Guide to Calculation",
    excerpt:
      "A comprehensive guide to understanding and calculating your Zakat obligations, including nisab rates and eligible recipients.",
    author: "Sheikh Ahmad",
    category: "Islamic Knowledge",
    date: "2026-02-05",
    image: null,
    featured: true,
  },
  {
    id: "5",
    slug: "youth-program-announcement",
    title: "New Youth Program Starting This Month",
    excerpt:
      "Exciting new youth program launching at Madina Islamic Center, featuring Islamic education, sports, and community service.",
    author: "Youth Committee",
    category: "Community",
    date: "2026-02-01",
    image: null,
    featured: false,
  },
  {
    id: "6",
    slug: "virtues-of-shaban",
    title: "The Virtues of the Month of Shaban",
    excerpt:
      "Learn about the significance of Shaban and the recommended acts of worship during this blessed month before Ramadan.",
    author: "Imam Abdullah",
    category: "Spiritual",
    date: "2026-01-28",
    image: null,
    featured: false,
  },
];

const categories = [
  "All",
  "Khutbah",
  "Islamic Knowledge",
  "Community",
  "Spiritual",
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const recentPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Blog & Articles
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with khutbah summaries, Islamic knowledge, community
            news, and spiritual guidance from Madina Islamic Center.
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

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image placeholder */}
                  <div className="bg-primary/10 h-48 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary/30" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <Badge variant="outline">Featured</Badge>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-heading font-semibold text-primary hover:text-primary-light transition-colors mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recent Posts */}
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary mb-6">
            Recent Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Card
                key={post.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">
                    {post.category}
                  </Badge>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-heading font-semibold text-primary hover:text-primary-light transition-colors mb-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-12 bg-primary text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Stay Connected
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Subscribe to our newsletter to receive weekly updates, khutbah
              summaries, and community announcements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-800"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
