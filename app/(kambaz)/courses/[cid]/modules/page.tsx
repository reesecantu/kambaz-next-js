"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./modulesControls";
import ModuleControlsButtons from "./ModuleControlsButtons";
import { useParams } from "next/navigation";
import * as db from "../../../database";

// type taken from modules.json
// I know the lesson uses module: any
// I'm just trying to get fancy with it
type Lesson = {
  _id: string;
  name: string;
  description: string;
};

type Module = {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
};

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const modules = db.modules as Module[];
  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((module) => module.course === cid)
          .map((module) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" /> {module.name}{" "}
                <ModuleControlsButtons />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1"
                    >
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
