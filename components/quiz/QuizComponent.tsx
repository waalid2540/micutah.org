"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizComponentProps {
  title: string;
  questions: Question[];
  onComplete?: (score: number, total: number) => void;
}

export default function QuizComponent({
  title,
  questions,
  onComplete,
}: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setIsAnswered(true);
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      if (onComplete) {
        onComplete(score + (selectedAnswer === question.correctAnswer ? 1 : 0), questions.length);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const finalScore = score + (selectedAnswer === question.correctAnswer ? 1 : 0);
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              percentage >= 70
                ? "bg-green-100"
                : percentage >= 50
                ? "bg-yellow-100"
                : "bg-red-100"
            }`}
          >
            <Trophy
              className={`h-12 w-12 ${
                percentage >= 70
                  ? "text-green-600"
                  : percentage >= 50
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            />
          </div>

          <h2 className="text-3xl font-heading font-bold text-primary mb-2">
            Quiz Complete!
          </h2>
          <p className="text-gray-600 mb-6">
            You scored {finalScore} out of {questions.length}
          </p>

          <div className="bg-cream rounded-xl p-6 mb-6">
            <p className="text-5xl font-bold text-primary mb-2">{percentage}%</p>
            <p className="text-gray-600">
              {percentage >= 70
                ? "Excellent work! MashAllah!"
                : percentage >= 50
                ? "Good effort! Keep learning!"
                : "Keep studying and try again!"}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={handleRestart} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={() => window.history.back()}>
              Back to Quizzes
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-xl">{title}</CardTitle>
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-6">{question.question}</h3>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isCorrect = index === question.correctAnswer;
            const isSelected = index === selectedAnswer;

            let buttonStyle = "border-2 p-4 rounded-xl text-left transition-all ";

            if (isAnswered) {
              if (isCorrect) {
                buttonStyle += "border-green-500 bg-green-50";
              } else if (isSelected && !isCorrect) {
                buttonStyle += "border-red-500 bg-red-50";
              } else {
                buttonStyle += "border-gray-200 opacity-50";
              }
            } else {
              if (isSelected) {
                buttonStyle += "border-primary bg-primary/10";
              } else {
                buttonStyle += "border-gray-200 hover:border-primary hover:bg-primary/5";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full ${buttonStyle}`}
                disabled={isAnswered}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {isAnswered && question.explanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Explanation:</strong> {question.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Score: {score} / {currentQuestion + (isAnswered ? 1 : 0)}
          </div>

          {!isAnswered ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="gap-2">
              {currentQuestion + 1 < questions.length ? (
                <>
                  Next Question
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                "See Results"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
