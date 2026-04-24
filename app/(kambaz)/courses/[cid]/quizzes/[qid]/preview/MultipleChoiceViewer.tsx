import { MultipleChoiceQuestion } from "../../reducer";

export default function MultipleChoiceViewer({
  question,
  answer,
  onAnswer,
}: {
  question: MultipleChoiceQuestion;
  answer: number | undefined;
  onAnswer: (index: number) => void;
}) {
  return (
    <div>
      <div
        className="mb-3"
        dangerouslySetInnerHTML={{ __html: question.questionText }}
      />
      {question.choices.map((choice, i) => (
        <div key={i} className="d-flex align-items-center gap-2 mb-2">
          <input
            type="radio"
            name={`mc-${question._id}`}
            checked={answer === i}
            onChange={() => onAnswer(i)}
          />
          <span>{choice.text}</span>
        </div>
      ))}
    </div>
  );
}
