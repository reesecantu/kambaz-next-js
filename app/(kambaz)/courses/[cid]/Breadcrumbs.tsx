"use client";
import React from "react";
import { usePathname } from "next/navigation";
export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").pop() || "";
  let capitalizedSegment =
    lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  if (capitalizedSegment === "Table") {
    capitalizedSegment = "People";
  }
  return (
    <span>
      Course {course?.name} &gt; {capitalizedSegment}
    </span>
  );
}
