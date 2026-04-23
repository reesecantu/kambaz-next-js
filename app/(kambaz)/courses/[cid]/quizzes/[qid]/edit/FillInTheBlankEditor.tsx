"use client";
import { useState } from "react";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { FillInTheBlankQuestion, QuizQuestion } from "../../reducer";
import { FaPencil, FaTrash } from "react-icons/fa6";
import WysiwygEditor from "./WysiwygEditor";

export default function FillInTheBlankEditor({
  question,
  onUpdate,
  onCancel,
  onDelete,
  onEdit,
  onTypeChange,
  readOnly = false,
}: {
  question: FillInTheBlankQuestion;
  onUpdate: (q: FillInTheBlankQuestion) => void;
  onCancel: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onTypeChange: (type: QuizQuestion["type"], base?: { title: string; points: number; questionText: string }) => void;
  readOnly?: boolean;
}) {
  const [draft, setDraft] = useState(question);

  const handleCancel = () => {
    setDraft(question);
    onCancel();
  };

  const setAnswer = (i: number, text: string) =>
    setDraft({ ...draft, correctAnswers: draft.correctAnswers.map((a, j) => (j === i ? text : a)) });

  const addAnswer = () =>
    setDraft({ ...draft, correctAnswers: [...draft.correctAnswers, ""] });

  const removeAnswer = (i: number) =>
    setDraft({ ...draft, correctAnswers: draft.correctAnswers.filter((_, j) => j !== i) });

  return (
    <div className="p-3">
      <div className="d-flex gap-2 align-items-center mb-2">
        <FormControl
          className="flex-fill"
          placeholder="Title"
          disabled={readOnly}
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
        <FormSelect
          style={{ width: "180px" }}
          disabled={readOnly}
          value="FILL_IN_THE_BLANK"
          onChange={(e) => onTypeChange(e.target.value as QuizQuestion["type"], { title: draft.title, points: draft.points, questionText: draft.questionText })}
        >
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="TRUE_FALSE">True / False</option>
          <option value="FILL_IN_THE_BLANK">Fill in the Blank</option>
        </FormSelect>
        <FormControl
          type="number"
          style={{ width: "80px" }}
          placeholder="pts"
          disabled={readOnly}
          value={draft.points}
          onChange={(e) => setDraft({ ...draft, points: parseInt(e.target.value) || 0 })}
        />
      </div>
      <strong>Question:</strong>
      <WysiwygEditor
        value={draft.questionText}
        onChange={(v) => setDraft({ ...draft, questionText: v })}
        readOnly={readOnly}
      />
      <strong>Answers:</strong>
      <br />
      {draft.correctAnswers.map((answer, i) => (
        <div key={i} className="d-flex gap-2 mb-2">
          <FormControl
            disabled={readOnly}
            value={answer}
            onChange={(e) => setAnswer(i, e.target.value)}
          />
          {!readOnly && (
            <Button variant="outline-danger" size="sm" onClick={() => removeAnswer(i)}>
              Remove
            </Button>
          )}
        </div>
      ))}
      {!readOnly && (
        <Button variant="outline-secondary" size="sm" className="mb-3" onClick={addAnswer}>
          + Add Answer
        </Button>
      )}
      <div className="d-flex justify-content-end gap-2 mt-2">
        {readOnly ? (
          <>
            <FaPencil style={{ cursor: "pointer" }} onClick={onEdit} />
            <FaTrash className="text-danger" style={{ cursor: "pointer" }} onClick={onDelete} />
          </>
        ) : (
          <>
            <Button variant="secondary" size="sm" onClick={handleCancel}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => onUpdate(draft)}>Update Question</Button>
          </>
        )}
      </div>
    </div>
  );
}
