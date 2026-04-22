import { RootState } from "@/app/(kambaz)/store";
import { useParams } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function QuizPreview() {
  const params = useParams();
  const { qid } = params;
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const quiz = quizzes.find((q) => q._id === qid);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div id="wd-quiz-preview">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>
      <Nav variant="tabs" className="mb-3">
        <NavItem>
          <NavLink href="#details">Details</NavLink>
          <NavLink href="#questions">Questions</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}
