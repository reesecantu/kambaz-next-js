"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Nav, NavItem, NavLink } from "react-bootstrap";
import QuizDetailsForm from "./QuizDetailsForm";
import { BsCheckCircleFill, BsXCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { QuizQuestion, updateQuiz } from "../../reducer";
import * as client from "../../../../client";
import { RootState } from "@/app/(kambaz)/store";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";

export default function QuizEditor() {
  const params = useParams();
  const { cid, qid } = params;
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const quiz = quizzes.find((q) => q._id === qid);

  const [activeTab, setActiveTab] = useState("details");
  const [draftQuiz, setDraftQuiz] = useState(quiz);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (quiz) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDraftQuiz(quiz);
    }
  }, [quiz]);

  if (!quiz || !draftQuiz) {
    return <div>Quiz not found</div>;
  }

  const cancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  const save = async () => {
    await client.updateQuiz(draftQuiz);
    dispatch(updateQuiz(draftQuiz));
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  const saveAndPublish = async () => {
    const published = { ...draftQuiz, published: true };
    await client.updateQuiz(published);
    dispatch(updateQuiz(published));
    router.push(`/courses/${cid}/quizzes`);
  };

  const deleteQuestion = (id: string) =>
    setDraftQuiz({
      ...draftQuiz,
      questions: draftQuiz.questions.filter((q) => q._id !== id),
    });

  const createQuestion = () => {
    const newQuestion = {
      _id: uuidv4(),
      type: "MULTIPLE_CHOICE" as const,
      title: "New Question",
      points: 10,
      questionText: "",
      choices: [],
    };
    setDraftQuiz({
      ...draftQuiz,
      questions: [...draftQuiz.questions, newQuestion],
    });
    setEditingQuestionId(newQuestion._id);
  };

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center gap-1">
        <span>
          {" "}
          Points {draftQuiz.questions.reduce((acc, q) => acc + q.points, 0)}
        </span>
        {draftQuiz.published ? (
          <>
            <BsCheckCircleFill className="text-success fs-4" />
            <span>Published</span>
          </>
        ) : (
          <>
            <BsXCircle className="text-secondary fs-5" />
            <span>Unpublished</span>
          </>
        )}
      </div>
      <Nav variant="tabs" className="mb-3">
        <NavItem>
          <NavLink
            active={activeTab === "details"}
            href="#details"
            onClick={() => setActiveTab("details")}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={activeTab === "questions"}
            href="#questions"
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </NavLink>
        </NavItem>
      </Nav>
      {activeTab === "details" && (
        <QuizDetailsForm draftQuiz={draftQuiz} setDraftQuiz={setDraftQuiz} />
      )}
      {activeTab === "questions" && (
        <div>
          {draftQuiz.questions.map((question, i) => {
            const updateQuestion = (updated: QuizQuestion) => {
              const questions = [...draftQuiz.questions];
              questions[i] = updated;
              setDraftQuiz({ ...draftQuiz, questions });
              setEditingQuestionId(null);
            };
            const cancelEdit = () => setEditingQuestionId(null);
            const startEdit = () => setEditingQuestionId(question._id);
            const handleDelete = () => deleteQuestion(question._id);
            const handleTypeChange = (
              newType: QuizQuestion["type"],
              draftBase?: {
                title: string;
                points: number;
                questionText: string;
              },
            ) => {
              if (newType === question.type) return;
              const base = {
                _id: question._id,
                ...(draftBase ?? {
                  title: question.title,
                  points: question.points,
                  questionText: question.questionText,
                }),
              };
              const newQuestion: QuizQuestion =
                newType === "MULTIPLE_CHOICE"
                  ? { ...base, type: "MULTIPLE_CHOICE", choices: [] }
                  : newType === "TRUE_FALSE"
                    ? { ...base, type: "TRUE_FALSE", correctAnswer: true }
                    : {
                        ...base,
                        type: "FILL_IN_THE_BLANK",
                        correctAnswers: [],
                      };
              const questions = [...draftQuiz.questions];
              questions[i] = newQuestion;
              setDraftQuiz({ ...draftQuiz, questions });
            };

            const readOnly = editingQuestionId !== question._id;
            const sharedProps = {
              onUpdate: updateQuestion,
              onCancel: cancelEdit,
              onEdit: startEdit,
              onDelete: handleDelete,
              onTypeChange: handleTypeChange,
              readOnly,
            };

            switch (question.type) {
              case "MULTIPLE_CHOICE":
                return (
                  <div key={question._id} className="border rounded mb-2">
                    <MultipleChoiceEditor
                      question={question}
                      {...sharedProps}
                    />
                  </div>
                );
              case "TRUE_FALSE":
                return (
                  <div key={question._id} className="border rounded mb-2">
                    <TrueFalseEditor question={question} {...sharedProps} />
                  </div>
                );
              case "FILL_IN_THE_BLANK":
                return (
                  <div key={question._id} className="border rounded mb-2">
                    <FillInTheBlankEditor
                      question={question}
                      {...sharedProps}
                    />
                  </div>
                );
            }
          })}
          <Button
            variant="outline-secondary"
            className="mt-2"
            onClick={createQuestion}
          >
            + New Question
          </Button>
        </div>
      )}
      <div className="d-flex justify-content-end mt-4">
        <Button variant="secondary" className="me-2" onClick={cancel}>
          Cancel
        </Button>
        <Button variant="primary" className="me-2" onClick={save}>
          Save
        </Button>
        <Button variant="success" onClick={saveAndPublish}>
          Save & Publish
        </Button>
      </div>
    </div>
  );
}
