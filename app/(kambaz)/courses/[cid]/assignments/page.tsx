import Link from "next/link";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { MdOutlineAssignment } from "react-icons/md";
import GreenCheckmark from "./GreenCheckmark";

export default function Assignments() {
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
          <Button id="wd-add-assignment" variant="danger">
            <FaPlus className="me-1" /> Assignment
          </Button>
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
            <ListGroupItem className="p-3 ps-1 border-0 border-start border-success border-4 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdOutlineAssignment className="me-2 fs-3 text-success" />
              <div className="ms-2">
                <Link
                  href="/courses/1234/assignments/123"
                  className="text-decoration-none text-dark fw-bold"
                >
                  A1 - ENV + HTML
                </Link>
                <div className="mt-1">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <strong>Not available until</strong> May 6 at 12:00am
                  <br />
                  <strong>Due</strong> May 13 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-auto">
                <GreenCheckmark />
                <IoEllipsisVertical className="ms-1 fs-4" />
              </div>
            </ListGroupItem>

            <ListGroupItem className="p-3 ps-1 border-0 border-start border-success border-4 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdOutlineAssignment className="me-2 fs-3 text-success" />
              <div className="ms-2">
                <Link
                  href="/courses/1234/assignments/124"
                  className="text-decoration-none text-dark fw-bold"
                >
                  A2 - CSS + BOOTSTRAP
                </Link>
                <div className="mt-1">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <strong>Not available until</strong> May 13 at 12:00am
                  <br />
                  <strong>Due</strong> May 20 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-auto">
                <GreenCheckmark />
                <IoEllipsisVertical className="ms-1 fs-4" />
              </div>
            </ListGroupItem>

            <ListGroupItem className="p-3 ps-1 border-0 border-start border-success border-4 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <MdOutlineAssignment className="me-2 fs-3 text-success" />
              <div className="ms-2">
                <Link
                  href="/courses/1234/assignments/125"
                  className="text-decoration-none text-dark fw-bold"
                >
                  A3 - JAVASCRIPT + REACT
                </Link>
                <div className="mt-1">
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <strong>Not available until</strong> May 20 at 12:00am
                  <br />
                  <strong>Due</strong> May 27 at 11:59pm | 100 pts
                </div>
              </div>
              <div className="ms-auto">
                <GreenCheckmark />
                <IoEllipsisVertical className="ms-1 fs-4" />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
