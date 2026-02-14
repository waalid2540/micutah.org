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
  reference?: string;
  occasion?: string;
}

// ALL AUTHENTIC DUAS - Quran & Sahih/Hasan Hadith ONLY
const duas: Dua[] = [
  // ============ IFTAR ============
  {
    id: 1,
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    transliteration: "Dhahaba adh-dhama'u wabtallatil-'urooqu wa thabatal-ajru in shaa'Allah",
    translation: "The thirst has gone, the veins are moistened, and the reward is assured, if Allah wills.",
    category: "iftar",
    source: "Sunan Abu Dawud 2357",
    reference: "Graded Hasan by Al-Albani",
    occasion: "When breaking fast"
  },
  
  // ============ LAYLATUL QADR ============
  {
    id: 2,
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    transliteration: "Allahumma innaka 'Afuwwun tuhibbul-'afwa fa'fu 'anni",
    translation: "O Allah, You are the Pardoning One, You love to pardon, so pardon me.",
    category: "laylatul-qadr",
    source: "Sunan al-Tirmidhi 3513",
    reference: "Graded Sahih by Al-Albani. Aisha (RA) asked the Prophet ﷺ what to say on Laylatul Qadr.",
    occasion: "The Last 10 Nights"
  },

  // ============ FASTING & RAMADAN ============
  {
    id: 3,
    arabic: "إِذَا أَفْطَرَ أَحَدُكُمْ فَلْيُفْطِرْ عَلَى تَمْرٍ فَإِنَّهُ بَرَكَةٌ",
    transliteration: "Idha aftara ahadukum falyuftir 'ala tamr fa innahu barakah",
    translation: "When one of you breaks his fast, let him break it with dates, for it is blessed.",
    category: "iftar",
    source: "Sunan Abu Dawud 2355",
    reference: "Graded Sahih by Al-Albani",
    occasion: "Breaking fast with dates"
  },

  // ============ QURAN - RABBANA DUAS ============
  {
    id: 4,
    arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Rabbana taqabbal minna innaka Antas-Samee'ul-'Aleem",
    translation: "Our Lord, accept [this] from us. Indeed, You are the All-Hearing, the All-Knowing.",
    category: "quran",
    source: "Quran 2:127",
    reference: "Dua of Ibrahim (AS) & Ismail (AS)",
    occasion: "After good deeds"
  },
  {
    id: 5,
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar",
    translation: "Our Lord, give us in this world good and in the Hereafter good and protect us from the punishment of the Fire.",
    category: "quran",
    source: "Quran 2:201",
    reference: "The Prophet ﷺ used to make this dua frequently (Bukhari & Muslim)",
    occasion: "Comprehensive dua"
  },
  {
    id: 6,
    arabic: "رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا",
    transliteration: "Rabbana la tu'akhidhna in nasina aw akhta'na",
    translation: "Our Lord, do not impose blame upon us if we forget or make a mistake.",
    category: "quran",
    source: "Quran 2:286",
    reference: "Allah said 'I have done so' (Sahih Muslim 126)",
    occasion: "Seeking forgiveness"
  },
  {
    id: 7,
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ",
    transliteration: "Rabbana la tuzigh quloobana ba'da idh hadaytana wa hab lana min ladunka rahmah innaka Antal-Wahhab",
    translation: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.",
    category: "quran",
    source: "Quran 3:8",
    reference: "Dua for steadfastness",
    occasion: "For guidance"
  },
  {
    id: 8,
    arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
    transliteration: "Rabbana-ghfir lana dhunubana wa israfana fi amrina wa thabbit aqdamana wansurna 'alal-qawmil-kafireen",
    translation: "Our Lord, forgive us our sins and our excesses in our affairs, make our feet firm, and give us victory over the disbelieving people.",
    category: "quran",
    source: "Quran 3:147",
    reference: "Dua of the righteous",
    occasion: "For forgiveness & strength"
  },
  {
    id: 9,
    arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    transliteration: "Rabbana zalamna anfusana wa in lam taghfir lana wa tarhamna lanakoonanna minal-khasireen",
    translation: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
    category: "forgiveness",
    source: "Quran 7:23",
    reference: "Dua of Adam (AS) & Hawwa (AS)",
    occasion: "Seeking forgiveness"
  },
  {
    id: 10,
    arabic: "رَبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ",
    transliteration: "Rabbighfir warham wa Anta khayrur-rahimeen",
    translation: "My Lord, forgive and have mercy, and You are the best of the merciful.",
    category: "forgiveness",
    source: "Quran 23:118",
    reference: "Command from Allah to say this",
    occasion: "Seeking mercy"
  },
  {
    id: 11,
    arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqeena imama",
    translation: "Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us leaders for the righteous.",
    category: "family",
    source: "Quran 25:74",
    reference: "Dua of the servants of the Most Merciful",
    occasion: "For family"
  },
  {
    id: 12,
    arabic: "رَبِّ زِدْنِي عِلْمًا",
    transliteration: "Rabbi zidni 'ilma",
    translation: "My Lord, increase me in knowledge.",
    category: "quran",
    source: "Quran 20:114",
    reference: "Command to the Prophet ﷺ",
    occasion: "For knowledge"
  },
  {
    id: 13,
    arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ",
    transliteration: "Rabbi awzi'ni an ashkura ni'matakal-lati an'amta 'alayya wa 'ala walidayya",
    translation: "My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents.",
    category: "general",
    source: "Quran 27:19 & 46:15",
    reference: "Dua of Sulayman (AS) and for parents",
    occasion: "For gratitude"
  },
  {
    id: 14,
    arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
    transliteration: "Rabbij'alni muqeemas-salati wa min dhurriyyati Rabbana wa taqabbal du'a",
    translation: "My Lord, make me an establisher of prayer, and from my descendants. Our Lord, accept my supplication.",
    category: "family",
    source: "Quran 14:40",
    reference: "Dua of Ibrahim (AS)",
    occasion: "For prayer & family"
  },

  // ============ AUTHENTIC HADITH DUAS ============
  {
    id: 15,
    arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatik",
    translation: "O Allah, help me to remember You, to thank You, and to worship You in the best way.",
    category: "general",
    source: "Sunan Abu Dawud 1522",
    reference: "Graded Sahih by Al-Albani. The Prophet ﷺ told Mu'adh (RA) to say this after every prayer.",
    occasion: "After salah"
  },
  {
    id: 16,
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ",
    transliteration: "Allahumma inni as'alukal-jannata wa a'udhu bika minan-nar",
    translation: "O Allah, I ask You for Paradise and seek refuge in You from the Fire.",
    category: "general",
    source: "Sunan Abu Dawud 792",
    reference: "Graded Sahih by Al-Albani",
    occasion: "Daily supplication"
  },
  {
    id: 17,
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ وَالْبُخْلِ وَالْجُبْنِ وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'id-dayni wa ghalabatir-rijal",
    translation: "O Allah, I seek refuge in You from anxiety and sorrow, from weakness and laziness, from miserliness and cowardice, from being burdened by debt and overpowered by people.",
    category: "protection",
    source: "Sahih al-Bukhari 6369",
    reference: "The Prophet ﷺ used to say this frequently",
    occasion: "For relief from distress"
  },
  {
    id: 18,
    arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ وَعَلاَنِيَتَهُ وَسِرَّهُ",
    transliteration: "Allahumma-ghfir li dhanbi kullahu, diqqahu wa jillahu, wa awwalahu wa akhirahu, wa 'alaniyyatahu wa sirrahu",
    translation: "O Allah, forgive me all my sins, small and great, first and last, open and secret.",
    category: "forgiveness",
    source: "Sahih Muslim 483",
    reference: "The Prophet ﷺ said this in sujood",
    occasion: "In prostration"
  },
  {
    id: 19,
    arabic: "سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ اللَّهُمَّ اغْفِرْ لِي",
    transliteration: "Subhanaka Allahumma Rabbana wa bihamdika Allahumma-ghfir li",
    translation: "Glory is to You, O Allah, our Lord, and praise is to You. O Allah, forgive me.",
    category: "forgiveness",
    source: "Sahih al-Bukhari 794, Sahih Muslim 484",
    reference: "The Prophet ﷺ said this often in ruku' and sujood",
    occasion: "In ruku' and sujood"
  },
  {
    id: 20,
    arabic: "أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha alladhi la ilaha illa Huwal-Hayyul-Qayyum wa atubu ilayh",
    translation: "I seek forgiveness from Allah, there is no god but He, the Ever-Living, the Sustainer, and I repent to Him.",
    category: "forgiveness",
    source: "Sunan Abu Dawud 1517, Sunan al-Tirmidhi 3577",
    reference: "Graded Sahih. Whoever says this, Allah forgives him even if he fled from battle.",
    occasion: "Seeking forgiveness"
  },
  {
    id: 21,
    arabic: "سَيِّدُ الاِسْتِغْفَارِ: اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana 'abduka, wa ana 'ala 'ahdika wa wa'dika mastata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u bidhanbi, faghfir li, fa innahu la yaghfirudh-dhunuba illa Anta",
    translation: "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant. I uphold Your covenant and promise as best I can. I seek refuge in You from the evil I have done. I acknowledge Your blessings upon me and I acknowledge my sin. Forgive me, for none forgives sins but You.",
    category: "forgiveness",
    source: "Sahih al-Bukhari 6306",
    reference: "Sayyid al-Istighfar - The Master of Seeking Forgiveness. Whoever says it in the morning with conviction and dies that day enters Paradise.",
    occasion: "Morning & Evening"
  },
  {
    id: 22,
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلاً مُتَقَبَّلاً",
    transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbalan",
    translation: "O Allah, I ask You for beneficial knowledge, good provision, and accepted deeds.",
    category: "general",
    source: "Sunan Ibn Majah 925",
    reference: "Graded Hasan by Al-Albani. The Prophet ﷺ said this after Fajr prayer.",
    occasion: "After Fajr"
  },
  {
    id: 23,
    arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي الَّذِي هُوَ عِصْمَةُ أَمْرِي وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي",
    transliteration: "Allahumma aslih li deeni alladhi huwa 'ismatu amri, wa aslih li dunyaya allati fiha ma'ashi, wa aslih li akhirati allati fiha ma'adi",
    translation: "O Allah, set right my religion which is the safeguard of my affairs, set right my worldly life in which is my livelihood, and set right my Hereafter to which is my return.",
    category: "general",
    source: "Sahih Muslim 2720",
    reference: "Authentic hadith",
    occasion: "Comprehensive dua"
  },
  {
    id: 24,
    arabic: "اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي",
    transliteration: "Allahumma-hdini wa saddidni",
    translation: "O Allah, guide me and keep me on the straight path.",
    category: "guidance",
    source: "Sahih Muslim 2725",
    reference: "Authentic hadith",
    occasion: "For guidance"
  },
  {
    id: 25,
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا عَمِلْتُ وَمِنْ شَرِّ مَا لَمْ أَعْمَلْ",
    transliteration: "Allahumma inni a'udhu bika min sharri ma 'amiltu wa min sharri ma lam a'mal",
    translation: "O Allah, I seek refuge in You from the evil of what I have done and from the evil of what I have not done.",
    category: "protection",
    source: "Sahih Muslim 2716",
    reference: "Authentic hadith",
    occasion: "For protection"
  },
  {
    id: 26,
    arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
    transliteration: "Ya Muqallibal-qulub, thabbit qalbi 'ala deenik",
    translation: "O Turner of hearts, make my heart firm upon Your religion.",
    category: "guidance",
    source: "Sunan al-Tirmidhi 2140",
    reference: "Graded Sahih. The Prophet ﷺ used to say this often.",
    occasion: "For steadfastness"
  },
  {
    id: 27,
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    transliteration: "Allahumma inni as'alukal-huda wat-tuqa wal-'afafa wal-ghina",
    translation: "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.",
    category: "guidance",
    source: "Sahih Muslim 2721",
    reference: "Authentic hadith",
    occasion: "Daily supplication"
  },
  {
    id: 28,
    arabic: "رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا",
    transliteration: "Rabbana atina min ladunka rahmatan wa hayyi' lana min amrina rashada",
    translation: "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.",
    category: "guidance",
    source: "Quran 18:10",
    reference: "Dua of the People of the Cave",
    occasion: "For guidance & mercy"
  },
  {
    id: 29,
    arabic: "لَا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ",
    transliteration: "La ilaha illa Anta Subhanaka inni kuntu minaz-zalimeen",
    translation: "There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.",
    category: "forgiveness",
    source: "Quran 21:87",
    reference: "Dua of Yunus (AS). The Prophet ﷺ said no Muslim supplicates with this except that Allah answers him.",
    occasion: "In times of distress"
  },
  {
    id: 30,
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    transliteration: "Hasbunallahu wa ni'mal-wakeel",
    translation: "Sufficient for us is Allah, and He is the best Disposer of affairs.",
    category: "protection",
    source: "Quran 3:173",
    reference: "Said by Ibrahim (AS) when thrown into the fire, and by the believers at Uhud (Bukhari 4563)",
    occasion: "In times of difficulty"
  },
];

