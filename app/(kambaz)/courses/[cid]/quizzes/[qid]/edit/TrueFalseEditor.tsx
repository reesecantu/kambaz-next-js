"use client";
import { useState } from "react";
import { Button, FormCheck, FormControl, FormSelect } from "react-bootstrap";

import { TrueFalseQuestion, QuizQuestion } from "../../reducer";
import WysiwygEditor from "./WysiwygEditor";
import { FaPencil, FaTrash } from "react-icons/fa6";

export default function TrueFalseEditor({
  question,
  onUpdate,
  onCancel,
  onDelete,
  onEdit,
  onTypeChange,
  readOnly = false,
}: {
  question: TrueFalseQuestion;
  onUpdate: (q: TrueFalseQuestion) => void;
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
          value="TRUE_FALSE"
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
          onChange={(e) =>
            setDraft({ ...draft, points: parseInt(e.target.value) || 0 })
          }
        />
      </div>
      <strong>Question:</strong>
      <WysiwygEditor
        value={draft.questionText}
        onChange={(v) => setDraft({ ...draft, questionText: v })}
        readOnly={readOnly}
      />
      <strong>Answer:</strong>
      <br />
      <FormCheck
        type="radio"
        label="True"
        name={`tf-${draft._id}`}
        disabled={readOnly}
        checked={draft.correctAnswer === true}
        onChange={() => setDraft({ ...draft, correctAnswer: true })}
      />
      <br />
      <FormCheck
        type="radio"
        label="False"
        name={`tf-${draft._id}`}
        disabled={readOnly}
        checked={draft.correctAnswer === false}
        onChange={() => setDraft({ ...draft, correctAnswer: false })}
      />
      
      <div className="d-flex justify-content-end gap-2 mt-2">
        {readOnly ? (
          <>
            <FaPencil style={{ cursor: "pointer" }} onClick={onEdit} />
            <FaTrash
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={onDelete}
            />
          </>
        ) : (
          <>
            <Button variant="secondary" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => onUpdate(draft)}>
              Update Question
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
