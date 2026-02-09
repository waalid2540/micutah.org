'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const chapters = [
  {
    id: 1,
    title: "The Night Worth Everything",
    content: `
      <p class="text-2xl leading-relaxed mb-8 text-purple-200">
        Imagine being offered a gift worth <span class="text-white font-bold">83 years</span> of worship.
      </p>
      
      <p class="mb-6">
        That's not a metaphor. That's Laylatul Qadr.
      </p>
      
      <p class="mb-6">
        Allah tells us in the Quran:
      </p>
      
      <blockquote class="border-l-4 border-purple-500 pl-6 py-4 my-8 bg-white/5 rounded-r-xl">
        <p class="text-xl arabic-text mb-4 text-right leading-loose">لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ</p>
        <p class="text-lg italic text-purple-300">"The Night of Decree is better than a thousand months."</p>
        <cite class="text-sm text-gray-400 block mt-2">— Surah Al-Qadr, 97:3</cite>
      </blockquote>
      
      <p class="mb-6">
        One thousand months. That's <span class="text-purple-400 font-semibold">83 years and 4 months</span> of worship, compressed into a single night.
      </p>
      
      <p class="mb-6">
        Most people will sleep through it.
      </p>
      
      <p class="text-xl text-white font-medium">
        You won't.
      </p>
    `
  },
  {
    id: 2,
    title: "When Is It?",
    content: `
      <p class="text-xl mb-8 text-purple-200">
        The Prophet ﷺ told us to seek it in the <span class="text-white font-bold">odd nights of the last ten</span>.
      </p>
      
      <div class="grid grid-cols-5 gap-3 my-10">
        ${[21, 23, 25, 27, 29].map(n => `
          <div class="aspect-square rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-2xl font-bold shadow-lg shadow-purple-500/20">
            ${n}
          </div>
        `).join('')}
      </div>
      
      <p class="mb-6">
        Nights <span class="text-purple-400">21, 23, 25, 27, and 29</span> of Ramadan.
      </p>
      
      <p class="mb-6">
        But here's what most people miss: the Islamic night <span class="text-white">begins at Maghrib</span>, not midnight.
      </p>
      
      <div class="bg-white/5 rounded-2xl p-6 my-8 border border-purple-500/30">
        <p class="text-lg mb-4">📅 <span class="font-semibold">Ramadan 2026 Odd Nights:</span></p>
        <ul class="space-y-2 text-gray-300">
          <li>• Night of 21st → Evening of <span class="text-white">March 19</span></li>
          <li>• Night of 23rd → Evening of <span class="text-white">March 21</span></li>
          <li>• Night of 25th → Evening of <span class="text-white">March 23</span></li>
          <li>• Night of 27th → Evening of <span class="text-white">March 25</span></li>
          <li>• Night of 29th → Evening of <span class="text-white">March 27</span></li>
        </ul>
      </div>
      
      <p class="text-lg text-purple-300 italic">
        Many scholars say the 27th is most likely. But the wise Muslim doesn't gamble with eternity—they show up for all five.
      </p>
    `
  },
  {
    id: 3,
    title: "Signs of the Night",
    content: `
      <p class="text-xl mb-8 text-purple-200">
        The Prophet ﷺ described signs of Laylatul Qadr.
      </p>
      
      <div class="space-y-6 my-10">
        <div class="bg-gradient-to-r from-purple-900/50 to-transparent rounded-xl p-6 border-l-4 border-purple-500">
          <h4 class="text-xl font-bold mb-2">🌙 A Calm, Serene Night</h4>
          <p class="text-gray-300">Neither too hot nor too cold. A peaceful stillness in the air.</p>
        </div>
        
        <div class="bg-gradient-to-r from-purple-900/50 to-transparent rounded-xl p-6 border-l-4 border-purple-500">
          <h4 class="text-xl font-bold mb-2">☀️ The Sun Rises Gently</h4>
          <p class="text-gray-300">The next morning, the sun rises without strong rays—like a full moon, soft and mellow.</p>
        </div>
        
        <div class="bg-gradient-to-r from-purple-900/50 to-transparent rounded-xl p-6 border-l-4 border-purple-500">
          <h4 class="text-xl font-bold mb-2">💫 Your Heart Knows</h4>
          <p class="text-gray-300">Many companions reported a feeling of peace and tranquility that night.</p>
        </div>
      </div>
      
      <p class="mb-6">
        But here's the thing—
      </p>
      
      <p class="text-xl text-white font-medium mb-6">
        You don't need to <em>see</em> the signs to <em>receive</em> the reward.
      </p>
      
      <p class="text-gray-300">
        The angels descend whether you notice them or not. Your job is to be in worship when they arrive.
      </p>
    `
  },
  {
    id: 4,
    title: "The One Dua You Need",
    content: `
      <p class="text-xl mb-8 text-purple-200">
        Aisha (RA) asked the Prophet ﷺ: <em>"If I know which night is Laylatul Qadr, what should I say?"</em>
      </p>
      
      <p class="mb-8">
        He gave her one dua. Just one.
      </p>
      
      <div class="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 my-10 text-center border border-purple-500/30 shadow-2xl shadow-purple-500/20">
        <p class="text-4xl arabic-text mb-6 leading-loose">
          اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي
        </p>
        <p class="text-xl italic text-purple-200 mb-4">
          Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni
        </p>
        <p class="text-lg text-white">
          "O Allah, You are the Pardoner, You love to pardon, so pardon me."
        </p>
      </div>
      
      <p class="mb-6">
        Why this dua? Why not ask for wealth, health, or success?
      </p>
      
      <p class="mb-6 text-purple-300">
        Because if Allah pardons you, <span class="text-white">everything else follows</span>.
      </p>
      
      <p class="text-lg">
        A pardoned slave is a freed slave. And a freed slave has access to everything in the Master's house.
      </p>
    `
  },
  {
    id: 5,
    title: "Your 10-Night Battle Plan",
    content: `
      <p class="text-xl mb-8 text-purple-200">
        Don't wing it. Champions prepare.
      </p>
      
      <div class="space-y-6 my-10">
        <div class="flex gap-4 items-start">
          <div class="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold flex-shrink-0">1</div>
          <div>
            <h4 class="text-xl font-bold mb-1">Clear Your Schedule</h4>
            <p class="text-gray-300">Take time off work if you can. Minimize social obligations. This is your annual performance review with Allah.</p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
          <div class="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold flex-shrink-0">2</div>
          <div>
            <h4 class="text-xl font-bold mb-1">Nap Before Maghrib</h4>
            <p class="text-gray-300">Sleep from Dhuhr to Asr. You'll need energy for the night ahead.</p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
          <div class="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold flex-shrink-0">3</div>
          <div>
            <h4 class="text-xl font-bold mb-1">Break Fast Light</h4>
            <p class="text-gray-300">Heavy food makes you sleepy. Dates, water, light meal. Save the feast for Eid.</p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
          <div class="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold flex-shrink-0">4</div>
          <div>
            <h4 class="text-xl font-bold mb-1">Pray Taraweeh at the Masjid</h4>
            <p class="text-gray-300">The community energy keeps you going. Plus, completing with the Imam = qiyam all night.</p>
          </div>
        </div>
        
        <div class="flex gap-4 items-start">
          <div class="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-xl font-bold flex-shrink-0">5</div>
          <div>
            <h4 class="text-xl font-bold mb-1">The 2 AM Push</h4>
            <p class="text-gray-300">This is when most people quit. Push through. The last third of the night is when Allah descends.</p>
          </div>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-yellow-500/20 to-transparent rounded-xl p-6 border-l-4 border-yellow-500 my-8">
        <p class="text-lg">⚡ <span class="font-bold">Pro tip:</span> Make a dua list beforehand. When you're tired at 3 AM, you won't have to think—just read and cry.</p>
      </div>
    `
  },
  {
    id: 6,
    title: "What to Do All Night",
    content: `
      <p class="text-xl mb-8 text-purple-200">
        Variety keeps you awake. Rotate through these:
      </p>
      
      <div class="grid gap-4 my-10">
        <div class="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-purple-500/50 transition-colors">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">🕌</span>
            <h4 class="text-lg font-bold">Salah</h4>
          </div>
          <p class="text-gray-400">Pray 2 rakats at a time. Take your time in sujood. That's where the magic happens.</p>
        </div>
        
        <div class="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-purple-500/50 transition-colors">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">📖</span>
            <h4 class="text-lg font-bold">Quran</h4>
          </div>
          <p class="text-gray-400">Read, listen, or memorize. Even 1 letter = 10 rewards. Tonight, each letter could = 30 million rewards.</p>
        </div>
        
        <div class="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-purple-500/50 transition-colors">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">🤲</span>
            <h4 class="text-lg font-bold">Dua</h4>
          </div>
          <p class="text-gray-400">Pour your heart out. Ask for everything. For yourself, your family, the Ummah, the world.</p>
        </div>
        
        <div class="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-purple-500/50 transition-colors">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">📿</span>
            <h4 class="text-lg font-bold">Dhikr</h4>
          </div>
          <p class="text-gray-400">SubhanAllah, Alhamdulillah, Allahu Akbar. Simple words, infinite weight on the scales.</p>
        </div>
        
        <div class="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-purple-500/50 transition-colors">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">😢</span>
            <h4 class="text-lg font-bold">Tawbah</h4>
          </div>
          <p class="text-gray-400">Repent sincerely. Name your sins. Feel the weight. Then feel it lift.</p>
        </div>
      </div>
      
      <p class="text-lg text-center text-purple-300 mt-10">
        The goal isn't perfection. The goal is <span class="text-white font-bold">presence</span>.
      </p>
    `
  },
  {
    id: 7,
    title: "Don't Miss It",
    content: `
      <p class="text-xl mb-8 text-purple-200">
        Here's the uncomfortable truth:
      </p>
      
      <p class="text-2xl text-white font-bold mb-8">
        Most Muslims will miss Laylatul Qadr this year.
      </p>
      
      <p class="mb-6">
        They'll be tired. They'll say "next year." They'll scroll through their phones until Fajr, then wonder why Ramadan felt empty.
      </p>
      
      <p class="mb-6">
        But you—you've read this far. That's not an accident.
      </p>
      
      <p class="mb-8">
        Allah guided you to this book, at this moment, for a reason.
      </p>
      
      <div class="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 my-10 text-center">
        <p class="text-2xl font-bold mb-4">This is your sign.</p>
        <p class="text-lg text-purple-100">This Ramadan, show up. All 10 nights. Give it everything.</p>
      </div>
      
      <p class="mb-6">
        The Prophet ﷺ said:
      </p>
      
      <blockquote class="border-l-4 border-purple-500 pl-6 py-4 my-8 bg-white/5 rounded-r-xl">
        <p class="text-lg italic text-purple-300">"Whoever stands in prayer on Laylatul Qadr, out of faith and seeking reward, all their previous sins will be forgiven."</p>
        <cite class="text-sm text-gray-400 block mt-2">— Bukhari & Muslim</cite>
      </blockquote>
      
      <p class="text-xl text-center text-white font-medium mt-10">
        83 years of reward. A clean slate. A new beginning.
      </p>
      
      <p class="text-xl text-center text-purple-400 mt-4">
        All you have to do is show up.
      </p>
    `
  }
];

