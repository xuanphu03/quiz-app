'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trophy, Clock, CheckCircle, RotateCcw } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  loading: boolean;
}

export function StartScreen({ onStart, loading }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Programming Quiz Challenge
          </CardTitle>
          <CardDescription className="text-lg">
            Test your programming knowledge with our comprehensive quiz
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-blue-500 mb-2" />
              <div className="font-semibold">10 Questions</div>
              <div className="text-muted-foreground">Multiple choice</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
              <Clock className="w-8 h-8 text-green-500 mb-2" />
              <div className="font-semibold">No Time Limit</div>
              <div className="text-muted-foreground">Take your time</div>
            </div>
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
              <RotateCcw className="w-8 h-8 text-purple-500 mb-2" />
              <div className="font-semibold">70% to Pass</div>
              <div className="text-muted-foreground">Passing score</div>
            </div>
          </div>

          <div className="text-left space-y-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800">Quiz Features:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Immediate feedback after each answer</li>
              <li>• Review all answers at the end</li>
              <li>• Track your time and score</li>
              <li>• Retake the quiz anytime</li>
            </ul>
          </div>

          <Button
            onClick={onStart}
            className="w-full text-lg py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            size="lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Loading Questions...
              </>
            ) : (
              'Start Quiz'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
