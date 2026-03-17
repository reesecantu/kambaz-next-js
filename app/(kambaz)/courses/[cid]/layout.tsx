"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import CourseNavigation from "../CourseNavigation";
// import { courses } from "../../database";
import { FaAlignJustify } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
import { toggleCourseNavigation } from "../reducer";
export default function CoursesLayout({ children }: { children: ReactNode }) {
 const params = useParams();
 // funky typescript stuff
 const cid = Array.isArray(params.cid) ? params.cid[0] : (params.cid ?? "")
 const dispatch = useDispatch();
 const { courses, showCourseNavigation } = useSelector((state: RootState) => state.coursesReducer);
 const course = courses.find((course: any) => course._id === cid);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => dispatch(toggleCourseNavigation())}
          style={{ cursor: "pointer" }}
        />
        {course?.name}
      </h2>
      <div className="d-flex">
        {showCourseNavigation && (
          <div>
            <CourseNavigation cid={cid} />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
