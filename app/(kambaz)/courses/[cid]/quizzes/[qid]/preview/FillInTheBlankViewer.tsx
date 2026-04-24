import { FormControl } from "react-bootstrap";
import { FillInTheBlankQuestion } from "../../reducer";

export default function FillInTheBlankViewer({
  question,
  answer,
  onAnswer,
}: {
  question: FillInTheBlankQuestion;
  answer: string | undefined;
  onAnswer: (value: string) => void;
}) {
  return (
    <div>
      <div
        className="mb-3"
        dangerouslySetInnerHTML={{ __html: question.questionText }}
      />
      <FormControl
        type="text"
        placeholder="Your answer"
        value={answer ?? ""}
        onChange={(e) => onAnswer(e.target.value)}
      />
    </div>
  );
}
