"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";

export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: "FACULTY" | "STUDENT" | "TA" | "ADMIN";
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer,
  );
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer as { currentUser: User | null },
  );
  const canEditCourses = currentUser?.role === "FACULTY";

  const enrolledCourses = courses.filter(
    (course) =>
      currentUser &&
      enrollments.some(
        (enrollment) =>
          enrollment.user === currentUser._id &&
          enrollment.course === course._id,
      ),
  );

  const coursesToDisplay = showAllCourses ? courses : enrolledCourses;

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <button
          className="btn btn-primary"
          id="wd-toggle-enrollments"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </button>
      </div>
      <hr />
      <h5>
        New Course
        {canEditCourses && (
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={() => dispatch(addNewCourse(course))}
          >
            {" "}
            Add{" "}
          </button>
        )}
        {canEditCourses && (
          <button
            className="btn btn-warning float-end me-2"
            onClick={() => dispatch(updateCourse(course))}
            id="wd-update-course-click"
          >
            Update{" "}
          </button>
        )}
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        readOnly={!canEditCourses}
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        value={course.description}
        readOnly={!canEditCourses}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({coursesToDisplay.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {coursesToDisplay.map((course: any) => {
            const isEnrolled = currentUser
              ? enrollments.some(
                  (enrollment: any) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === course._id,
                )
              : false;

            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={`/courses/${course._id}/home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(event) => {
                      if (!isEnrolled) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <CardImg
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}{" "}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}{" "}
                      </CardText>
                      <Button variant="primary"> Go </Button>
                      {showAllCourses && currentUser && isEnrolled && (
                        <button
                          className="btn btn-danger me-2 float-end"
                          id={`wd-unenroll-${course._id}`}
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(
                              unenroll({
                                userId: currentUser._id,
                                courseId: course._id,
                              }),
                            );
                          }}
                        >
                          Unenroll
                        </button>
                      )}
                      {showAllCourses && currentUser && !isEnrolled && (
                        <button
                          className="btn btn-success me-2 float-end"
                          id={`wd-enroll-${course._id}`}
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(
                              enroll({
                                userId: currentUser._id,
                                courseId: course._id,
                              }),
                            );
                          }}
                        >
                          Enroll
                        </button>
                      )}
                      {canEditCourses && (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                      )}
                      {canEditCourses && (
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
