import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample blog post content (would come from database in production)
const samplePost = {
  id: "1",
  slug: "preparing-for-ramadan-2026",
  title: "Preparing for Ramadan 2026: A Spiritual Guide",
  excerpt:
    "As Ramadan approaches, learn how to prepare yourself spiritually, mentally, and physically for the blessed month ahead.",
  content: `
As we approach the blessed month of Ramadan, it's essential to prepare ourselves spiritually, mentally, and physically. The Prophet Muhammad (peace be upon him) used to prepare for Ramadan well in advance, and we should follow his example.

## Spiritual Preparation

### 1. Increase Your Worship Gradually
Begin increasing your daily worship now. Add extra prayers, make more dhikr (remembrance of Allah), and spend more time reading the Quran. This gradual increase will make the transition into Ramadan smoother.

### 2. Seek Forgiveness
Use this time to seek forgiveness from Allah and from those you may have wronged. Entering Ramadan with a clean heart allows you to fully benefit from its blessings.

### 3. Make Sincere Intentions
Set clear intentions for what you want to achieve this Ramadan. Whether it's completing the Quran, improving your character, or developing a stronger connection with Allah, having clear goals will help you stay focused.

## Mental Preparation

### 1. Create a Ramadan Plan
Plan your daily schedule in advance. Include time for:
- Pre-dawn meal (Suhoor)
- Morning prayers and Quran recitation
- Work/daily activities
- Evening prayers and Iftar
- Taraweeh prayers
- Night worship (especially in the last ten nights)

### 2. Minimize Distractions
Consider reducing time spent on social media, entertainment, and unnecessary activities. This mental declutter will help you focus on worship.

## Physical Preparation

### 1. Adjust Your Sleep Schedule
Start adjusting your sleep schedule now to accommodate waking up for Suhoor and staying up for Taraweeh prayers.

### 2. Prepare Your Body
If you haven't been fasting regularly, consider fasting some days in Shaban to prepare your body for the month-long fast.

### 3. Stock Up on Healthy Foods
Plan your meals in advance and stock up on nutritious foods that will sustain you through long fasting days.

## Community Preparation

At Madina Islamic Center, we're preparing an exciting lineup of programs for Ramadan 2026:

- **Daily Iftar**: Join us for community Iftar every evening
- **Taraweeh Prayers**: 20 rakaat with beautiful Quran recitation
- **Qiyam ul-Layl**: Special night prayers during the last ten nights
- **Daily Tafsir**: After Fajr Quran study sessions
- **Youth Programs**: Special activities for our young community members

We encourage you to participate in as many programs as possible and make this Ramadan the best one yet.

## Final Thoughts

Remember, the month of Ramadan is not just about abstaining from food and drink. It's a comprehensive training program for our souls, teaching us self-discipline, gratitude, and empathy for those less fortunate.

As Allah says in the Quran:

> "O you who believe, fasting is prescribed for you as it was prescribed for those before you, that you may attain taqwa (God-consciousness)." (2:183)

May Allah allow us to reach Ramadan and make it a month of spiritual growth, forgiveness, and blessings for us all. Ameen.

---

*For more information about our Ramadan programs, visit our [Ramadan page](/ramadan) or contact the masjid office.*
  `,
  author: "Imam Abdullah",
  authorTitle: "Head Imam, Madina Islamic Center",
  category: "Spiritual",
  date: "2026-02-15",
  image: null,
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In production, fetch the post by slug
  const post = samplePost;

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-light mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <article>
          {/* Header */}
          <header className="mb-8">
            <Badge variant="outline" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="text-4xl font-heading font-bold text-primary mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-white">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{post.author}</p>
                  <p className="text-sm">{post.authorTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(post.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="bg-primary/10 h-64 rounded-xl flex items-center justify-center mb-8">
            <BookOpen className="h-20 w-20 text-primary/30" />
          </div>

          {/* Content */}
          <Card>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-primary prose-a:text-primary">
                {post.content.split("\n").map((paragraph, index) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
                        {paragraph.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith("> ")) {
                    return (
                      <blockquote
                        key={index}
                        className="border-l-4 border-primary pl-4 italic my-4 text-gray-600"
                      >
                        {paragraph.replace("> ", "")}
                      </blockquote>
                    );
                  }
                  if (paragraph.startsWith("- **")) {
                    return (
                      <li key={index} className="mb-2">
                        <strong>{paragraph.match(/\*\*(.*?)\*\*/)?.[1]}:</strong>
                        {paragraph.replace(/- \*\*.*?\*\*:/, "")}
                      </li>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <li key={index} className="mb-2">
                        {paragraph.replace("- ", "")}
                      </li>
                    );
                  }
                  if (paragraph.startsWith("---")) {
                    return <hr key={index} className="my-8" />;
                  }
                  if (paragraph.startsWith("*") && paragraph.endsWith("*")) {
                    return (
                      <p key={index} className="text-sm text-gray-600 italic">
                        {paragraph.replace(/\*/g, "")}
                      </p>
                    );
                  }
                  if (paragraph.trim()) {
                    return (
                      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </CardContent>
          </Card>

          {/* Share */}
          <div className="flex items-center justify-between mt-8 py-6 border-t border-b">
            <span className="font-semibold">Share this article</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">
                    Spiritual
                  </Badge>
                  <h3 className="text-lg font-semibold mb-2">
                    The Virtues of the Month of Shaban
                  </h3>
                  <p className="text-sm text-gray-600">
                    Learn about the significance of Shaban and recommended acts of worship.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">
                    Islamic Knowledge
                  </Badge>
                  <h3 className="text-lg font-semibold mb-2">
                    Understanding Zakat: A Complete Guide
                  </h3>
                  <p className="text-sm text-gray-600">
                    A comprehensive guide to understanding and calculating your Zakat.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
