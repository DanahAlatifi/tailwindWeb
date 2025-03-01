// DisplayPage.js
import React from "react";
import "./globals.css";



export const saveNotesToLocalStorage = (notes: string[]) => {
  localStorage.setItem('userNotes', JSON.stringify(notes));
};

export const getNotesFromLocalStorage = (): string[] => {
  return JSON.parse(localStorage.getItem('userNotes') || '[]');
};

export const clearNotesFromLocalStorage = () => {
  localStorage.removeItem('userNotes');
};
