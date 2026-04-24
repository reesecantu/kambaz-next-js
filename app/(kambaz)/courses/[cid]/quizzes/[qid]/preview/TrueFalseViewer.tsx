import { FormCheck } from "react-bootstrap";
import { TrueFalseQuestion } from "../../reducer";

export default function TrueFalseViewer({
  question,
  answer,
  onAnswer,
}: {
  question: TrueFalseQuestion;
  answer: boolean | undefined;
  onAnswer: (value: boolean) => void;
}) {
  return (
    <div>
      <div
        className="mb-3"
        dangerouslySetInnerHTML={{ __html: question.questionText }}
      />
      <FormCheck
        type="radio"
        label="True"
        name={`tf-${question._id}`}
        checked={answer === true}
        onChange={() => onAnswer(true)}
      />
      <FormCheck
        type="radio"
        label="False"
        name={`tf-${question._id}`}
        checked={answer === false}
        onChange={() => onAnswer(false)}
      />
    </div>
  );
}
