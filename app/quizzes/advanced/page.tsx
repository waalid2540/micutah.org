"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import QuizComponent from "@/components/quiz/QuizComponent";

// Sample advanced questions
const advancedQuestions = [
  {
    id: "1",
    question: "In which year did the Hijrah (migration to Medina) occur?",
    options: ["610 CE", "620 CE", "622 CE", "630 CE"],
    correctAnswer: 2,
    explanation:
      "The Hijrah took place in 622 CE, marking the beginning of the Islamic calendar.",
  },
  {
    id: "2",
    question: "How many surahs are in the Quran?",
    options: ["100", "110", "114", "120"],
    correctAnswer: 2,
    explanation:
      "The Quran consists of 114 surahs (chapters), ranging from 3 to 286 verses each.",
  },
  {
    id: "3",
    question: "What is the longest surah in the Quran?",
    options: ["Surah Al-Fatihah", "Surah Al-Baqarah", "Surah Al-Imran", "Surah An-Nisa"],
    correctAnswer: 1,
    explanation:
      "Surah Al-Baqarah is the longest surah with 286 verses.",
  },
  {
    id: "4",
    question: "How long did it take for the Quran to be revealed?",
    options: ["10 years", "15 years", "23 years", "30 years"],
    correctAnswer: 2,
    explanation:
      "The Quran was revealed over a period of approximately 23 years (610-632 CE).",
  },
  {
    id: "5",
    question: "What was the first revelation received by Prophet Muhammad (PBUH)?",
    options: [
      "Surah Al-Fatihah",
      "The first verses of Surah Al-Alaq",
      "Surah Al-Ikhlas",
      "Surah Al-Nas",
    ],
    correctAnswer: 1,
    explanation:
      "The first revelation was 'Iqra' (Read) - the first five verses of Surah Al-Alaq.",
  },
  {
    id: "6",
    question: "In which battle did the Muslims first face the Quraysh army?",
    options: ["Battle of Uhud", "Battle of Badr", "Battle of the Trench", "Battle of Hunayn"],
    correctAnswer: 1,
    explanation:
      "The Battle of Badr in 624 CE was the first major military confrontation between the Muslims and Quraysh.",
  },
  {
    id: "7",
    question: "What is the name of the cave where Prophet Muhammad (PBUH) received the first revelation?",
    options: ["Cave of Thawr", "Cave of Hira", "Cave of Kahf", "Cave of Ashab"],
    correctAnswer: 1,
    explanation:
      "The Cave of Hira on Mount Jabal al-Nour near Mecca is where the first revelation came.",
  },
  {
    id: "8",
    question: "How many prophets are mentioned by name in the Quran?",
    options: ["15", "20", "25", "30"],
    correctAnswer: 2,
    explanation:
      "Twenty-five prophets are mentioned by name in the Quran, though Islamic tradition holds there were many more.",
  },
  {
    id: "9",
    question: "What is the night journey of Prophet Muhammad (PBUH) called?",
    options: ["Hijrah", "Isra and Miraj", "Laylatul Qadr", "Badr"],
    correctAnswer: 1,
    explanation:
      "Isra refers to the night journey from Mecca to Jerusalem, and Miraj to the ascension through the heavens.",
  },
  {
    id: "10",
    question: "In which year was Mecca conquered by the Muslims?",
    options: ["625 CE", "627 CE", "630 CE", "632 CE"],
    correctAnswer: 2,
    explanation:
      "The conquest of Mecca (Fath Makkah) occurred in 630 CE, the 8th year after Hijrah.",
  },
  {
    id: "11",
    question: "What is the meaning of 'Taqwa'?",
    options: [
      "Charity",
      "God-consciousness and piety",
      "Pilgrimage",
      "Prayer",
    ],
    correctAnswer: 1,
    explanation:
      "Taqwa refers to being conscious of Allah, often translated as piety, fear of Allah, or righteousness.",
  },
  {
    id: "12",
    question: "Who compiled the Quran into a single book?",
    options: [
      "Prophet Muhammad (PBUH)",
      "Abu Bakr (RA)",
      "Umar (RA)",
      "Uthman (RA)",
    ],
    correctAnswer: 1,
    explanation:
      "Abu Bakr (RA) ordered the first compilation after the Battle of Yamama. Uthman (RA) later standardized copies.",
  },
];

export default function AdvancedQuizPage() {
  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4">
        {/* Back link */}
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-light mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Quizzes
        </Link>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-primary mb-2">
              Advanced Quiz
            </h1>
            <p className="text-gray-600">
              Challenge yourself with detailed questions on Seerah and Islamic history
            </p>
          </div>

          <QuizComponent
            title="Seerah & Islamic History"
            questions={advancedQuestions}
          />
        </div>
      </div>
    </div>
  );
}
