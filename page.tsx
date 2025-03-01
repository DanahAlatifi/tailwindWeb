"use client";

import React, { useState, useEffect } from "react";
import "./globals.css";

const NotesApp: React.FC = () => {
  const [note, setNote] = useState<string>("");
  const [notesList, setNotesList] = useState<string[]>([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("userNotes") || "[]");
    setNotesList(savedNotes);
  }, []);

  const saveNote = () => {
    if (note.trim() !== "") {
      const updatedNotes = [...notesList, note];
      setNotesList(updatedNotes);
      localStorage.setItem("userNotes", JSON.stringify(updatedNotes));
      console.log("Note saved:", note);
      setNote("");
    }
  };

  const clearNotes = () => {
    localStorage.removeItem("userNotes");
    setNotesList([]);
    console.log("All notes cleared!");
    alert("All notes cleared!");
  };

  const deleteNote = (index: number) => {
    const updatedNotes = notesList.filter((_, i) => i !== index);
    setNotesList(updatedNotes);
    localStorage.setItem("userNotes", JSON.stringify(updatedNotes));
    console.log("Note deleted:", notesList[index]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Write Your Note for Today</h2>
      <textarea
        className="w-4/5 h-48 p-3 border rounded-lg text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-100"
        placeholder="Write your notes here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
      <div className="mt-4 flex space-x-4">
        <button 
          className="bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
          onClick={saveNote}
        >
          Save Note
        </button>
        <button 
          className="bg-gray-300 text-black px-5 py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
          onClick={clearNotes}
        >
          Clear Notes
        </button>
      </div>
      <table className="mt-6 w-4/5 border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2 text-left">Saved Notes</th></tr>
        </thead>
        <tbody>
          {notesList.map((savedNote, index) => (
            <tr key={index} className="bg-white">
              <td className="border border-gray-400 px-4 py-2">{savedNote}</td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                <button 
                  className="bg-gray-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-gray-400 transition"
                  onClick={() => deleteNote(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotesApp;
