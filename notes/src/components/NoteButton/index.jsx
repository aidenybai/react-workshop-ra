import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { format } from "date-fns";
import "./index.css";

function NoteButton({ isActive, onNoteActivated, text, filterText, date }) {
  const className = [
    "notes-list__button",
    "notes-list__note",
    isActive && "notes-list__note_active",
  ]
    .filter(Boolean)
    .join(" ");

  const firstLine = generateFirstLine(text, filterText);

  return (
    <button className={className} onClick={onNoteActivated}>
      <span className="notes-list__note-meta">
        {format(date, "d MMM yyyy")}
      </span>
      <ReactMarkdown
        remarkPlugins={[gfm]}
        disallowedElements={["p", "h1", "h2", "h3", "h4", "h5", "h6"]}
        unwrapDisallowed={true}
        components={firstLine.componentsMapping}
      >
        {firstLine.text}
      </ReactMarkdown>
    </button>
  );
}

function generateFirstLine(text, filterText) {
  let firstLine = text
    .split("\n")
    .map((i) => i.trim())
    .filter((i) => i.length > 0)[0];

  let componentsMapping = {};
  if (
    filterText &&
    firstLine.toLowerCase().includes(filterText.toLowerCase())
  ) {
    const firstLineParts = firstLine.split(
      new RegExp(
        "(" + filterText.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&") + ")",
        "gi"
      )
    );

    firstLine = firstLineParts
      .map((part) => {
        if (part.toLowerCase() === filterText.toLowerCase()) {
          return `~~${part}~~`;
        }

        return part;
      })
      .join("");

    componentsMapping = {
      del: "mark",
    };
  }

  return { text: firstLine, componentsMapping };
}

export default NoteButton;
