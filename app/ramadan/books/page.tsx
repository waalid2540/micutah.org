'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const books = [
  {
    slug: 'last-10-nights',
    title: 'The Last 10 Nights',
    subtitle: 'Your Guide to Catching Laylatul Qadr',
    description: 'The night worth more than 1,000 months is coming. Don\'t miss it.',
    pages: 15,
    readTime: '12 min',
    gradient: 'from-purple-900 via-indigo-900 to-black',
    accent: 'purple',
    icon: '🌙',
    featured: true,
  },
  {
    slug: 'virtues-of-ramadan',
    title: 'The Virtues of Ramadan',
    subtitle: 'Why This Month Changes Everything',
    description: 'Discover the blessings, rewards, and transformative power of the holy month.',
    pages: 32,
    readTime: '25 min',
    gradient: 'from-amber-900 via-orange-900 to-black',
    accent: 'amber',
    icon: '✨',
    isPdf: true,
    pdfUrl: '/downloads/virtues-of-ramadan.pdf',
    featured: true,
  },
  {
    slug: 'guilt-free-ramadan',
    title: 'Guilt-Free Ramadan',
    subtitle: 'Tips for a Peaceful & Productive Fast',
    description: 'Practical advice to make your Ramadan spiritually fulfilling without burnout.',
    pages: 20,
    readTime: '15 min',
    gradient: 'from-teal-900 via-cyan-900 to-black',
    accent: 'teal',
    icon: '🕊️',
    isPdf: true,
    pdfUrl: '/downloads/guilt-free-ramadan.pdf',
    featured: true,
  },
  {
    slug: 'first-ramadan',
    title: 'Your First Ramadan',
    subtitle: 'A Complete Guide for New Muslims',
    description: 'Everything you need to know for a beautiful first fast.',
    pages: 12,
    readTime: '10 min',
    gradient: 'from-emerald-900 via-teal-900 to-black',
    accent: 'emerald',
    icon: '🌱',
    comingSoon: true,
  },
  {
    slug: 'fasting-heart',
    title: 'The Fasting Heart',
    subtitle: 'Beyond Hunger: The Soul of Sawm',
    description: 'Discover the deeper spiritual secrets of fasting.',
    pages: 14,
    readTime: '11 min',
    gradient: 'from-rose-900 via-pink-900 to-black',
    accent: 'rose',
    icon: '❤️',
    comingSoon: true,
  },
];

export default function RamadanBooksPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-[128px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[128px]" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-6xl mb-6 block">📚</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Ramadan Reading
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Short, powerful books to transform your Ramadan. 
              <span className="text-purple-400"> Read free, right here.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book, index) => (
              <motion.div
                key={book.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {book.comingSoon ? (
                  <div className="group relative h-full">
                    <BookCover book={book} />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <span className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                ) : book.isPdf ? (
                  <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer" className="group block h-full">
                    <BookCover book={book} interactive isPdf />
                  </a>
                ) : (
                  <Link href={`/ramadan/books/${book.slug}`} className="group block h-full">
                    <BookCover book={book} interactive />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Want the Ramadan Planner too?</h2>
          <p className="text-gray-400 mb-8">
            Get our complete 40+ page printable planner with daily tracking, duas, and more.
          </p>
          <Link
            href="/ramadan/planner"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-8 py-4 rounded-full transition-all transform hover:scale-105"
          >
            📥 Get Free Planner
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-gray-500">
        <p>© 2026 MIC Utah · Madina Islamic Center</p>
        <p className="text-sm mt-2">Serving Muslims worldwide with free Islamic resources</p>
      </footer>
    </div>
  );
}

function BookCover({ book, interactive = false, isPdf = false }: { book: typeof books[0]; interactive?: boolean; isPdf?: boolean }) {
  return (
    <div 
      className={`relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br ${book.gradient} ${
        interactive ? 'transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-purple-500/20' : ''
      }`}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0">
        {/* Islamic geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id={`pattern-${book.slug}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="8" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="10" cy="10" r="4" fill="none" stroke="white" strokeWidth="0.5" />
              {isPdf && (
                <>
                  <path d="M5,5 L15,15 M15,5 L5,15" stroke="white" strokeWidth="0.3" opacity="0.5" />
                </>
              )}
            </pattern>
            <rect x="0" y="0" width="100" height="100" fill={`url(#pattern-${book.slug})`} />
          </svg>
        </div>
        
        {/* Glow effect */}
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-32 ${isPdf ? 'bg-amber-500/30' : 'bg-white/20'} rounded-full blur-3xl`} />
        
        {/* Extra decorative stars for Virtues book */}
        {isPdf && (
          <>
            <div className="absolute top-10 right-8 text-2xl animate-pulse">✦</div>
            <div className="absolute top-20 left-8 text-lg animate-pulse delay-300">✦</div>
            <div className="absolute bottom-32 right-12 text-xl animate-pulse delay-700">✦</div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Top */}
        <div className="flex justify-between items-start">
          <div>
            {book.featured && (
              <span className="inline-block bg-white/20 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full mb-4">
                ⭐ Featured
              </span>
            )}
            <span className="text-5xl block mb-2">{book.icon}</span>
          </div>
          {isPdf && (
            <span className="bg-red-500/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full">
              PDF
            </span>
          )}
        </div>

        {/* Center - Title */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
            {book.title}
          </h3>
          <p className="text-white/70 text-sm">
            {book.subtitle}
          </p>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between text-sm text-white/60">
          <span>{book.pages} pages</span>
          <span>{book.readTime} read</span>
        </div>

        {/* Read/Download button on hover */}
        {interactive && (
          <div className="absolute inset-x-6 bottom-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className={`${isPdf ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-white'} ${isPdf ? 'text-white' : 'text-black'} font-semibold py-3 rounded-xl text-center`}>
              {isPdf ? '📥 Download PDF' : 'Read Now →'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
