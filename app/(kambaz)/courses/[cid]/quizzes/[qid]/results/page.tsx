"use client";
import { RootState } from "@/app/(kambaz)/store";
import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { scoreQuestion } from "../../scoreQuestion";
import MultipleChoiceResultCard from "./MultipleChoiceResultCard";
import TrueFalseResultCard from "./TrueFalseResultCard";
import FillInBlankResultCard from "./FillInBlankResultCard";

export default function QuizResults() {
  const params = useParams();
  const router = useRouter();
  const { cid, qid } = params;

  const { quizzes, pendingAttempt } = useSelector(
    (state: RootState) => state.quizzesReducer,
  );
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser,
  );
  const isFaculty = currentUser?.role === "FACULTY";

  const quiz = quizzes.find((q) => q._id === qid);

  if (!quiz) return <div>Quiz not found</div>;
  if (!pendingAttempt || pendingAttempt.quizId !== qid)
    return (
      <div>
        No attempt found.{" "}
        <a href={`/courses/${cid}/quizzes/${qid}/preview`}>Take the quiz</a>
      </div>
    );

  const { answers } = pendingAttempt;
  const questions = quiz.questions;

  const scored = questions.map((q) => ({
    question: q,
    ...scoreQuestion(q, answers),
  }));
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const earnedPoints = scored.reduce((sum, s) => sum + s.earnedPoints, 0);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">{quiz.title} — Results</h2>
        <span className="fs-5 fw-semibold">
          {earnedPoints} / {totalPoints}
        </span>
      </div>
      {quiz.description && <p className="text-muted">{quiz.description}</p>}
      <hr />

      {scored.map(({ question, correct, earnedPoints: pts }, i) => (
        <div
          key={question._id}
          className="border mb-3 "
          style={{
            borderColor: correct ? "#198754" : "#dc3545",
            borderWidth: 2,
          }}
        >
          <div className="d-flex justify-content-between align-items-start p-2 border mb-2 bg-secondary">
            <strong>
              Question {i + 1}: {question.title}
            </strong>
            <span
              className={`small fw-semibold ${correct ? "text-success" : "text-danger"}`}
            >
              {pts} / {question.points} pts
            </span>
          </div>

          <div className="p-2">
            {question.type === "MULTIPLE_CHOICE" && (
              <MultipleChoiceResultCard
                question={question}
                answer={answers[question._id] as number | undefined}
              />
            )}
            {question.type === "TRUE_FALSE" && (
              <TrueFalseResultCard
                question={question}
                answer={answers[question._id] as boolean | undefined}
              />
            )}
            {question.type === "FILL_IN_THE_BLANK" && (
              <FillInBlankResultCard
                question={question}
                answer={answers[question._id] as string | undefined}
                correct={correct}
              />
            )}
          </div>
        </div>
      ))}

      {isFaculty && (
        <div className="mt-3">
          <Button
            variant="warning"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
          >
            Keep Editing
          </Button>
        </div>
      )}
    </div>
  );
}
