'use client';

import type { QuizResult } from '@/types/quiz';
import {
  formatTime,
  formatTimeDetailed,
  formatScore,
  getScoreColor,
} from '@/utils/formatters';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, XCircle, Target, RotateCcw, Eye } from 'lucide-react';

interface ResultsScreenProps {
  result: QuizResult;
  onReview: () => void;
  onRetry: () => void;
}

export function ResultsScreen({
  result,
  onReview,
  onRetry,
}: ResultsScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <div
            className={`mx-auto mb-4 w-20 h-20 rounded-full flex items-center justify-center ${
              result.passed
                ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                : 'bg-gradient-to-r from-red-500 to-rose-600'
            }`}
          >
            {result.passed ? (
              <Trophy className="w-10 h-10 text-white" />
            ) : (
              <XCircle className="w-10 h-10 text-white" />
            )}
          </div>
          <CardTitle className="text-3xl font-bold">
            {result.passed ? 'Congratulations! 🎉' : 'Keep Practicing! 💪'}
          </CardTitle>
          <CardDescription className="text-lg">
            {result.passed
              ? 'You passed the quiz with flying colors!'
              : "You need 60% to pass. Don't give up!"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div
                className={`text-3xl font-bold ${getScoreColor(result.score)}`}
              >
                {formatScore(result.score)}
              </div>
              <div className="text-sm text-muted-foreground">Final Score</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {result.correctAnswers}
              </div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-600">
                {result.incorrectAnswers}
              </div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {formatTime(result.totalTime)}
              </div>
              <div className="text-sm text-muted-foreground">Total Time</div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg text-left space-y-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Quiz Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Questions answered:</span>
                  <span className="font-medium">{result.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Correct answers:</span>
                  <span className="font-medium text-green-600">
                    {result.correctAnswers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Incorrect answers:</span>
                  <span className="font-medium text-red-600">
                    {result.incorrectAnswers}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total time:</span>
                  <span className="font-medium">
                    {formatTimeDetailed(result.totalTime)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Average per question:</span>
                  <span className="font-medium">
                    {formatTime(result.totalTime / result.totalQuestions)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant={result.passed ? 'default' : 'destructive'}>
                    {result.passed ? 'PASSED' : 'FAILED'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cn('p-4 rounded-lg ', {
              'bg-green-50 border border-green-200': result.score >= 90,
              'bg-blue-50 border border-blue-200': result.score >= 80,
              'bg-yellow-50 border border-yellow-200': result.score >= 60,
              'bg-red-50 border border-red-200': result.score < 60,
            })}
          >
            <p className="font-medium">
              {result.score >= 90 &&
                "Outstanding! You're a programming expert! 🌟"}
              {result.score >= 80 &&
                result.score < 90 &&
                'Excellent work! You have strong programming knowledge! 👏'}
              {result.score >= 60 &&
                result.score < 80 &&
                'Good job! You passed with solid understanding! ✅'}
              {result.score < 60 &&
                "Keep studying and try again. You're on the right track! 📚"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onReview}
              variant="outline"
              className="flex-1 py-3"
              size="lg"
            >
              <Eye className="w-4 h-4 mr-2" />
              Review Answers
            </Button>
            <Button onClick={onRetry} className="flex-1 py-3" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Quiz Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
