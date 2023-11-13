import { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/mode/markdown/markdown";
import "codemirror/lib/codemirror.css";
import "./index.css";

const NoteEditor = ({ notes, activeNoteId, saveNote }) => {
  const currentNote = notes[activeNoteId];
  const textareaRef = useRef();

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(textareaRef.current, {
      mode: "markdown",
      lineWrapping: true,
    });

    const handleChange = (doc, change) => {
      if (change.origin !== "setValue") {
        saveNote({ text: doc.getValue() });
      }
    };

    editor.on("change", handleChange);

    return () => {
      editor.off("change", handleChange);
      editor.toTextArea();
    };
  }, [activeNoteId, saveNote]);

  return (
    <div className="note-editor" key={activeNoteId}>
      <textarea
        ref={textareaRef}
        defaultValue={currentNote.text}
        autoComplete="off"
      />
    </div>
  );
}

export default NoteEditor;
