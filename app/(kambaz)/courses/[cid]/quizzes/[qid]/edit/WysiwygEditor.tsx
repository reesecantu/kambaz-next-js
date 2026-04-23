"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function WysiwygEditor({
  value,
  onChange,
  readOnly = false,
}: {
  value: string;
  onChange: (v: string) => void;
  readOnly?: boolean;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: value,
    editable: !readOnly,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && editor.isEditable !== !readOnly) {
      editor.setEditable(!readOnly);
    }
  }, [editor, readOnly]);

  return (
    <div className={`border rounded mb-3 ${readOnly ? "bg-light" : ""}`} style={{ minHeight: "80px" }}>
      <EditorContent editor={editor} className="p-2" />
    </div>
  );
}
