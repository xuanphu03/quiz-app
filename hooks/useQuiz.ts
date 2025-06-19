'use client';

import { useState, useCallback } from 'react';
import type {
  Question,
  UserAnswer,
  QuizResult,
  GameState,
  QuizConfig,
} from '@/types/quiz';

export const useQuiz = (config: QuizConfig) => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const resetQuiz = useCallback(() => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer('');
    setShowFeedback(false);
    setStartTime(0);
    setEndTime(0);
    setQuestionStartTime(0);
    setError('');
  }, []);

  const startQuiz = useCallback((questionsData: Question[]) => {
    setQuestions(questionsData);
    setGameState('playing');
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer('');
    setShowFeedback(false);
    setError('');
  }, []);

  const selectAnswer = useCallback(
    (answer: string) => {
      if (showFeedback) return;
      setSelectedAnswer(answer);
    },
    [showFeedback]
  );

  const onSubmitAnswer = useCallback(() => {
    if (!selectedAnswer || !questions[currentQuestionIndex]) return;

    const currentQuestion = questions[currentQuestionIndex];
    const timeSpent = Date.now() - questionStartTime;

    const correctAnswerKey = currentQuestion.correct_answer;

    const correctAnswerText = correctAnswerKey
      ? currentQuestion.correct_answer
      : '';

    const selectedAnswerText =
    currentQuestion.answers[Number.parseInt(selectedAnswer)] || '';
    
    const isCorrect = correctAnswerText === selectedAnswerText;

    const userAnswer: UserAnswer = {
      selectedAnswer,
      selectedAnswerText,
      isCorrect,
      correctAnswer: correctAnswerText || '',
      timeSpent,
    };

    setUserAnswers((prev) => [...prev, userAnswer]);
    setShowFeedback(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer('');
        setShowFeedback(false);
        setQuestionStartTime(Date.now());
      } else {
        setEndTime(Date.now());
        setGameState('results');
      }
    }, 2000);
  }, [selectedAnswer, questions, currentQuestionIndex, questionStartTime]);

  const getQuizResult = useCallback((): QuizResult => {
    const correctAnswers = userAnswers.filter(
      (answer) => answer.isCorrect
    ).length;
    const totalTime = endTime - startTime;
    const score = Math.round((correctAnswers / questions.length) * 100);
    const passed = score >= config.passingScore;

    return {
      totalQuestions: questions.length,
      correctAnswers,
      incorrectAnswers: questions.length - correctAnswers,
      totalTime,
      score,
      passed,
      userAnswers,
    };
  }, [userAnswers, endTime, startTime, questions.length, config.passingScore]);

  return {
    gameState,
    setGameState,
    questions,
    currentQuestionIndex,
    userAnswers,
    selectedAnswer,
    showFeedback,
    loading,
    setLoading,
    error,
    setError,
    resetQuiz,
    startQuiz,
    selectAnswer,
    onSubmitAnswer,
    getQuizResult,
    currentQuestion: questions[currentQuestionIndex] || null,
    progress:
      questions.length > 0
        ? ((currentQuestionIndex + 1) / questions.length) * 100
        : 0,
    elapsedTime: startTime > 0 ? Date.now() - startTime : 0,
  };
};
