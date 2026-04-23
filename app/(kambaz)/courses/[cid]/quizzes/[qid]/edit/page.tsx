"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Nav,
  NavItem,
  NavLink,
  Row,
} from "react-bootstrap";
import { BsCheckCircleFill, BsXCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Quiz, QuizQuestion, updateQuiz } from "../../reducer";
import quizzesData from "@/app/(kambaz)/database/quizzes.json";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";

export default function QuizEditor() {
  const params = useParams();
  const { cid, qid } = params;
  const router = useRouter();
  const dispatch = useDispatch();
  //   const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const quizzes = quizzesData as Quiz[];
  const quiz = quizzes.find((q) => q._id === qid);

  const [activeTab, setActiveTab] = useState("details");
  const [draftQuiz, setDraftQuiz] = useState(quiz);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

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

  const save = () => {
    dispatch(updateQuiz(draftQuiz));
    router.push(`/courses/${cid}/quizzes`);
  };

  const saveAndPublish = () => {
    dispatch(updateQuiz({ ...draftQuiz, published: true }));
    router.push(`/courses/${cid}/quizzes`);
  }

  const deleteQuestion = (id: string) =>
    setDraftQuiz({ ...draftQuiz, questions: draftQuiz.questions.filter((q) => q._id !== id) });

  const createQuestion = () => {
    const newQuestion = {
      _id: uuidv4(),
      type: "MULTIPLE_CHOICE" as const,
      title: "New Question",
      points: 10,
      questionText: "",
      choices: [],
    };
    setDraftQuiz({ ...draftQuiz, questions: [...draftQuiz.questions, newQuestion] });
  };

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center gap-1">
        <span> Points {draftQuiz.questions.reduce((acc, q) => acc + q.points, 0)}</span>
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
        <Form>
          <FormLabel>Title</FormLabel>
          <FormControl
            type="text"
            value={draftQuiz.title}
            onChange={(e) =>
              setDraftQuiz({ ...draftQuiz, title: e.target.value })
            }
          />
          <FormLabel>Description</FormLabel>
          <FormControl
            as="textarea"
            rows={3}
            value={draftQuiz.description}
            onChange={(e) =>
              setDraftQuiz({ ...draftQuiz, description: e.target.value })
            }
          />
          <br />
          <Row className="mb-3">
            <FormLabel column sm={3} className="text-end">
              Quiz Type
            </FormLabel>
            <Col sm={9}>
              <FormSelect
                value={draftQuiz.quizType}
                onChange={(e) =>
                  setDraftQuiz({
                    ...draftQuiz,
                    quizType: e.target.value as Quiz["quizType"],
                  })
                }
              >
                <option value="GRADED_QUIZ">Graded Quiz</option>
                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
              </FormSelect>
            </Col>
          </Row>
          <Row className="mb-3">
            <FormLabel column sm={3} className="text-end">
              Assignment Group
            </FormLabel>
            <Col sm={9}>
              <FormSelect
                value={draftQuiz.assignmentGroup}
                onChange={(e) =>
                  setDraftQuiz({
                    ...draftQuiz,
                    assignmentGroup: e.target.value as Quiz["assignmentGroup"],
                  })
                }
              >
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECTS">Projects</option>
              </FormSelect>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3} />
            <Col sm={9}>
              <FormCheck
                label="Shuffle Answers"
                checked={draftQuiz.shuffleAnswers}
                onChange={(e) =>
                  setDraftQuiz({
                    ...draftQuiz,
                    shuffleAnswers: e.target.checked,
                  })
                }
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3} />
            <Col sm={9}>
              <div className="d-flex align-items-center gap-2">
                <FormCheck
                  label="Time Limit"
                  checked={draftQuiz.hasTimeLimit}
                  onChange={(e) =>
                    setDraftQuiz({
                      ...draftQuiz,
                      hasTimeLimit: e.target.checked,
                      timeLimit: e.target.checked ? 20 : 0,
                    })
                  }
                />
                <FormControl
                  type="number"
                  value={draftQuiz.hasTimeLimit ? draftQuiz.timeLimit : ""}
                  disabled={!draftQuiz.hasTimeLimit}
                  style={{ width: "80px" }}
                  onChange={(e) =>
                    setDraftQuiz({
                      ...draftQuiz,
                      timeLimit: parseInt(e.target.value) || 0,
                    })
                  }
                />
                <span>Minutes</span>
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3} />
            <Col sm={9}>
              <FormCheck
                label="Allow Multiple Attempts"
                checked={draftQuiz.multipleAttempts}
                onChange={(e) =>
                  setDraftQuiz({
                    ...draftQuiz,
                    multipleAttempts: e.target.checked,
                    howManyAttempts: e.target.checked ? 3 : 1,
                  })
                }
              />
              {draftQuiz.multipleAttempts && (
                <div className="d-flex align-items-center gap-2 mt-2">
                  <span>Allow</span>
                  <FormControl
                    type="number"
                    value={draftQuiz.howManyAttempts}
                    style={{ width: "80px" }}
                    onChange={(e) =>
                      setDraftQuiz({
                        ...draftQuiz,
                        howManyAttempts: parseInt(e.target.value),
                      })
                    }
                  />
                  <span>Attempts</span>
                </div>
              )}
            </Col>
          </Row>
          <Row className="mb-3">
            <FormLabel column sm={3} className="text-end">
              Show Correct Answers
            </FormLabel>
            <Col sm={9}>
              <FormSelect
                value={draftQuiz.showCorrectAnswers}
                onChange={(e) =>
                  setDraftQuiz({
                    ...draftQuiz,
                    showCorrectAnswers: e.target.value,
                  })
                }
              >
                <option value="immediately">Immediately</option>
                <option value="after_due_date">After Due Date</option>
                <option value="after_last_attempt">After Last Attempt</option>
                <option value="never">Never</option>
              </FormSelect>
            </Col>
          </Row>
          <Row className="mb-3">
            <FormLabel column sm={3} className="text-end">
              Access Code
            </FormLabel>
            <Col sm={9}>
              <FormControl
                type="text"
                value={draftQuiz.accessCode ?? ""}
                onChange={(e) =>
                  setDraftQuiz({ ...draftQuiz, accessCode: e.target.value })
                }
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3} />
            <Col sm={9}>
              <FormCheck
                label="One Question at a Time"
                checked={draftQuiz.oneQuestionAtATime}
                onChange={(e) =>
                  setDraftQuiz({
                    ...draftQuiz,
                    oneQuestionAtATime: e.target.checked,
                  })
                }
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3} />
            <Col sm={9}>
              <FormCheck
                label="Webcam Required"
                checked={draftQuiz.webcamRequired}
                onChange={(e) =>
                  setDraftQuiz({
                    ...draftQuiz,
                    webcamRequired: e.target.checked,
                  })
                }
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col sm={3} />
            <Col sm={9}>
              <FormCheck
                label="Lock Questions After Answering"
                checked={draftQuiz.lockQuestionsAfterAnswering}
                onChange={(e) =>
                  setDraftQuiz({
                    ...draftQuiz,
                    lockQuestionsAfterAnswering: e.target.checked,
                  })
                }
              />
            </Col>
          </Row>
          <hr />
          <Row className="mb-3">
            <FormLabel column sm={3} className="text-end">
              Due Date
            </FormLabel>
            <Col sm={9}>
              <FormControl
                type="datetime-local"
                value={draftQuiz.dueDate}
                onChange={(e) =>
                  setDraftQuiz({ ...draftQuiz, dueDate: e.target.value })
                }
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <FormLabel column sm={3} className="text-end">
              Available Date
            </FormLabel>
            <Col sm={9}>
              <FormControl
                type="datetime-local"
                value={draftQuiz.availableDate}
                onChange={(e) =>
                  setDraftQuiz({ ...draftQuiz, availableDate: e.target.value })
                }
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <FormLabel column sm={3} className="text-end">
              Until Date
            </FormLabel>
            <Col sm={9}>
              <FormControl
                type="datetime-local"
                value={draftQuiz.untilDate}
                onChange={(e) =>
                  setDraftQuiz({ ...draftQuiz, untilDate: e.target.value })
                }
              />
            </Col>
          </Row>
        </Form>
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
            const handleTypeChange = (newType: QuizQuestion["type"], draftBase?: { title: string; points: number; questionText: string }) => {
              if (newType === question.type) return;
              const base = { _id: question._id, ...(draftBase ?? { title: question.title, points: question.points, questionText: question.questionText }) };
              const newQuestion: QuizQuestion =
                newType === "MULTIPLE_CHOICE" ? { ...base, type: "MULTIPLE_CHOICE", choices: [] } :
                newType === "TRUE_FALSE"      ? { ...base, type: "TRUE_FALSE", correctAnswer: true } :
                                               { ...base, type: "FILL_IN_THE_BLANK", correctAnswers: [] };
              const questions = [...draftQuiz.questions];
              questions[i] = newQuestion;
              setDraftQuiz({ ...draftQuiz, questions });
            };

            const readOnly = editingQuestionId !== question._id;
            const sharedProps = { onUpdate: updateQuestion, onCancel: cancelEdit, onEdit: startEdit, onDelete: handleDelete, onTypeChange: handleTypeChange, readOnly };

            switch (question.type) {
              case "MULTIPLE_CHOICE":
                return <div key={question._id} className="border rounded mb-2"><MultipleChoiceEditor question={question} {...sharedProps} /></div>;
              case "TRUE_FALSE":
                return <div key={question._id} className="border rounded mb-2"><TrueFalseEditor question={question} {...sharedProps} /></div>;
              case "FILL_IN_THE_BLANK":
                return <div key={question._id} className="border rounded mb-2"><FillInTheBlankEditor question={question} {...sharedProps} /></div>;
            }
          })}
          <Button variant="outline-secondary" className="mt-2" onClick={createQuestion}>
            + New Question
          </Button>
        </div>
      )}
      <div className="d-flex justify-content-end mt-4">
        <Button variant="secondary" className="me-2" onClick={cancel}>
          Cancel
        </Button>
        <Button variant="primary" className="me-2"  onClick={save}>
          Save
        </Button>
        <Button variant="success" onClick={saveAndPublish}>
          Save & Publish
        </Button>
      </div>
    </div>
  );
}
