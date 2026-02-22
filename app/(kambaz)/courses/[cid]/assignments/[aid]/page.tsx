import {
  Form,
  Row,
  Col,
  FormControl,
  FormSelect,
  FormCheck,
  Button,
  FormGroup,
  FormLabel,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <Form>
        <FormLabel>Assignment Name</FormLabel>
        <FormControl defaultValue="A1 - ENV + HTML" />
        <br />
        <FormControl
          as="textarea"
          rows={6}
          defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify."
        />
        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Points
          </FormLabel>
          <Col sm={9}>
            <FormControl type="number" defaultValue={100} />
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
                defaultValue="2024-05-13T23:59"
              />
              <Row className="mb-3">
                <Col>
                  <FormLabel className="fw-bold">Available from</FormLabel>
                  <FormControl
                    type="datetime-local"
                    defaultValue="2024-05-06T00:00"
                  />
                </Col>
                <Col>
                  <FormLabel className="fw-bold">Until</FormLabel>
                  <FormControl
                    type="datetime-local"
                    defaultValue="2024-05-20T00:00"
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Buttons */}
        <hr />
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" id="wd-cancel">
            Cancel
          </Button>
          <Button variant="danger" id="wd-save">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
