import type { Question } from '@/types/quiz';
import axios from 'axios';

const API_BASE_URL = 'https://opentdb.com/api.php?amount=5';

export class QuizApiService {
  static async fetchQuestions(): Promise<Question[]> {
    try {
      const response = await axios.get(API_BASE_URL);
      if (!response.data || !response.data.results) {
        throw new Error('Invalid response structure from API');
      }

      const rawData = response.data.results;

      const updatedData = rawData.map((question: Question) => {
        const answers = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];

        const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

        return {
          ...question,
          answers: shuffledAnswers,
        };
      });
      return updatedData;
    } catch (error) {
      console.error('Failed to fetch questions from API:', error);
      return this.getMockQuestions();
    }
  }

  static getMockQuestions(): Question[] {
    return [
      {
        answers: ['London', 'Berlin', 'Madrid', 'Paris'],
        type: 'multiple',
        question: 'What is the capital of France?',
        correct_answer: 'Paris',
        incorrect_answers: ['London', 'Berlin', 'Madrid'],
        category: 'Geography',
        difficulty: 'easy',
      },
      {
        answers: ['Einstein', 'Newton', 'Galileo', 'Curie'],
        type: 'multiple',
        question: 'What is 2 + 2?',
        correct_answer: '4',
        incorrect_answers: ['3', '5', '6'],
        category: 'Math',
        difficulty: 'easy',
      },
    ];
  }
}
