"use client";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../../store";

export default function Quizzes() {
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : (params.cid ?? "");

  const { currentUser } = useSelector(
    (state: RootState) =>
      state.accountReducer as { currentUser: { role?: string } | null },
  );
  const canEdit = currentUser?.role === "FACULTY";

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const courseQuizzes = quizzes.filter((q) => q.course === cid);

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
          <Button id="wd-add-quiz" variant="danger">
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
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
