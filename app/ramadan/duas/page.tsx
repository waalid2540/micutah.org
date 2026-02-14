'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Copy, Check, Share2, BookOpen, Moon, Utensils, Sun, Star, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Dua {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  category: string;
  source: string;
  occasion?: string;
}

const duas: Dua[] = [
  // Iftar Duas
  {
    id: 1,
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    transliteration: "Dhahaba adh-dhama'u wabtallatil-'urooqu wa thabatal-ajru in shaa'Allah",
    translation: "The thirst has gone, the veins are moistened, and the reward is assured, if Allah wills.",
    category: "iftar",
    source: "Abu Dawud",
    occasion: "When breaking fast"
  },
  {
    id: 2,
    arabic: "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
    transliteration: "Allahumma laka sumtu wa 'ala rizqika aftartu",
    translation: "O Allah, for You I have fasted and upon Your provision I have broken my fast.",
    category: "iftar",
    source: "Abu Dawud",
    occasion: "When breaking fast"
  },
  // Suhoor Duas
  {
    id: 3,
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ بَرَكَةَ هَذَا السَّحُورِ",
    transliteration: "Allahumma inni as'aluka barakata hadha as-sahoor",
    translation: "O Allah, I ask You for the blessing of this suhoor.",
    category: "suhoor",
    source: "General Dua",
    occasion: "During suhoor"
  },
  {
    id: 4,
    arabic: "نَوَيْتُ صَوْمَ غَدٍ مِنْ شَهْرِ رَمَضَانَ",
    transliteration: "Nawaytu sawma ghadin min shahri Ramadan",
    translation: "I intend to fast tomorrow in the month of Ramadan.",
    category: "suhoor",
    source: "Intention for fasting",
    occasion: "Before Fajr"
  },
  // Laylatul Qadr
  {
    id: 5,
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    transliteration: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni",
    translation: "O Allah, You are the Most Forgiving, and You love forgiveness, so forgive me.",
    category: "laylatul-qadr",
    source: "Tirmidhi",
    occasion: "Especially on Laylatul Qadr"
  },
  {
    id: 6,
    arabic: "اللَّهُمَّ بَلِّغْنَا لَيْلَةَ الْقَدْرِ",
    transliteration: "Allahumma ballighna laylatal-qadr",
    translation: "O Allah, allow us to reach Laylatul Qadr.",
    category: "laylatul-qadr",
    source: "General Dua",
    occasion: "Throughout Ramadan"
  },
  // General Ramadan Duas
  {
    id: 7,
    arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Rabbana taqabbal minna innaka antas-Samee'ul-'Aleem",
    translation: "Our Lord, accept from us. Indeed, You are the All-Hearing, All-Knowing.",
    category: "general",
    source: "Quran 2:127",
    occasion: "After good deeds"
  },
  {
    id: 8,
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
    translation: "O Allah, help me to remember You, to thank You, and to worship You in the best way.",
    category: "general",
    source: "Abu Dawud",
    occasion: "Daily supplication"
  },
  {
    id: 9,
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ",
    transliteration: "Allahumma inni as'alukal-jannah wa a'udhu bika minan-naar",
    translation: "O Allah, I ask You for Paradise and seek refuge in You from the Fire.",
    category: "general",
    source: "Abu Dawud",
    occasion: "Daily supplication"
  },
  // Forgiveness
  {
    id: 10,
    arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
    transliteration: "Rabbighfir li wa tub 'alayya innaka antat-Tawwabur-Raheem",
    translation: "My Lord, forgive me and accept my repentance. Indeed, You are the Accepting of Repentance, the Merciful.",
    category: "forgiveness",
    source: "Tirmidhi",
    occasion: "Seeking forgiveness"
  },
  {
    id: 11,
    arabic: "أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha alladhi la ilaha illa huwal-Hayyul-Qayyumu wa atubu ilayh",
    translation: "I seek forgiveness from Allah, there is no god but He, the Living, the Sustainer, and I repent to Him.",
    category: "forgiveness",
    source: "Abu Dawud & Tirmidhi",
    occasion: "Seeking forgiveness"
  },
  // Quran & Worship
  {
    id: 12,
    arabic: "اللَّهُمَّ اجْعَلْ الْقُرْآنَ رَبِيعَ قَلْبِي",
    transliteration: "Allahumma-j'alil-Qur'ana rabee'a qalbi",
    translation: "O Allah, make the Quran the spring of my heart.",
    category: "quran",
    source: "Ahmad",
    occasion: "Before reciting Quran"
  },
  {
    id: 13,
    arabic: "اللَّهُمَّ ارْزُقْنِي تِلَاوَةَ كِتَابِكَ آنَاءَ اللَّيْلِ وَأَطْرَافَ النَّهَارِ",
    transliteration: "Allahumma-rzuqni tilawata kitabika ana'al-layli wa atrafan-nahar",
    translation: "O Allah, grant me the recitation of Your Book during the night and the ends of the day.",
    category: "quran",
    source: "General Dua",
    occasion: "For Quran recitation"
  },
  // Family & Community
  {
    id: 14,
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
    transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yun",
    translation: "Our Lord, grant us from our spouses and offspring comfort to our eyes.",
    category: "family",
    source: "Quran 25:74",
    occasion: "For family"
  },
  {
    id: 15,
    arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي وَدُنْيَايَ وَآخِرَتِي",
    transliteration: "Allahumma aslih li deeni wa dunyaya wa akhirati",
    translation: "O Allah, set right my religion, my worldly life, and my Hereafter.",
    category: "general",
    source: "Muslim",
    occasion: "Comprehensive dua"
  },
  // Guidance
  {
    id: 16,
    arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
    transliteration: "Allahumma-hdini wa saddidni",
    translation: "O Allah, guide me and keep me on the right path.",
    category: "guidance",
    source: "Muslim",
    occasion: "For guidance"
  },
  {
    id: 17,
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    translation: "My Lord, increase me in knowledge.",
    category: "guidance",
    source: "Quran 20:114",
    occasion: "For knowledge"
  },
  // Protection
  {
    id: 18,
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا عَمِلْتُ وَمِنْ شَرِّ مَا لَمْ أَعْمَلْ",
    transliteration: "Allahumma inni a'udhu bika min sharri ma 'amiltu wa min sharri ma lam a'mal",
    translation: "O Allah, I seek refuge in You from the evil of what I have done and from the evil of what I have not done.",
    category: "protection",
    source: "Muslim",
    occasion: "For protection"
  },
];

