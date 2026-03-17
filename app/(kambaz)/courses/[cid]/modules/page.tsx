"use client";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./modulesControls";
import ModuleControlsButtons from "./ModuleControlsButtons";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { addModule, deleteModule, editModule, updateModule } from "./reducer";

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
  editing?: boolean;
  lessons?: Lesson[];
};

export default function Modules() {
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : (params.cid ?? "");
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector(
    (state: RootState) => state.modulesReducer as { modules: Module[] },
  );
  const dispatch = useDispatch();

  return (
    <div className="wd-modules">
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
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
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value }),
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                <ModuleControlsButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
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
