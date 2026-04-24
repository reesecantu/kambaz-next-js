import { TrueFalseQuestion } from "../../reducer";

export default function TrueFalseResultCard({
  question,
  answer,
}: {
  question: TrueFalseQuestion;
  answer: boolean | undefined;
}) {
  return (
    <>
      <div className="mb-2" dangerouslySetInnerHTML={{ __html: question.questionText }} />
      {([true, false] as const).map((v) => {
        const selected = answer === v;
        const correct = question.correctAnswer === v;
        const highlight =
          selected && correct ? "bg-success bg-opacity-25"
          : selected && !correct ? "bg-danger bg-opacity-25"
          : !selected && correct ? "bg-success bg-opacity-10"
          : "";
        return (
          <div key={String(v)} className={`d-flex align-items-center gap-2 mb-1 p-1 rounded ${highlight}`}>
            <input type="radio" checked={selected} readOnly onChange={() => {}} />
            <span>{v ? "True" : "False"}</span>
            {correct && <span className="ms-auto text-success small fw-semibold">✓ correct</span>}
          </div>
        );
      })}
    </>
  );
}