export default function LastTenNightsBook() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showToc, setShowToc] = useState(false);

  const chapter = chapters[currentChapter];
  const progress = ((currentChapter + 1) / chapters.length) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-b border-white/10 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/ramadan/books" className="text-gray-400 hover:text-white transition-colors">
            ← Books
          </Link>
          <button 
            onClick={() => setShowToc(!showToc)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {currentChapter + 1} / {chapters.length}
          </button>
        </div>
      </header>

      {/* Table of Contents Overlay */}
      <AnimatePresence>
        {showToc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 overflow-auto"
          >
            <div className="max-w-xl mx-auto px-4 py-20">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Chapters</h2>
                <button 
                  onClick={() => setShowToc(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-2">
                {chapters.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setCurrentChapter(idx);
                      setShowToc(false);
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-colors ${
                      idx === currentChapter 
                        ? 'bg-purple-600' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-gray-400 mr-3">{idx + 1}.</span>
                    {ch.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book Content */}
      <main className="pt-24 pb-32 px-4">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.article
              key={chapter.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Chapter number */}
              <div className="text-purple-500 font-medium mb-4">
                Chapter {chapter.id}
              </div>
              
              {/* Chapter title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-12 leading-tight">
                {chapter.title}
              </h1>
              
              {/* Chapter content */}
              <div 
                className="prose prose-invert prose-lg max-w-none
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-blockquote:border-purple-500
                  prose-strong:text-white
                  prose-em:text-purple-300"
                dangerouslySetInnerHTML={{ __html: chapter.content }}
              />
            </motion.article>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
            disabled={currentChapter === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentChapter === 0 
                ? 'text-gray-600 cursor-not-allowed' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            ← Previous
          </button>
          
          {currentChapter === chapters.length - 1 ? (
            <Link
              href="/ramadan/planner"
              className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all"
            >
              Get the Planner →
            </Link>
          ) : (
            <button
              onClick={() => setCurrentChapter(Math.min(chapters.length - 1, currentChapter + 1))}
              className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all"
            >
              Next Chapter →
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
