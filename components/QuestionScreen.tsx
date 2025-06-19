'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import type { Question, UserAnswer } from '@/types/quiz';
import { formatTime } from '@/utils/formatters';
import { useEffect, useState } from 'react';

interface QuestionScreenProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: string;
  showFeedback: boolean;
  userAnswers: UserAnswer[];
  progress: number;
  onAnswerSelect: (answer: string) => void;
  onSubmitAnswer: () => void;
}

export function QuestionScreen({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  showFeedback,
  userAnswers,
  progress,
  onAnswerSelect,
  onSubmitAnswer,
}: QuestionScreenProps) {
  const currentUserAnswer = userAnswers[userAnswers.length - 1];

  const [elapsedTimeState, setElapsedTimeState] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setElapsedTimeState(Date.now() - start);
    }, 1000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm font-medium">
                Question {currentIndex + 1} of {totalQuestions}
              </Badge>
              {question.category && (
                <Badge variant="secondary" className="text-sm">
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
                  className="text-sm"
                >
                  {question.difficulty}
                </Badge>
              )}
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(elapsedTimeState)}
            </Badge>
          </div>
          <Progress value={progress} className="h-3 bg-gray-200" />
        </div>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {question.answers.map((answer, index) => {
                if (!answer) return null;

                const isSelected = selectedAnswer === String(index);
                const isCorrect =
                  showFeedback &&
                  question.answers[index] === question.correct_answer;
                const isWrong = showFeedback && isSelected && !isCorrect;

                return (
                  <div
                    key={index}
                    onClick={() => onAnswerSelect(String(index))}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      isSelected && !showFeedback
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : showFeedback && isCorrect
                        ? 'border-green-500 bg-green-50 shadow-md'
                        : showFeedback && isWrong
                        ? 'border-red-500 bg-red-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    } ${showFeedback ? 'cursor-default' : 'hover:shadow-md'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                            isSelected && !showFeedback
                              ? 'border-blue-500 bg-blue-500 text-white'
                              : showFeedback && isCorrect
                              ? 'border-green-500 bg-green-500 text-white'
                              : showFeedback && isWrong
                              ? 'border-red-500 bg-red-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-800">
                          {answer}
                        </span>
                      </div>
                      {showFeedback && isCorrect && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {showFeedback && isWrong && (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {showFeedback && currentUserAnswer && (
              <div
                className={`p-4 rounded-lg border-l-4 ${
                  currentUserAnswer.isCorrect
                    ? 'bg-green-50 border-green-500'
                    : 'bg-red-50 border-red-500'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {currentUserAnswer.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-semibold">
                    {currentUserAnswer.isCorrect ? 'Correct!' : 'Incorrect!'}
                  </span>
                </div>
                {!currentUserAnswer.isCorrect && (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Correct answer:</span>{' '}
                    {currentUserAnswer.correctAnswer}
                  </p>
                )}
              </div>
            )}

            {!showFeedback && (
              <Button
                onClick={onSubmitAnswer}
                disabled={!selectedAnswer}
                className="w-full mt-6 py-3 text-lg"
                size="lg"
              >
                Submit Answer
              </Button>
            )}

            {showFeedback && (
              <div className="text-center text-sm text-gray-500 mt-4">
                {currentIndex < totalQuestions - 1
                  ? 'Moving to next question...'
                  : 'Calculating results...'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
