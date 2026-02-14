'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, BookOpen, Clock, FileText, Sparkles, Moon, Heart, Leaf, ArrowRight } from 'lucide-react';

const books = [
  {
    slug: 'last-10-nights',
    title: 'The Last 10 Nights',
    subtitle: 'Your Guide to Catching Laylatul Qadr',
    description: 'The night worth more than 1,000 months is coming. Learn how to seek it, what to do each night, and powerful duas for these blessed moments.',
    pages: 15,
    readTime: '12 min',
    gradient: 'from-violet-600 via-purple-700 to-indigo-900',
    bgGlow: 'bg-purple-500',
    icon: Moon,
    emoji: '🌙',
    featured: true,
    color: 'purple',
  },
  {
    slug: 'virtues-of-ramadan',
    title: 'The Virtues of Ramadan',
    subtitle: 'Why This Month Changes Everything',
    description: 'Discover the blessings, rewards, and transformative power of the holy month. Authentic hadiths and practical wisdom.',
    pages: 32,
    readTime: '25 min',
    gradient: 'from-amber-500 via-orange-600 to-red-700',
    bgGlow: 'bg-orange-500',
    icon: Sparkles,
    emoji: '✨',
    isPdf: true,
    pdfUrl: '/downloads/virtues-of-ramadan.pdf',
    featured: true,
    color: 'amber',
  },
  {
    slug: 'guilt-free-ramadan',
    title: 'Guilt-Free Ramadan',
    subtitle: 'Tips for a Peaceful & Productive Fast',
    description: 'Practical advice to make your Ramadan spiritually fulfilling without burnout. Balance worship, work, and rest.',
    pages: 20,
    readTime: '15 min',
    gradient: 'from-teal-500 via-emerald-600 to-green-800',
    bgGlow: 'bg-teal-500',
    icon: Heart,
    emoji: '🕊️',
    isPdf: true,
    pdfUrl: '/downloads/guilt-free-ramadan.pdf',
    featured: true,
    color: 'teal',
  },
  {
    slug: 'first-ramadan',
    title: 'Your First Ramadan',
    subtitle: 'A Complete Guide for New Muslims',
    description: 'Everything you need to know for a beautiful first fast. Step-by-step guidance with love.',
    pages: 12,
    readTime: '10 min',
    gradient: 'from-emerald-500 via-green-600 to-teal-800',
    bgGlow: 'bg-emerald-500',
    icon: Leaf,
    emoji: '🌱',
    color: 'emerald',
    comingSoon: true,
  },
  {
    slug: 'fasting-heart',
    title: 'The Fasting Heart',
    subtitle: 'Beyond Hunger: The Soul of Sawm',
    description: 'Discover the deeper spiritual secrets of fasting that transform your soul.',
    pages: 14,
    readTime: '11 min',
    gradient: 'from-rose-500 via-pink-600 to-red-800',
    bgGlow: 'bg-rose-500',
    icon: Heart,
    emoji: '❤️',
    color: 'rose',
    comingSoon: true,
  },
];