const categories = [
  { id: 'all', label: 'All Duas', icon: Sparkles, color: 'from-purple-500 to-indigo-600' },
  { id: 'iftar', label: 'Iftar', icon: Utensils, color: 'from-orange-500 to-amber-600' },
  { id: 'laylatul-qadr', label: 'Laylatul Qadr', icon: Moon, color: 'from-violet-500 to-purple-700' },
  { id: 'quran', label: 'From Quran', icon: BookOpen, color: 'from-emerald-500 to-green-600' },
  { id: 'forgiveness', label: 'Forgiveness', icon: Heart, color: 'from-rose-500 to-pink-600' },
  { id: 'guidance', label: 'Guidance', icon: Star, color: 'from-blue-500 to-cyan-600' },
  { id: 'protection', label: 'Protection', icon: Sun, color: 'from-yellow-500 to-orange-500' },
  { id: 'general', label: 'General', icon: Sparkles, color: 'from-slate-500 to-slate-700' },
  { id: 'family', label: 'Family', icon: Heart, color: 'from-pink-500 to-rose-600' },
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
    
    const text = `${currentDua.arabic}\n\n${currentDua.transliteration}\n\n"${currentDua.translation}"\n\n📚 ${currentDua.source}${currentDua.reference ? `\n${currentDua.reference}` : ''}`;
    
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareDua = async () => {
    if (!currentDua) return;
    
    const text = `🤲 ${currentDua.occasion || 'Dua'}\n\n${currentDua.arabic}\n\n${currentDua.transliteration}\n\n"${currentDua.translation}"\n\n📚 ${currentDua.source}\n\n🌙 More authentic duas: micutah.org/ramadan/duas`;
    
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
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-sm font-medium px-4 py-2 rounded-full mb-6">
              ✓ 100% Authentic • Quran & Sahih Hadith Only
            </div>
            
            <span className="text-5xl mb-4 block">🤲</span>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-200 via-white to-purple-200 bg-clip-text text-transparent">
                Ramadan Dua Generator
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-xl mx-auto mb-8">
              30 authentic supplications from the Quran and Sunnah for the blessed month
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = selectedCategory === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all text-sm ${
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
                      <p className="text-3xl md:text-4xl leading-loose" dir="rtl" style={{ fontFamily: 'Amiri, serif', lineHeight: '2.5' }}>
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
                    <div className="text-center mb-6">
                      <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                        "{currentDua.translation}"
                      </p>
                    </div>
                    
                    {/* Source & Reference */}
                    <div className="text-center space-y-1">
                      <span className="text-white/80 text-sm font-medium block">
                        📚 {currentDua.source}
                      </span>
                      {currentDua.reference && (
                        <span className="text-white/60 text-xs block">
                          {currentDua.reference}
                        </span>
                      )}
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
          <h2 className="text-2xl font-bold text-center mb-2">
            All {selectedCategory === 'all' ? 'Authentic' : currentCategoryData.label} Duas
          </h2>
          <p className="text-center text-slate-400 mb-8">
            {getFilteredDuas().length} duas from Quran & Sahih Hadith
          </p>
          
          <div className="space-y-4">
            {getFilteredDuas().map((dua, index) => (
              <motion.div
                key={dua.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
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
                        <p className="text-xl mb-2" dir="rtl" style={{ fontFamily: 'Amiri, serif' }}>
                          {dua.arabic}
                        </p>
                        <p className="text-white/70 text-sm mb-1 italic">
                          {dua.transliteration}
                        </p>
                        <p className="text-white/90">
                          "{dua.translation}"
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                          <span className="text-xs text-emerald-400 font-medium">📚 {dua.source}</span>
                          {dua.occasion && (
                            <span className="text-xs bg-white/10 px-2 py-0.5 rounded">
                              {dua.occasion}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-white/30 rotate-[-90deg] flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Source Note */}
      <section className="px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-emerald-500/10 border-emerald-500/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold text-emerald-300 mb-2">✓ Authenticity Guaranteed</h3>
              <p className="text-slate-300 text-sm">
                All duas on this page are sourced directly from the <strong>Quran</strong> or <strong>Sahih/Hasan Hadith</strong> collections (Bukhari, Muslim, Abu Dawud, Tirmidhi, Ibn Majah). Each dua includes its source and grading.
              </p>
            </CardContent>
          </Card>
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
