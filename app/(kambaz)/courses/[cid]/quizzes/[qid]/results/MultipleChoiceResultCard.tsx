import { MultipleChoiceQuestion } from "../../reducer";

export default function MultipleChoiceResultCard({
  question,
  answer,
}: {
  question: MultipleChoiceQuestion;
  answer: number | undefined;
}) {
  return (
    <>
      <div className="mb-2" dangerouslySetInnerHTML={{ __html: question.questionText }} />
      {question.choices.map((choice, i) => {
        const selected = answer === i;
        const correct = choice.isCorrect;
        const highlight =
          selected && correct ? "bg-success bg-opacity-25"
          : selected && !correct ? "bg-danger bg-opacity-25"
          : !selected && correct ? "bg-success bg-opacity-10"
          : "";
        return (
          <div key={i} className={`d-flex align-items-center gap-2 mb-1 p-1 rounded ${highlight}`}>
            <input type="radio" checked={selected} readOnly onChange={() => {}} />
            <span>{choice.text}</span>
            {correct && <span className="ms-auto text-success small fw-semibold">✓ correct</span>}
          </div>
        );
      })}
    </>
  );
}
