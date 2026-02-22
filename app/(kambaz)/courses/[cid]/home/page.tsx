import { Row, Col } from "react-bootstrap";
import Modules from "../modules/page";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home">
      <Row>
        <Col>
          <Modules />
        </Col>
        <Col xl={4} className="d-none d-xl-block">
          <CourseStatus />
        </Col>
      </Row>
    </div>
  );
}
