"use client";
import Link from "next/link";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaSearch, FaTrash } from "react-icons/fa";
import { MdOutlineAssignment } from "react-icons/md";
import GreenCheckmark from "./GreenCheckmark";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment } from "../../assignments/reducer";

export default function Assignments() {
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : (params.cid ?? "");
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="position-relative" style={{ width: "300px" }}>
          <FaSearch className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
          <FormControl
            placeholder="Search for Assignments"
            id="wd-search-assignment"
            className="ps-5"
          />
        </div>
        <div>
          <Button
            id="wd-add-assignment-group"
            variant="secondary"
            className="me-2"
          >
            <FaPlus className="me-1" /> Group
          </Button>
          <Link
            id="wd-add-assignment"
            href={`/courses/${cid}/assignments/new`}
            className="btn btn-danger"
          >
            <FaPlus className="me-1" /> Assignment
          </Link>
        </div>
      </div>

      <ListGroup id="wd-assignments" className="rounded-0">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS
            </div>
            <div>
              <span className="badge rounded-pill bg-secondary border border-dark me-2 text-dark">
                40% of Total
              </span>
              <FaPlus className="me-2" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup id="wd-assignments-list" className="rounded-0">
            {assignments
              .filter((assignment) => assignment.course === cid)
              .map((assignment) => (
                <ListGroupItem
                  key={assignment._id}
                  className="p-3 ps-1 border-start border-success border-4 d-flex align-items-center"
                >
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment className="me-2 fs-3 text-success" />
                  <div className="ms-2">
                    <Link
                      href={`/courses/${cid}/assignments/${assignment._id}`}
                      className="text-decoration-none text-dark fw-bold"
                    >
                      {assignment.title}
                    </Link>
                    <div className="mt-1">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <strong>Not available until</strong>{" "}
                      {assignment.availableUntilDate}
                      <br />
                      <strong>Due</strong> {assignment.dueDate} |{" "}
                      {assignment.points} pts
                    </div>
                  </div>
                  <div className="ms-auto">
                    <FaTrash
                      className="text-danger me-3"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to remove this assignment?",
                          )
                        ) {
                          dispatch(deleteAssignment(assignment._id));
                        }
                      }}
                    />
                    <GreenCheckmark />
                    <IoEllipsisVertical className="ms-1 fs-4" />
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
