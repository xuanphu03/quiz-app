'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Home, RotateCcw, Clock } from 'lucide-react';
import type { Question, UserAnswer } from '@/types/quiz';
import { formatTime } from '@/utils/formatters';

interface ReviewScreenProps {
  questions: Question[];
  userAnswers: UserAnswer[];
  onBackToResults: () => void;
  onRetry: () => void;
}

export function ReviewScreen({
  questions,
  userAnswers,
  onBackToResults,
  onRetry,
}: ReviewScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Review Your Answers</h1>
          <p className="text-muted-foreground text-lg">
            See how you performed on each question
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Badge variant="outline" className="text-sm">
              {userAnswers.filter((a) => a.isCorrect).length} Correct
            </Badge>
            <Badge variant="outline" className="text-sm">
              {userAnswers.filter((a) => !a.isCorrect).length} Incorrect
            </Badge>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            if (!userAnswer) return null;

            return (
              <Card key={question.question} className="shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Question {index + 1}</Badge>
                        {question.category && (
                          <Badge variant="secondary" className="text-xs">
                            {question.category}
                          </Badge>
                        )}
                        {question.difficulty && (
                          <Badge
                            variant={
                              question.difficulty === 'easy'
                                ? 'default'
                                : question.difficulty === 'medium'
                                ? 'secondary'
                                : 'destructive'
                            }
                            className="text-xs"
                          >
                            {question.difficulty}
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className="text-xs flex items-center gap-1"
                        >
                          <Clock className="w-3 h-3" />
                          {formatTime(userAnswer.timeSpent)}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-relaxed">
                        {question.question}
                      </CardTitle>
                    </div>
                    <div className="flex-shrink-0">
                      {userAnswer.isCorrect ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-6 h-6" />
                          <span className="font-medium">Correct</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <XCircle className="w-6 h-6" />
                          <span className="font-medium">Incorrect</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {Object.entries(question.answers).map(([key, answer]) => {
                        if (!answer) return null;

                        const isUserAnswer =
                          userAnswer.selectedAnswerText === answer;
                        const isCorrectAnswer =
                          question.answers[Number.parseInt(key)] === question.correct_answer;

                        return (
                          <div
                            key={key}
                            className={`p-3 rounded-lg border-2 ${
                              isCorrectAnswer
                                ? 'border-green-500 bg-green-50'
                                : isUserAnswer && !isCorrectAnswer
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
                                    isCorrectAnswer
                                      ? 'border-green-500 bg-green-500 text-white'
                                      : isUserAnswer && !isCorrectAnswer
                                      ? 'border-red-500 bg-red-500 text-white'
                                      : 'border-gray-300'
                                  }`}
                                >
                                  {key.replace('answer_', '').toUpperCase()}
                                </div>
                                <span className="text-sm">{answer}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {isUserAnswer && (
                                  <Badge variant="outline" className="text-xs">
                                    Your Answer
                                  </Badge>
                                )}
                                {isCorrectAnswer && (
                                  <Badge variant="default" className="text-xs">
                                    Correct
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div
                      className={`p-3 rounded-lg border-l-4 ${
                        userAnswer.isCorrect
                          ? 'bg-green-50 border-green-500'
                          : 'bg-red-50 border-red-500'
                      }`}
                    >
                      <div className="text-sm">
                        <div className="font-medium mb-1">
                          Your answer:{' '}
                          <span
                            className={
                              userAnswer.isCorrect
                                ? 'text-green-700'
                                : 'text-red-700'
                            }
                          >
                            {userAnswer.selectedAnswerText}
                          </span>
                        </div>
                        {!userAnswer.isCorrect && (
                          <div className="font-medium">
                            Correct answer:{' '}
                            <span className="text-green-700">
                              {userAnswer.correctAnswer}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onBackToResults}
            variant="outline"
            className="px-8 py-3"
            size="lg"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
          <Button onClick={onRetry} className="px-8 py-3" size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Quiz Again
          </Button>
        </div>
      </div>
    </div>
  );
}
