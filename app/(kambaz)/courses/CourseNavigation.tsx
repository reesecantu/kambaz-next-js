/* eslint-disable react/jsx-key */
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
export default function CourseNavigation({ cid }: { cid: string }) {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  const pathname = usePathname();

  const getLinkPath = (link: string) => {
    if (link === "People") {
      return `/courses/${cid}/people/table`;
    }
    return `/courses/${cid}/${link.toLowerCase()}`;
  };

  const isLinkActive = (link: string) => {
    if (link === "People") {
      return pathname.startsWith(`/courses/${cid}/people`);
    }
    return pathname.startsWith(`/courses/${cid}/${link.toLowerCase()}`);
  };

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const isActive = isLinkActive(link);
        return (
          <Link
            key={link}
            href={getLinkPath(link)}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}
          >
            {" "}
            {link}{" "}
          </Link>
        );
      })}
      {/* <Link
        href="/courses/1234/home"
        id="wd-course-home-link"
        className="list-group-item active border-0"
      >
        {" "}
        Home{" "}
      </Link>
      <Link
        href="/courses/1234/modules"
        id="wd-course-modules-link"
        className="list-group-item text-danger border-0"
      >
        {" "}
        Modules{" "}
      </Link>
      <Link
        href="/courses/1234/piazza"
        id="wd-course-piazza-link"
        className="list-group-item text-danger border-0"
      >
        {" "}
        Piazza{" "}
      </Link>
      <Link
        href="/courses/1234/zoom"
        id="wd-course-zoom-link"
        className="list-group-item text-danger border-0"
      >
        {" "}
        Zoom{" "}
      </Link>
      <Link
        href="/courses/1234/assignments"
        id="wd-course-assignments-link"
        className="list-group-item text-danger border-0"
      >
        {" "}
        Assignments{" "}
      </Link>
      <Link
        href="/courses/1234/quizzes"
        id="wd-course-quizzes-link"
        className="list-group-item text-danger border-0"
      >
        {" "}
        Quizzes{" "}
      </Link>
      <Link
        href="/courses/1234/people/table"
        id="wd-course-people-link"
        className="list-group-item text-danger border-0"
      >
        {" "}
        People{" "}
      </Link> */}
    </div>
  );
}
