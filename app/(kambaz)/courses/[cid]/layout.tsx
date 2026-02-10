import { ReactNode } from "react";
import CourseNavigation from "../../account/Navigation/page";

export default async function CoursesLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = await params;
  return (
    <div id="wd-courses">
      <h2>Courses {cid}</h2>
      <div className="d-flex">
        <div>
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
