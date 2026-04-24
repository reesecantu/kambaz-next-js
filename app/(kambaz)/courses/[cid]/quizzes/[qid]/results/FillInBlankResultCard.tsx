import { FillInTheBlankQuestion } from "../../reducer";

export default function FillInBlankResultCard({
  question,
  answer,
  correct,
}: {
  question: FillInTheBlankQuestion;
  answer: string | undefined;
  correct: boolean;
}) {
  return (
    <>
      <div className="mb-2" dangerouslySetInnerHTML={{ __html: question.questionText }} />
      <div className={`border rounded p-2 ${correct ? "border-success text-success" : "border-danger text-danger"}`}>
        {answer?.trim() || <em className="text-muted">No answer provided</em>}
      </div>
      {!correct && (
        <div className="text-success small mt-1">
          Accepted: {question.correctAnswers.join(", ")}
        </div>
      )}
    </>
  );
}