const categories = [
  { id: 'all', label: 'All Duas', icon: Sparkles, color: 'from-purple-500 to-indigo-600' },
  { id: 'iftar', label: 'Iftar', icon: Utensils, color: 'from-orange-500 to-amber-600' },
  { id: 'suhoor', label: 'Suhoor', icon: Sun, color: 'from-yellow-500 to-orange-500' },
  { id: 'laylatul-qadr', label: 'Laylatul Qadr', icon: Moon, color: 'from-violet-500 to-purple-700' },
  { id: 'forgiveness', label: 'Forgiveness', icon: Heart, color: 'from-rose-500 to-pink-600' },
  { id: 'quran', label: 'Quran', icon: BookOpen, color: 'from-emerald-500 to-green-600' },
  { id: 'general', label: 'General', icon: Star, color: 'from-blue-500 to-cyan-600' },
];

export default function DuaGeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentDua, setCurrentDua] = useState<Dua | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const getFilteredDuas = () => {
    if (selectedCategory === 'all') return duas;
    return duas.filter(d => d.category === selectedCategory);
  };

  const generateRandomDua = () => {
    setIsGenerating(true);
    const filtered = getFilteredDuas();
    const randomIndex = Math.floor(Math.random() * filtered.length);
    
    setTimeout(() => {
      setCurrentDua(filtered[randomIndex]);
      setIsGenerating(false);
      setCopied(false);
    }, 500);
  };

  const copyDua = async () => {
    if (!currentDua) return;
    
    const text = `${currentDua.arabic}\n\n${currentDua.transliteration}\n\n"${currentDua.translation}"\n\n— ${currentDua.source}`;
    
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareDua = async () => {
    if (!currentDua) return;
    
    const text = `🤲 Ramadan Dua\n\n${currentDua.arabic}\n\n${currentDua.transliteration}\n\n"${currentDua.translation}"\n\n— ${currentDua.source}\n\n🌙 More duas at micutah.org/ramadan/duas`;
    
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    generateRandomDua();
  }, [selectedCategory]);

  const currentCategoryData = categories.find(c => c.id === selectedCategory) || categories[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950 text-white">
      {/* Hero */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] bg-amber-600/15 rounded-full blur-[100px] animate-pulse delay-1000" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-5xl mb-4 block">🤲</span>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-200 via-white to-purple-200 bg-clip-text text-transparent">
                Ramadan Dua Generator
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-xl mx-auto mb-8">
              Beautiful supplications for every moment of the blessed month
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = selectedCategory === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dua Display */}
      <section className="px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {currentDua && (
              <motion.div
                key={currentDua.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Card className={`bg-gradient-to-br ${currentCategoryData.color} border-0 overflow-hidden shadow-2xl`}>
                  <CardContent className="p-8 md:p-12">
                    {/* Occasion badge */}
                    {currentDua.occasion && (
                      <div className="flex justify-center mb-6">
                        <span className="bg-white/20 backdrop-blur-sm text-sm px-4 py-1.5 rounded-full">
                          {currentDua.occasion}
                        </span>
                      </div>
                    )}
                    
                    {/* Arabic */}
                    <div className="text-center mb-8">
                      <p className="text-3xl md:text-4xl leading-loose font-arabic" dir="rtl" style={{ fontFamily: 'Amiri, serif', lineHeight: '2.5' }}>
                        {currentDua.arabic}
                      </p>
                    </div>
                    
                    {/* Transliteration */}
                    <div className="text-center mb-6">
                      <p className="text-lg md:text-xl text-white/80 italic">
                        {currentDua.transliteration}
                      </p>
                    </div>
                    
                    {/* Translation */}
                    <div className="text-center mb-8">
                      <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                        "{currentDua.translation}"
                      </p>
                    </div>
                    
                    {/* Source */}
                    <div className="text-center">
                      <span className="text-white/60 text-sm">
                        — {currentDua.source}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button
              size="lg"
              onClick={generateRandomDua}
              disabled={isGenerating}
              className="bg-white text-slate-900 hover:bg-white/90 font-bold gap-2 px-8"
            >
              <RefreshCw className={`h-5 w-5 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Generating...' : 'New Dua'}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={copyDua}
              className="border-white/30 text-white hover:bg-white/10 gap-2"
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={shareDua}
              className="border-white/30 text-white hover:bg-white/10 gap-2"
            >
              <Share2 className="h-5 w-5" />
              Share
            </Button>
          </div>
        </div>
      </section>

      {/* All Duas List */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            All {selectedCategory === 'all' ? '' : currentCategoryData.label} Duas ({getFilteredDuas().length})
          </h2>
          
          <div className="space-y-4">
            {getFilteredDuas().map((dua, index) => (
              <motion.div
                key={dua.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => {
                    setCurrentDua(dua);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-xl mb-2 font-arabic" dir="rtl" style={{ fontFamily: 'Amiri, serif' }}>
                          {dua.arabic}
                        </p>
                        <p className="text-white/70 text-sm mb-1 italic">
                          {dua.transliteration}
                        </p>
                        <p className="text-white/90">
                          "{dua.translation}"
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="text-xs text-white/50">{dua.source}</span>
                          {dua.occasion && (
                            <span className="text-xs bg-white/10 px-2 py-0.5 rounded">
                              {dua.occasion}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-white/30 rotate-[-90deg]" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* More Resources CTA */}
      <section className="px-4 py-16 bg-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">More Ramadan Resources</h2>
          <p className="text-slate-400 mb-8">
            Get our complete Ramadan toolkit — planners, recipes, books, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ramadan/planner">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white gap-2">
                📥 Free Planner
              </Button>
            </Link>
            <Link href="/ramadan/books">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                📚 Ramadan Books
              </Button>
            </Link>
            <Link href="/ramadan">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                🌙 All Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-slate-500">
        <p>© 2026 MIC Utah · Madina Islamic Center</p>
        <p className="text-sm mt-2">May your duas be accepted 🤲</p>
      </footer>
    </div>
  );
}
