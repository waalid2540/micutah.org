"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import QuizComponent from "@/components/quiz/QuizComponent";

// Sample beginner questions
const beginnerQuestions = [
  {
    id: "1",
    question: "How many pillars are there in Islam?",
    options: ["Three", "Four", "Five", "Six"],
    correctAnswer: 2,
    explanation:
      "The Five Pillars of Islam are: Shahada (faith), Salah (prayer), Zakat (charity), Sawm (fasting), and Hajj (pilgrimage).",
  },
  {
    id: "2",
    question: "What is the first pillar of Islam?",
    options: ["Prayer (Salah)", "Fasting (Sawm)", "Declaration of Faith (Shahada)", "Charity (Zakat)"],
    correctAnswer: 2,
    explanation:
      "Shahada is the declaration of faith: 'There is no god but Allah, and Muhammad is the messenger of Allah.'",
  },
  {
    id: "3",
    question: "How many times a day do Muslims pray?",
    options: ["Three", "Four", "Five", "Seven"],
    correctAnswer: 2,
    explanation:
      "Muslims pray five times daily: Fajr (dawn), Dhuhr (noon), Asr (afternoon), Maghrib (sunset), and Isha (night).",
  },
  {
    id: "4",
    question: "In which month do Muslims fast?",
    options: ["Shaban", "Ramadan", "Shawwal", "Dhul Hijjah"],
    correctAnswer: 1,
    explanation:
      "Ramadan is the ninth month of the Islamic calendar, during which Muslims fast from dawn to sunset.",
  },
  {
    id: "5",
    question: "What is Zakat?",
    options: [
      "A type of prayer",
      "Obligatory charity",
      "Fasting during Ramadan",
      "Pilgrimage to Mecca",
    ],
    correctAnswer: 1,
    explanation:
      "Zakat is the obligatory giving of a set proportion of one's wealth to charity, typically 2.5% annually.",
  },
  {
    id: "6",
    question: "What is the holy book of Islam called?",
    options: ["Torah", "Bible", "Quran", "Vedas"],
    correctAnswer: 2,
    explanation:
      "The Quran is the holy book of Islam, revealed to Prophet Muhammad (PBUH) over 23 years.",
  },
  {
    id: "7",
    question: "In which city is the Kaaba located?",
    options: ["Medina", "Jerusalem", "Mecca", "Cairo"],
    correctAnswer: 2,
    explanation:
      "The Kaaba is located in Mecca, Saudi Arabia, and is the most sacred site in Islam.",
  },
  {
    id: "8",
    question: "Who was the last prophet in Islam?",
    options: ["Ibrahim (AS)", "Musa (AS)", "Isa (AS)", "Muhammad (PBUH)"],
    correctAnswer: 3,
    explanation:
      "Prophet Muhammad (PBUH) is considered the final prophet and messenger of Allah in Islam.",
  },
  {
    id: "9",
    question: "What is the direction Muslims face when praying?",
    options: ["East", "West", "Towards Mecca (Qibla)", "North"],
    correctAnswer: 2,
    explanation:
      "Muslims face the Kaaba in Mecca (the Qibla) when performing their prayers.",
  },
  {
    id: "10",
    question: "What is the Islamic greeting?",
    options: ["Hello", "Namaste", "Assalamu Alaikum", "Shalom"],
    correctAnswer: 2,
    explanation:
      "Assalamu Alaikum means 'Peace be upon you' and is the standard greeting among Muslims.",
  },
];

export default function BeginnerQuizPage() {
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
              Beginner Quiz
            </h1>
            <p className="text-gray-600">
              Test your knowledge of basic Islamic concepts
            </p>
          </div>

          <QuizComponent
            title="Basic Islamic Knowledge"
            questions={beginnerQuestions}
          />
        </div>
      </div>
    </div>
  );
}
