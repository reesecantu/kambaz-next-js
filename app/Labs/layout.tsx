import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex">
      <TOC />
      <div className="flex-fill">{children}</div>
    </div>
  );
}
