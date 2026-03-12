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
import { useParams } from "next/navigation";
import * as db from "../../../../database";
import Link from "next/link";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find(
    (assignment) => assignment._id === aid && assignment.course === cid,
  );
  return (
    <div id="wd-assignments-editor">
      <Form>
        <FormLabel>Assignment Name</FormLabel>
        <FormControl defaultValue={assignment?.title || ""} />
        <br />
        <FormControl
          as="textarea"
          rows={6}
          defaultValue={assignment?.description || ""}
        />
        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Points
          </FormLabel>
          <Col sm={9}>
            <FormControl
              type="number"
              defaultValue={assignment?.points || 100}
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
                defaultValue={assignment?.dueDate ? assignment.dueDate : ""}
              />
              <Row className="mb-3">
                <Col>
                  <FormLabel className="fw-bold">Available from</FormLabel>
                  <FormControl
                    type="datetime-local"
                    defaultValue={
                      assignment?.availableDate ? assignment.availableDate : ""
                    }
                  />
                </Col>
                <Col>
                  <FormLabel className="fw-bold">Until</FormLabel>
                  <FormControl
                    type="datetime-local"
                    defaultValue={
                      assignment?.availableUntilDate
                        ? assignment.availableUntilDate
                        : ""
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
            <Link href={`/courses/${cid}/assignments`} className="btn btn-secondary me-2" id="wd-cancel">
              Cancel
            </Link>
            <Link href={`/courses/${cid}/assignments`} className="btn btn-danger" id="wd-save">
              Save
            </Link>
        </div>
      </Form>
    </div>
  );
}
