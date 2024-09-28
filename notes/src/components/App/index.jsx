import { formatISO } from "date-fns";
import Jabber from "jabber";
import { nanoid } from "nanoid";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteNotes,
  getNotes,
  putNote,
  saveNotesToLocalStorage,
} from "../../utils/storage";
import { updateLastActiveDate } from "../../store/redux/userReducer";
import NotesList from "../NotesList";
import PrimaryPane from "../PrimaryPane";
import "./index.css";
import "./index-pro.css";
import { DarkModeProvider } from "../DarkModeContext";
import StatusBar from "../StatusBar";

const jabber = new Jabber();

function App({ mobxStore }) {
  const [notes, setNotes] = useState(getNotes());
  const [activeNoteId, setActiveNoteId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    saveNotesToLocalStorage(notes, activeNoteId);
  }, [notes, activeNoteId]);

  const saveNote = (id, { text, date }) => {
    putNote(id, { text, date });
    setNotes(getNotes());
    dispatch(updateLastActiveDate(formatISO(new Date(), { representation: "date" })));
  };

  const createNewNotes = ({ count, paragraphs }) => {
    for (let i = 0; i < count; i++) {
      const noteId = nanoid();
      let noteText = jabber.createParagraph(6);
      for (let j = 0; j < paragraphs; j++) {
        noteText += "\n\n" + jabber.createParagraph(30);
      }
      noteText = formatNoteText(noteText);
      putNote(noteId, { text: noteText });
    }
    const newNotes = getNotes();
    setNotes(newNotes);
    if (count === 1) {
      setActiveNoteId(Object.keys(newNotes).pop());
    }
  };

  const deleteAllNotes = () => {
    deleteNotes();
    setNotes(getNotes());
    setActiveNoteId(null);
  };

  return (
    <DarkModeProvider>
      <div className="notes">
        <div className="notes__columns">
          <NotesColumn
            notes={notes}
            activeNoteId={activeNoteId}
            setActiveNoteId={setActiveNoteId}
            createNewNotes={createNewNotes}
            deleteAllNotes={deleteAllNotes}
          />
          <PrimaryPane
            activeNoteId={activeNoteId}
            notes={notes}
            saveNote={saveNote}
          />
        </div>
        <StatusBar store={mobxStore.statusBar} />
      </div>
    </DarkModeProvider>
  );
}

const NotesColumn = ({ notes, activeNoteId, setActiveNoteId, createNewNotes, deleteAllNotes }) => (
  <div className="notes__column notes__column_list">
    <h1>NoteList</h1>
    <div className="notes__column-content">
      <NotesList
        notes={notes}
        activeNoteId={activeNoteId}
        onNoteActivated={setActiveNoteId}
        onNewNotesRequested={createNewNotes}
        onDeleteAllRequested={deleteAllNotes}
      />
    </div>
  </div>
);

const formatNoteText = (noteText) => noteText
  .split("\n")
  .map((line) =>
    line
      .split(" ")
      .filter(Boolean)
      .map((word) => {
        if (Math.random() < 0.05) {
          return "**" + word + "**";
        }
        if (Math.random() < 0.05) {
          return "_" + word + "_";
        }
        return word;
      })
      .join(" ")
  )
  .join("\n");

export default memo(App);
