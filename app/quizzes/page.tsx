import Link from "next/link";
import { Brain, Trophy, Star, BookOpen, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Sample quiz data
const quizCategories = [
  {
    id: "pillars",
    title: "Five Pillars of Islam",
    description: "Test your knowledge of the fundamental pillars of Islam",
    questions: 10,
    difficulty: "Beginner",
    icon: Star,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "prophets",
    title: "Stories of the Prophets",
    description: "How well do you know the prophets mentioned in the Quran?",
    questions: 15,
    difficulty: "Beginner",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "seerah",
    title: "Life of Prophet Muhammad (PBUH)",
    description: "Explore the biography of our beloved Prophet",
    questions: 20,
    difficulty: "Advanced",
    icon: Star,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "quran",
    title: "Quran Knowledge",
    description: "Test your understanding of the Holy Quran",
    questions: 15,
    difficulty: "Advanced",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-700",
  },
];

// Sample leaderboard
const leaderboard = [
  { rank: 1, name: "Ahmad M.", score: 2450, quizzes: 15 },
  { rank: 2, name: "Fatima K.", score: 2320, quizzes: 14 },
  { rank: 3, name: "Yusuf A.", score: 2180, quizzes: 13 },
  { rank: 4, name: "Aisha B.", score: 1950, quizzes: 12 },
  { rank: 5, name: "Omar S.", score: 1820, quizzes: 11 },
];

export default function QuizzesPage() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Islamic Quizzes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Test and expand your Islamic knowledge with our interactive quizzes.
            Challenge yourself with beginner and advanced questions on various topics.
          </p>
        </div>

        {/* Quick Start */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link href="/quizzes/beginner">
            <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2 border-green-500">
              <CardContent className="p-8 text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-green-700 mb-2">
                  Beginner Quizzes
                </h2>
                <p className="text-gray-600 mb-4">
                  Perfect for those starting their Islamic knowledge journey.
                  Covers basic concepts and fundamentals.
                </p>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Easy to Medium
                </Badge>
              </CardContent>
            </Card>
          </Link>

          <Link href="/quizzes/advanced">
            <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-2 border-purple-500">
              <CardContent className="p-8 text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-purple-700 mb-2">
                  Advanced Quizzes
                </h2>
                <p className="text-gray-600 mb-4">
                  Challenge yourself with in-depth questions on Seerah, Tafsir,
                  Fiqh, and more.
                </p>
                <Badge variant="outline" className="text-purple-600 border-purple-600">
                  Medium to Hard
                </Badge>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quiz Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6">
              Quiz Categories
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {quizCategories.map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-lg p-3 ${quiz.color}`}>
                        <quiz.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          {quiz.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {quiz.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Badge variant="outline">
                              {quiz.questions} Questions
                            </Badge>
                            <Badge
                              variant={
                                quiz.difficulty === "Beginner"
                                  ? "secondary"
                                  : "default"
                              }
                            >
                              {quiz.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/quizzes/${quiz.difficulty.toLowerCase()}?category=${quiz.id}`}
                    >
                      <Button variant="outline" className="w-full mt-4 gap-2">
                        Start Quiz
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  Top Scorers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        player.rank === 1
                          ? "bg-accent/20"
                          : player.rank === 2
                          ? "bg-gray-100"
                          : player.rank === 3
                          ? "bg-amber-50"
                          : "bg-white"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          player.rank === 1
                            ? "bg-accent text-white"
                            : player.rank === 2
                            ? "bg-gray-400 text-white"
                            : player.rank === 3
                            ? "bg-amber-600 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {player.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{player.name}</p>
                        <p className="text-xs text-gray-600">
                          {player.quizzes} quizzes completed
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{player.score}</p>
                        <p className="text-xs text-gray-600">points</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Full Leaderboard
                </Button>
              </CardContent>
            </Card>

            {/* Your Progress */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-4">
                    Sign in to track your progress and compete on the leaderboard!
                  </p>
                  <Button>Sign In</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <Card className="mt-12 bg-primary text-white">
          <CardContent className="p-8">
            <h2 className="text-2xl font-heading font-bold mb-6 text-center">
              Why Take Islamic Quizzes?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Strengthen Knowledge</h3>
                <p className="text-sm text-white/80">
                  Reinforce what you&apos;ve learned and discover new insights
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Track Progress</h3>
                <p className="text-sm text-white/80">
                  See how you improve over time and set new goals
                </p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Learn Together</h3>
                <p className="text-sm text-white/80">
                  Compete with family and friends in a fun way
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
