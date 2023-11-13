import { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import FilterInput from "../FilterInput";
import NoteButton from "../NoteButton";
import "./index.css";

const NotesList = ({
  notes,
  activeNoteId,
  onNoteActivated,
  onNewNotesRequested,
  onDeleteAllRequested,
}) => {
  const [filter, setFilter] = useState("");
  const noteCount = Object.keys(notes).length;
  const sortedNotes = Object.values(notes).sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleNoteActivation = (id) => () => onNoteActivated(id);
  const handleNewNoteRequest = (count, paragraphs) => () => onNewNotesRequested({ count, paragraphs });

  return (
    <div className="notes-list">
      <div className="notes-list__filter">
        <FilterInput
          filter={filter}
          onChange={setFilter}
          noteCount={noteCount}
        />
      </div>

      <div className="notes-list__notes">
        {sortedNotes
          .filter(({ text }) => !filter || text.toLowerCase().includes(filter.toLowerCase()))
          .map(({ id, text, date }) => (
            <NoteButton
              key={id}
              isActive={activeNoteId === id}
              onNoteActivated={handleNoteActivation(id)}
              text={text}
              filterText={filter}
              date={date}
            />
          ))}
      </div>

      <div className="notes-list__controls">
        <ButtonGroup size="small">
          <Button classes={{ root: "notes-list__control" }} onClick={handleNewNoteRequest(1, 1)}>+ Note</Button>
          <Button classes={{ root: "notes-list__control" }} onClick={handleNewNoteRequest(1, 300)}>+ Huge</Button>
          <Button classes={{ root: "notes-list__control" }} onClick={handleNewNoteRequest(100, 1)}>+ 100</Button>
        </ButtonGroup>
        <ButtonGroup size="small">
          <Button classes={{ root: "notes-list__control" }} onClick={onDeleteAllRequested}>Delete all</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default NotesList;
