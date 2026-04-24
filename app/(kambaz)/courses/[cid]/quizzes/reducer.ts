/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  course: string;
  quizType:
    | "GRADED_QUIZ"
    | "PRACTICE_QUIZ"
    | "GRADED_SURVEY"
    | "UNGRADED_SURVEY";
  assignmentGroup: "QUIZZES" | "EXAMS" | "ASSIGNMENTS" | "PROJECTS";
  shuffleAnswers: boolean;
  timeLimit: number;
  hasTimeLimit: boolean;
  multipleAttempts: boolean;
  howManyAttempts: number;
  showCorrectAnswers: string;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  published: boolean;
  questions: QuizQuestion[];
}

export interface QuestionBase {
  _id: string;
  title: string;
  points: number;
  questionText: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: "MULTIPLE_CHOICE";
  choices: { text: string; isCorrect: boolean }[];
}

export interface TrueFalseQuestion extends QuestionBase {
  type: "TRUE_FALSE";
  correctAnswer: boolean;
}

export interface FillInTheBlankQuestion extends QuestionBase {
  type: "FILL_IN_THE_BLANK";
  correctAnswers: string[];
}

export type QuizQuestion =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillInTheBlankQuestion;

export const defaultQuiz: Omit<Quiz, "_id" | "course"> = {
  title: "New Quiz",
  description: "",
  quizType: "GRADED_QUIZ",
  assignmentGroup: "QUIZZES",
  shuffleAnswers: true,
  timeLimit: 20,
  hasTimeLimit: true,
  multipleAttempts: false,
  howManyAttempts: 1,
  showCorrectAnswers: "immediately",
  accessCode: "",
  oneQuestionAtATime: true,
  webcamRequired: false,
  lockQuestionsAfterAnswering: false,
  dueDate: "",
  availableDate: "",
  untilDate: "",
  published: false,
  questions: [],
};

export interface PendingAttempt {
  quizId: string;
  answers: Record<string, number | boolean | string>;
}

const initialState: { quizzes: Quiz[]; pendingAttempt: PendingAttempt | null } = {
  quizzes: [],
  pendingAttempt: null,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, quiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId) as any;
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q,
      ) as any;
    },
    setQuizzes: (state, { payload: quizzes }) => {
      state.quizzes = quizzes;
    },
    togglePublishQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, published: !q.published } : q,
      ) as any;
    },
    setPendingAttempt: (state, { payload }: { payload: PendingAttempt }) => {
      state.pendingAttempt = payload;
    },
  },
});

export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuizzes,
  togglePublishQuiz,
  setPendingAttempt,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
