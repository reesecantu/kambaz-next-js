/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  course: string;
  quizType: "GRADED_QUIZ" | "PRACTICE_QUIZ" | "GRADED_SURVEY" | "UNGRADED_SURVEY";
  points: number;
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
  questions: any[];
}

export const defaultQuiz: Omit<Quiz, "_id" | "course"> = {
  title: "New Quiz",
  description: "",
  quizType: "GRADED_QUIZ",
  points: 0,
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

const initialState: { quizzes: Quiz[] } = {
  quizzes: [],
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
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes, togglePublishQuiz } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
