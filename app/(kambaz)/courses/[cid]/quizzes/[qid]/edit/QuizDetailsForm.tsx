import {
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { Quiz } from "../../reducer";

export default function QuizDetailsForm({
  draftQuiz,
  setDraftQuiz,
}: {
  draftQuiz: Quiz;
  setDraftQuiz: (quiz: Quiz) => void;
}) {
  return (
    <Form>
      <FormLabel>Title</FormLabel>
      <FormControl
        type="text"
        value={draftQuiz.title}
        onChange={(e) => setDraftQuiz({ ...draftQuiz, title: e.target.value })}
      />
      <FormLabel>Description</FormLabel>
      <FormControl
        as="textarea"
        rows={3}
        value={draftQuiz.description}
        onChange={(e) =>
          setDraftQuiz({ ...draftQuiz, description: e.target.value })
        }
      />
      <br />
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Quiz Type
        </FormLabel>
        <Col sm={9}>
          <FormSelect
            value={draftQuiz.quizType}
            onChange={(e) =>
              setDraftQuiz({
                ...draftQuiz,
                quizType: e.target.value as Quiz["quizType"],
              })
            }
          >
            <option value="GRADED_QUIZ">Graded Quiz</option>
            <option value="PRACTICE_QUIZ">Practice Quiz</option>
            <option value="GRADED_SURVEY">Graded Survey</option>
            <option value="UNGRADED_SURVEY">Ungraded Survey</option>
          </FormSelect>
        </Col>
      </Row>
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Assignment Group
        </FormLabel>
        <Col sm={9}>
          <FormSelect
            value={draftQuiz.assignmentGroup}
            onChange={(e) =>
              setDraftQuiz({
                ...draftQuiz,
                assignmentGroup: e.target.value as Quiz["assignmentGroup"],
              })
            }
          >
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAMS">Exams</option>
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="PROJECTS">Projects</option>
          </FormSelect>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} />
        <Col sm={9}>
          <FormCheck
            label="Shuffle Answers"
            checked={draftQuiz.shuffleAnswers}
            onChange={(e) =>
              setDraftQuiz({ ...draftQuiz, shuffleAnswers: e.target.checked })
            }
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} />
        <Col sm={9}>
          <div className="d-flex align-items-center gap-2">
            <FormCheck
              label="Time Limit"
              checked={draftQuiz.hasTimeLimit}
              onChange={(e) =>
                setDraftQuiz({
                  ...draftQuiz,
                  hasTimeLimit: e.target.checked,
                  timeLimit: e.target.checked ? 20 : 0,
                })
              }
            />
            <FormControl
              type="number"
              value={draftQuiz.hasTimeLimit ? draftQuiz.timeLimit : ""}
              disabled={!draftQuiz.hasTimeLimit}
              style={{ width: "80px" }}
              onChange={(e) =>
                setDraftQuiz({
                  ...draftQuiz,
                  timeLimit: parseInt(e.target.value) || 0,
                })
              }
            />
            <span>Minutes</span>
          </div>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} />
        <Col sm={9}>
          <FormCheck
            label="Allow Multiple Attempts"
            checked={draftQuiz.multipleAttempts}
            onChange={(e) =>
              setDraftQuiz({
                ...draftQuiz,
                multipleAttempts: e.target.checked,
                howManyAttempts: e.target.checked ? 3 : 1,
              })
            }
          />
          {draftQuiz.multipleAttempts && (
            <div className="d-flex align-items-center gap-2 mt-2">
              <span>Allow</span>
              <FormControl
                type="number"
                value={draftQuiz.howManyAttempts}
                style={{ width: "80px" }}
                onChange={(e) =>
                  setDraftQuiz({
                    ...draftQuiz,
                    howManyAttempts: parseInt(e.target.value),
                  })
                }
              />
              <span>Attempts</span>
            </div>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Show Correct Answers
        </FormLabel>
        <Col sm={9}>
          <FormSelect
            value={draftQuiz.showCorrectAnswers}
            onChange={(e) =>
              setDraftQuiz({ ...draftQuiz, showCorrectAnswers: e.target.value })
            }
          >
            <option value="immediately">Immediately</option>
            <option value="after_due_date">After Due Date</option>
            <option value="after_last_attempt">After Last Attempt</option>
            <option value="never">Never</option>
          </FormSelect>
        </Col>
      </Row>
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Access Code
        </FormLabel>
        <Col sm={9}>
          <FormControl
            type="text"
            value={draftQuiz.accessCode ?? ""}
            onChange={(e) =>
              setDraftQuiz({ ...draftQuiz, accessCode: e.target.value })
            }
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} />
        <Col sm={9}>
          <FormCheck
            label="One Question at a Time"
            checked={draftQuiz.oneQuestionAtATime}
            onChange={(e) =>
              setDraftQuiz({
                ...draftQuiz,
                oneQuestionAtATime: e.target.checked,
              })
            }
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} />
        <Col sm={9}>
          <FormCheck
            label="Webcam Required"
            checked={draftQuiz.webcamRequired}
            onChange={(e) =>
              setDraftQuiz({ ...draftQuiz, webcamRequired: e.target.checked })
            }
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col sm={3} />
        <Col sm={9}>
          <FormCheck
            label="Lock Questions After Answering"
            checked={draftQuiz.lockQuestionsAfterAnswering}
            onChange={(e) =>
              setDraftQuiz({
                ...draftQuiz,
                lockQuestionsAfterAnswering: e.target.checked,
              })
            }
          />
        </Col>
      </Row>
      <hr />
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Due Date
        </FormLabel>
        <Col sm={9}>
          <FormControl
            type="datetime-local"
            value={draftQuiz.dueDate}
            onChange={(e) =>
              setDraftQuiz({ ...draftQuiz, dueDate: e.target.value })
            }
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Available Date
        </FormLabel>
        <Col sm={9}>
          <FormControl
            type="datetime-local"
            value={draftQuiz.availableDate}
            onChange={(e) =>
              setDraftQuiz({ ...draftQuiz, availableDate: e.target.value })
            }
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-end">
          Until Date
        </FormLabel>
        <Col sm={9}>
          <FormControl
            type="datetime-local"
            value={draftQuiz.untilDate}
            onChange={(e) =>
              setDraftQuiz({ ...draftQuiz, untilDate: e.target.value })
            }
          />
        </Col>
      </Row>
    </Form>
  );
}
