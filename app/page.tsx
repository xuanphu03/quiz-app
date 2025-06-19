'use client';

import { useQuiz } from '@/hooks/useQuiz';
import { QuizApiService } from '@/services/quizApi';
import { StartScreen } from '@/components/StartScreen';
import { QuestionScreen } from '@/components/QuestionScreen';
import { ResultsScreen } from '@/components/ResultsScreen';
import { ReviewScreen } from '@/components/ReviewScreen';

const QUIZ_CONFIG = {
  passingScore: 60,
  questionsCount: 5,
};

export default function QuizApp() {
  const {
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
    submitAnswer,
    getQuizResult,
    currentQuestion,
    progress,
    elapsedTime,
  } = useQuiz(QUIZ_CONFIG);

  const handleStartQuiz = async () => {
    setLoading(true);
    setError('');

    try {
      const questionsData = await QuizApiService.fetchQuestions();
      console.log('Fetched questions:', questionsData);
      startQuiz(questionsData);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error('Error starting quiz:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAnswers = () => {
    setGameState('review');
  };

  const handleBackToResults = () => {
    setGameState('results');
  };

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
          <button
            onClick={() => {
              setError('');
              handleStartQuiz();
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render appropriate screen based on game state
  switch (gameState) {
    case 'start':
      return <StartScreen onStart={handleStartQuiz} loading={loading} />;

    case 'playing':
      if (!currentQuestion) return null;
      return (
        <QuestionScreen
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          showFeedback={showFeedback}
          userAnswers={userAnswers}
          elapsedTime={elapsedTime}
          progress={progress}
          onAnswerSelect={selectAnswer}
          onSubmitAnswer={submitAnswer}
        />
      );

    case 'results':
      return (
        <ResultsScreen
          result={getQuizResult()}
          onReview={handleReviewAnswers}
          onRetry={resetQuiz}
        />
      );

    case 'review':
      return (
        <ReviewScreen
          questions={questions}
          userAnswers={userAnswers}
          onBackToResults={handleBackToResults}
          onRetry={resetQuiz}
        />
      );

    default:
      return null;
  }
}
