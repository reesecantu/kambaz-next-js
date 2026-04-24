import {
  QuizQuestion,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  FillInTheBlankQuestion,
} from "./reducer";

export function scoreQuestion(
  question: QuizQuestion,
  answers: Record<string, number | boolean | string>
): { correct: boolean; earnedPoints: number } {
  const answer = answers[question._id];
  let correct = false;

  if (question.type === "MULTIPLE_CHOICE") {
    // answer is the index into the choices array; correct if that choice has isCorrect set
    const idx = answer as number | undefined;
    correct =
      idx !== undefined &&
      !!(question as MultipleChoiceQuestion).choices[idx]?.isCorrect;
  } else if (question.type === "TRUE_FALSE") {
    // answer is a boolean; strict equality handles true vs false
    correct = answer === (question as TrueFalseQuestion).correctAnswer;
  } else if (question.type === "FILL_IN_THE_BLANK") {
    // any value in correctAnswers is acceptable; match is case-insensitive and ignores leading/trailing whitespace
    const text = (answer as string | undefined) ?? "";
    correct = (question as FillInTheBlankQuestion).correctAnswers.some(
      (a) => a.toLowerCase() === text.trim().toLowerCase()
    );
  }

  return { correct, earnedPoints: correct ? question.points : 0 };
}
