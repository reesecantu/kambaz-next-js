"use client";
import { RootState } from "@/app/(kambaz)/store";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { QuizQuestion, setPendingAttempt } from "../../reducer";
import MultipleChoiceViewer from "./MultipleChoiceViewer";
import TrueFalseViewer from "./TrueFalseViewer";
import FillInTheBlankViewer from "./FillInTheBlankViewer";

type Answers = Record<string, number | boolean | string>;

function isAnswered(question: QuizQuestion, answers: Answers): boolean {
  const a = answers[question._id];
  if (question.type === "FILL_IN_THE_BLANK")
    return typeof a === "string" && a.trim() !== "";
  return a !== undefined;
}

export default function QuizPreview() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { cid, qid } = params;
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser,
  );
  const isFaculty = currentUser?.role === "FACULTY";
  const quiz = quizzes.find((q) => q._id === qid);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  if (!quiz) return <div>Quiz not found</div>;

  const questions = quiz.questions;
  const question = questions[currentIndex];
  const total = questions.length;
  const allAnswered = questions.every((q) => isAnswered(q, answers));

  const setAnswer = (id: string, value: number | boolean | string) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = () => {
    dispatch(setPendingAttempt({ quizId: quiz._id, answers }));
    router.push(`/courses/${cid}/quizzes/${qid}/results`);
  };

  return (
    <div>
      <h2>{quiz.title}</h2>
      {quiz.description && <p className="text-muted">{quiz.description}</p>}
      <hr />
      {isFaculty && (
        <div>
          <div className="alert alert-danger py-2">
            This is a Faculty preview of the quiz
          </div>
          <hr />
        </div>
      )}
      <div className="d-flex gap-4">
        <div className="flex-fill">
          <div>
            <div className="d-flex justify-content-between align-items-start p-2 border bg-secondary">
              <strong>Question {currentIndex + 1}: {question.title}</strong>
              <span className="">{question.points} points</span>
            </div>
            <div className="border p-3 mb-4">
              {question.type === "MULTIPLE_CHOICE" && (
                <MultipleChoiceViewer
                  question={question}
                  answer={answers[question._id] as number | undefined}
                  onAnswer={(i) => setAnswer(question._id, i)}
                />
              )}
              {question.type === "TRUE_FALSE" && (
                <TrueFalseViewer
                  question={question}
                  answer={answers[question._id] as boolean | undefined}
                  onAnswer={(v) => setAnswer(question._id, v)}
                />
              )}
              {question.type === "FILL_IN_THE_BLANK" && (
                <FillInTheBlankViewer
                  question={question}
                  answer={answers[question._id] as string | undefined}
                  onAnswer={(v) => setAnswer(question._id, v)}
                />
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <Button
              variant="secondary"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
            >
              Previous
            </Button>
            {currentIndex < total - 1 ? (
              <Button
                variant="primary"
                onClick={() => setCurrentIndex((i) => i + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="success"
                disabled={!allAnswered}
                onClick={handleSubmit}
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </div>
        <div style={{ width: "200px", flexShrink: 0 }}>
          <div
            className="border rounded p-2"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <div className="fw-bold mb-2 small">Questions</div>
            {questions.map((q, i) => (
              <div
                key={q._id}
                className={`p-1 small text-danger ${i === currentIndex ? "fw-bold" : ""}`}
                onClick={() => setCurrentIndex(i)}
                style={{ cursor: "pointer" }}
              >
                <span style={{ display: "inline-block", width: "1rem" }}>
                  {isAnswered(q, answers) ? "✔" : ""}
                </span>
                Question {i + 1}.{/* TODO: Test the overflow handling */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