export default function RamadanBooksPage() {
  const featuredBooks = books.filter(b => b.featured && !b.comingSoon);
  const otherBooks = books.filter(b => !b.featured || b.comingSoon);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px]" />
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] text-4xl animate-float">📖</div>
          <div className="absolute top-40 right-[15%] text-3xl animate-float-delayed">🌙</div>
          <div className="absolute bottom-32 left-[20%] text-2xl animate-float">✨</div>
          <div className="absolute top-32 right-[25%] text-2xl animate-float-delayed">⭐</div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full mb-8">
              <BookOpen className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-200">Free Islamic Library</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-amber-200 bg-clip-text text-transparent">
                Ramadan
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                Reading
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Short, powerful books to transform your Ramadan.
              <span className="text-purple-400 font-medium"> 100% free.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Books - Large 3D Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">Featured Books</h2>
            <p className="text-slate-400">Start with these transformative reads</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredBooks.map((book, index) => (
              <motion.div
                key={book.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                {book.isPdf ? (
                  <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Book3DCard book={book} />
                  </a>
                ) : (
                  <Link href={`/ramadan/books/${book.slug}`} className="block">
                    <Book3DCard book={book} />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Books */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
            <p className="text-slate-400">More books on the way</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {otherBooks.map((book, index) => (
              <motion.div
                key={book.slug}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <ComingSoonCard book={book} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Planner CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-amber-900/30" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <div className="text-6xl mb-6">📥</div>
          <h2 className="text-4xl font-bold mb-4">Want More?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-xl mx-auto">
            Get our complete <span className="text-amber-400 font-semibold">40+ page Ramadan Planner</span> with daily tracking, duas, goals, and more.
          </p>
          <Link
            href="/ramadan/planner"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold px-10 py-5 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-amber-500/30"
          >
            <Download className="h-5 w-5" />
            Get Free Planner
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 px-4 text-center">
        <p className="text-slate-400">© 2026 MIC Utah · Madina Islamic Center</p>
        <p className="text-sm mt-2 text-slate-500">Serving Muslims worldwide with free Islamic resources</p>
      </footer>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
}

function Book3DCard({ book }: { book: typeof books[0] }) {
  const IconComponent = book.icon;
  
  return (
    <div className="relative h-full perspective-1000">
      {/* Glow effect behind card */}
      <div className={`absolute inset-0 ${book.bgGlow}/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90`} />
      
      {/* Main card with 3D effect */}
      <div className="relative h-full transform transition-all duration-500 group-hover:rotate-y-[-5deg] group-hover:scale-[1.02]">
        {/* Book spine effect */}
        <div className={`absolute left-0 top-4 bottom-4 w-3 bg-gradient-to-r ${book.gradient} rounded-l-lg transform -skew-y-3 opacity-50`} />
        
        {/* Main book cover */}
        <div className={`relative h-full bg-gradient-to-br ${book.gradient} rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.5)]`}>
          
          {/* Decorative patterns */}
          <div className="absolute inset-0 opacity-20">
            {/* Islamic geometric pattern */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
              <defs>
                <pattern id={`geo-${book.slug}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="15" fill="none" stroke="white" strokeWidth="0.5" />
                  <circle cx="20" cy="20" r="8" fill="none" stroke="white" strokeWidth="0.5" />
                  <path d="M20,5 L20,35 M5,20 L35,20" stroke="white" strokeWidth="0.3" />
                  <path d="M8,8 L32,32 M32,8 L8,32" stroke="white" strokeWidth="0.2" />
                </pattern>
              </defs>
              <rect width="200" height="200" fill={`url(#geo-${book.slug})`} />
            </svg>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Content */}
          <div className="relative h-full flex flex-col p-8">
            {/* Top badges */}
            <div className="flex justify-between items-start mb-auto">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Featured
              </span>
              {book.isPdf && (
                <span className="bg-red-500 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  PDF
                </span>
              )}
            </div>
            
            {/* Icon */}
            <div className="my-8">
              <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                <IconComponent className="h-10 w-10 text-white" />
              </div>
            </div>
            
            {/* Title area */}
            <div className="text-center mb-6">
              <span className="text-4xl mb-3 block">{book.emoji}</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                {book.title}
              </h3>
              <p className="text-white/70 text-sm">
                {book.subtitle}
              </p>
            </div>
            
            {/* Description */}
            <p className="text-white/60 text-sm leading-relaxed text-center mb-6 line-clamp-3">
              {book.description}
            </p>
            
            {/* Stats */}
            <div className="flex items-center justify-center gap-6 text-sm text-white/60 mb-6">
              <span className="flex items-center gap-1.5">
                <FileText className="h-4 w-4" />
                {book.pages} pages
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {book.readTime}
              </span>
            </div>
            
            {/* CTA Button */}
            <div className="mt-auto">
              <div className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                book.isPdf 
                  ? 'bg-white text-slate-900 group-hover:bg-opacity-90' 
                  : 'bg-white/20 backdrop-blur-md text-white border border-white/30 group-hover:bg-white/30'
              }`}>
                <span className="flex items-center justify-center gap-2">
                  {book.isPdf ? (
                    <>
                      <Download className="h-5 w-5" />
                      Download PDF
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-5 w-5" />
                      Read Now
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComingSoonCard({ book }: { book: typeof books[0] }) {
  const IconComponent = book.icon;
  
  return (
    <div className={`relative bg-gradient-to-br ${book.gradient} rounded-2xl p-6 opacity-60 hover:opacity-80 transition-opacity`}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] rounded-2xl" />
      
      <div className="relative flex items-center gap-5">
        {/* Icon */}
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0">
          <IconComponent className="h-8 w-8 text-white/80" />
        </div>
        
        {/* Info */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white/90 mb-1">{book.title}</h3>
          <p className="text-white/60 text-sm">{book.subtitle}</p>
        </div>
        
        {/* Coming Soon Badge */}
        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/30">
          Coming Soon
        </div>
      </div>
    </div>
  );
}
