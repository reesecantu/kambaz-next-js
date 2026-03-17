"use client";
import {
  Form,
  Row,
  Col,
  FormControl,
  FormSelect,
  FormCheck,
  Button,
  FormLabel,
} from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "../../../assignments/reducer";
import { RootState } from "../../../../store";

export default function AssignmentEditor() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const cid = Array.isArray(params.cid) ? params.cid[0] : (params.cid ?? "");
  const aid = Array.isArray(params.aid) ? params.aid[0] : (params.aid ?? "");
  const isNewAssignment = aid === "new";

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );

  const assignment = assignments.find((a) => a._id === aid && a.course === cid);

  const [formData, setFormData] = useState(() => {
    if (!isNewAssignment && assignment) {
      return {
        _id: assignment._id,
        title: assignment.title,
        description: assignment.description,
        course: assignment.course,
        points: assignment.points,
        dueDate: assignment.dueDate,
        availableDate: assignment.availableDate,
        availableUntilDate: assignment.availableUntilDate,
      };
    }
    return {
      title: "",
      description: "",
      course: cid,
      points: 100,
      dueDate: "",
      availableDate: "",
      availableUntilDate: "",
    };
  });

  const saveAssignment = () => {
    if (isNewAssignment) {
      dispatch(addAssignment(formData));
    } else {
      dispatch(updateAssignment(formData));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const cancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <Form>
        <FormLabel>Assignment Name</FormLabel>
        <FormControl
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <br />
        <FormControl
          as="textarea"
          rows={6}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Points
          </FormLabel>
          <Col sm={9}>
            <FormControl
              type="number"
              value={formData.points}
              onChange={(e) =>
                setFormData({ ...formData, points: Number(e.target.value) })
              }
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Assignment Group
          </FormLabel>
          <Col sm={9}>
            <FormSelect defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="NOT-ASSIGNMENTS">NOT ASSIGNMENTS</option>
              <option value="MAYBE-ASSIGNMENTS">MAYBE ASSIGNMENTS</option>
            </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Display Grade as
          </FormLabel>
          <Col sm={9}>
            <FormSelect defaultValue="PERCENT">
              <option value="PERCENT">Percentage</option>
              <option value="POINTS-TOTAL">Points Total</option>
              <option value="HIDE-GRADE">Hide Grades</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Submission Type
          </FormLabel>
          <Col sm={9}>
            <div className="border rounded p-3">
              <FormSelect defaultValue="ONLINE" className="mb-3">
                <option value="ONLINE">Online</option>
                <option value="IN-CLASS">In Class</option>
                <option value="BY-MAIL">By Mail</option>
              </FormSelect>
              <FormLabel className="fw-bold">Online Entry Options</FormLabel>
              <FormCheck
                type="checkbox"
                id="wd-chkbox-text-entry"
                label="Text Entry"
                name="online-entry-option"
              />
              <FormCheck
                type="checkbox"
                id="wd-chkbox-website-url"
                label="Website URL"
                name="online-entry-option"
              />
              <FormCheck
                type="checkbox"
                id="wd-chkbox-media-recordings"
                label="Media Recordings"
                name="online-entry-option"
              />
              <FormCheck
                type="checkbox"
                id="wd-chkbox-student-annotation"
                label="Student Annotation"
                name="online-entry-option"
              />
              <FormCheck
                type="checkbox"
                id="wd-chkbox-file-upload"
                label="File Upload"
                name="online-entry-option"
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Assign
          </FormLabel>
          <Col sm={9}>
            <div className="border rounded p-3">
              <FormLabel className="fw-bold">Assign to</FormLabel>
              <FormControl defaultValue="Everyone" />
              <FormLabel className="fw-bold">Due</FormLabel>
              <FormControl
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
              <Row className="mb-3">
                <Col>
                  <FormLabel className="fw-bold">Available from</FormLabel>
                  <FormControl
                    type="datetime-local"
                    value={formData.availableDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availableDate: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col>
                  <FormLabel className="fw-bold">Until</FormLabel>
                  <FormControl
                    type="datetime-local"
                    value={formData.availableUntilDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availableUntilDate: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Buttons */}
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            variant="secondary"
            className="me-2"
            id="wd-cancel"
            onClick={cancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="danger"
            id="wd-save"
            onClick={saveAssignment}
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
