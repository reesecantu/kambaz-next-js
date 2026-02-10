import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="d-flex">
      <div>
        <TOC />
      </div>
      <div className="flex-fill">{children}</div>
    </div>
  );
}
