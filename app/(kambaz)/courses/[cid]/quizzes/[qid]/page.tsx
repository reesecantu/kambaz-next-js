"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { RootState } from "../../../../store";
import { Quiz } from "../reducer";

const QUIZ_TYPE_LABELS: Record<Quiz["quizType"], string> = {
  GRADED_QUIZ: "Graded Quiz",
  PRACTICE_QUIZ: "Practice Quiz",
  GRADED_SURVEY: "Graded Survey",
  UNGRADED_SURVEY: "Ungraded Survey",
};

const ASSIGNMENT_GROUP_LABELS: Record<Quiz["assignmentGroup"], string> = {
  QUIZZES: "Quizzes",
  EXAMS: "Exams",
  ASSIGNMENTS: "Assignments",
  PROJECTS: "Projects",
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleString();
}

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const { currentUser } = useSelector(
    (state: RootState) =>
      state.accountReducer as { currentUser: { role?: string } | null },
  );
  const isFaculty = currentUser?.role === "FACULTY";
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const quiz = quizzes.find((q) => q._id === qid);

  if (!quiz) {
    return <div className="p-4">Quiz not found</div>;
  }

  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div id="wd-quiz-details" className="p-4">
      <div className="d-flex gap-2 mb-4">
        {isFaculty ? (
          <>
            <Link href={`/courses/${cid}/quizzes/${qid}/preview`} className="btn btn-secondary">
              Preview
            </Link>
            <Link href={`/courses/${cid}/quizzes/${qid}/edit`} className="btn btn-secondary">
              Edit
            </Link>
          </>
        ) : (
          <Link href={`/courses/${cid}/quizzes/${qid}/preview`} className="btn btn-danger">
            Start Quiz
          </Link>
        )}
      </div>

      <h2 className="mb-4">{quiz.title}</h2>

      {isFaculty && (
        <>
          <Row className="mb-2">
            <Col sm={3} className="text-end fw-bold">Quiz Type</Col>
            <Col>{QUIZ_TYPE_LABELS[quiz.quizType]}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={3} className="text-end fw-bold">Points</Col>
            <Col>{totalPoints}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={3} className="text-end fw-bold">Assignment Group</Col>
            <Col>{ASSIGNMENT_GROUP_LABELS[quiz.assignmentGroup]}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={3} className="text-end fw-bold">Shuffle Answers</Col>
            <Col>{quiz.shuffleAnswers ? "Yes" : "No"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={3} className="text-end fw-bold">Time Limit</Col>
            <Col>{quiz.hasTimeLimit ? `${quiz.timeLimit} Minutes` : "No Time Limit"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={3} className="text-end fw-bold">Multiple Attempts</Col>
            <Col>{quiz.multipleAttempts ? "Yes" : "No"}</Col>
          </Row>
          {quiz.multipleAttempts && (
            <Row className="mb-2">
              <Col sm={3} className="text-end fw-bold">How Many Attempts</Col>
              <Col>{quiz.howManyAttempts}</Col>
            </Row>
          )}
          <Row className="mb-2">
            <Col sm={3} className="text-end fw-bold">Show Correct Answers</Col>
            <Col>{quiz.showCorrectAnswers || "Never"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={3} className="text-end fw-bold">Access Code</Col>
            <Col>{quiz.accessCode || "None"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={3} className="text-end fw-bold">One Question at a Time</Col>
            <Col>{quiz.oneQuestionAtATime ? "Yes" : "No"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={3} className="text-end fw-bold">Webcam Required</Col>
            <Col>{quiz.webcamRequired ? "Yes" : "No"}</Col>
          </Row>
          <Row className="mb-2">
            <Col sm={3} className="text-end fw-bold">Lock Questions After Answering</Col>
            <Col>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</Col>
          </Row>

          <hr />

          <Row className="fw-bold mb-1">
            <Col sm={3} className="text-end">Due</Col>
            <Col sm={2}>For</Col>
            <Col sm={3}>Available from</Col>
            <Col sm={3}>Until</Col>
          </Row>
          <Row>
            <Col sm={3} className="text-end">{formatDate(quiz.dueDate)}</Col>
            <Col sm={2}>Everyone</Col>
            <Col sm={3}>{formatDate(quiz.availableDate)}</Col>
            <Col sm={3}>{formatDate(quiz.untilDate)}</Col>
          </Row>
        </>
      )}
    </div>
  );
}
