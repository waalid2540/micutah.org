'use client';

import Link from "next/link";
import { BookOpen, Library, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const books = [
  {
    slug: 'last-10-nights',
    title: 'The Last 10 Nights',
    subtitle: 'Catch Laylatul Qadr',
    icon: '🌙',
    gradient: 'from-purple-600 to-indigo-700',
    href: '/ramadan/books/last-10-nights',
    reads: '2.4k',
  },
  {
    slug: 'virtues-of-ramadan',
    title: 'Virtues of Ramadan',
    subtitle: 'Why This Month Matters',
    icon: '✨',
    gradient: 'from-amber-500 to-orange-600',
    href: '/downloads/virtues-of-ramadan.pdf',
    isPdf: true,
    reads: '1.8k',
  },
];

export default function RamadanBooks() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4" />
            Trending Now
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Free Ramadan Books
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Short, powerful reads to prepare your heart for the blessed month. 
            Join thousands of Muslims reading this Ramadan.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          {books.map((book) => (
            <Link
              key={book.slug}
              href={book.href}
              target={book.isPdf ? "_blank" : undefined}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:border-amber-500/50 hover:scale-[1.02]">
                <div className="flex gap-4">
                  {/* Mini cover */}
                  <div className={`w-20 h-28 rounded-xl bg-gradient-to-br ${book.gradient} p-3 flex-shrink-0 shadow-lg`}>
                    <span className="text-2xl">{book.icon}</span>
                    {book.isPdf && (
                      <span className="block text-[8px] bg-red-500 px-1 py-0.5 rounded font-bold mt-1 w-fit">PDF</span>
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-amber-300 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{book.subtitle}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Sparkles className="h-3 w-3" />
                        {book.reads} reads
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">Free</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/ramadan/books">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white gap-2 shadow-lg shadow-amber-500/25">
              <Library className="h-5 w-5" />
              Browse All Books
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
