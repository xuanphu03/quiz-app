export interface Question {
  type: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: string;
  answers: string[];
}

export interface UserAnswer {
  // questionId: number;
  selectedAnswer: string;
  selectedAnswerText: string;
  isCorrect: boolean;
  correctAnswer: string;
  timeSpent: number;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalTime: number;
  score: number;
  passed: boolean;
  userAnswers: UserAnswer[];
}

export type GameState = 'start' | 'playing' | 'results' | 'review';

export interface QuizConfig {
  passingScore: number;
  timeLimit?: number;
  questionsCount: number;
}
