"use client";
import Link from "next/link";
import { ListGroup, ListGroupItem, Button, FormControl, Dropdown } from "react-bootstrap";
import { BsGripVertical, BsFileText, BsCheckCircleFill, BsXCircle } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { RootState } from "../../../store";
import { addQuiz, defaultQuiz, deleteQuiz, setQuizzes, togglePublishQuiz, Quiz } from "./reducer";
import { quizzes as quizzesData } from "../../../database";
import { v4 as uuidv4 } from "uuid";

function getAvailability(quiz: Quiz): string {
  const now = new Date();
  const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
  const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
  if (until && now > until) return "Closed";
  if (available && now < available)
    return `Not available until ${available.toLocaleDateString()}`;
  return "Available";
}

export default function Quizzes() {
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : (params.cid ?? "");

  const { currentUser } = useSelector(
    (state: RootState) =>
      state.accountReducer as { currentUser: { role?: string } | null },
  );
  const canEdit = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();
  const router = useRouter();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const courseQuizzes = quizzes
    .filter((q) => q.course === cid && (canEdit || q.published))
    .sort((a, b) => {
      if (!a.availableDate) return 1;
      if (!b.availableDate) return -1;
      return new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime();
    });

  useEffect(() => {
    dispatch(setQuizzes(quizzesData as Quiz[]));
  }, [dispatch]);

  const handleDelete = (quizId: string) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      dispatch(deleteQuiz(quizId));
    }
  };

  const handleAddQuiz = () => {
    const newQuiz: Quiz = {
      ...defaultQuiz,
      _id: uuidv4(),
      course: cid,
    };
    dispatch(addQuiz(newQuiz));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/edit`);
  };

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="position-relative" style={{ width: "300px" }}>
          <FaSearch className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
          <FormControl
            placeholder="Search for Quizzes"
            id="wd-search-quiz"
            className="ps-5"
          />
        </div>
        {canEdit && (
          <Button id="wd-add-quiz" variant="danger" onClick={handleAddQuiz}>
            <FaPlus className="me-1" /> Quiz
          </Button>
        )}
      </div>

      <ListGroup className="rounded-0">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              Assignment Quizzes
            </div>
            <IoEllipsisVertical className="fs-4" />
          </div>

          <ListGroup className="rounded-0">
            {courseQuizzes.length === 0 && (
              <ListGroupItem className="text-center text-muted py-4">
                No quizzes yet.{" "}
                {canEdit && (
                  <p>
                    Click <strong>+ Quiz</strong> to add one.
                  </p>
                )}
              </ListGroupItem>
            )}
            {courseQuizzes.map((quiz) => {
              const availability = getAvailability(quiz);
              return (
                <ListGroupItem
                  key={quiz._id}
                  className="p-3 ps-1 border-start border-success border-4 d-flex align-items-center"
                >
                  <BsGripVertical className="me-2 fs-3" />
                  <BsFileText className="me-2 fs-3 text-success" />
                  <div className="ms-2 flex-grow-1">
                    <Link
                      href={`/courses/${cid}/quizzes/${quiz._id}`}
                      className="text-decoration-none text-dark fw-bold"
                    >
                      {quiz.title}
                    </Link>
                    <div className="mt-1 small text-muted">
                      <strong>{availability}</strong>
                      {quiz.dueDate && (
                        <> | <strong>Due</strong>{" "}
                          {new Date(quiz.dueDate).toLocaleDateString()}
                        </>
                      )}
                      {` | ${quiz.points} pts | ${quiz.questions.length} Questions`}
                    </div>
                  </div>
                  <div className="ms-auto d-flex align-items-center gap-2">
                    {quiz.published ? (
                      <BsCheckCircleFill
                        className="text-success fs-5"
                        title="Published"
                        style={{ cursor: canEdit ? "pointer" : "default" }}
                        onClick={() => canEdit && dispatch(togglePublishQuiz(quiz._id))}
                      />
                    ) : (
                      <BsXCircle
                        className="text-secondary fs-5"
                        title="Unpublished"
                        style={{ cursor: canEdit ? "pointer" : "default" }}
                        onClick={() => canEdit && dispatch(togglePublishQuiz(quiz._id))}
                      />
                    )}
                    {canEdit && (
                      <Dropdown align="end">
                        <Dropdown.Toggle
                          variant="link"
                          className="p-0 text-dark border-0 shadow-none"
                          id={`quiz-menu-${quiz._id}`}
                        >
                          <IoEllipsisVertical className="fs-4" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => router.push(`/courses/${cid}/quizzes/${quiz._id}/edit`)}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => dispatch(togglePublishQuiz(quiz._id))}>
                            {quiz.published ? "Unpublish" : "Publish"}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
