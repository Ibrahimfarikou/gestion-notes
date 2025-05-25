// Simule une base de données avec localStorage
const NotesStorage = {
    getNotes: () => {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    },
    saveNotes: (notes) => {
        localStorage.setItem('notes', JSON.stringify(notes));
    },
    addNote: (note) => {
        const notes = NotesStorage.getNotes();
        note.id = Date.now(); // ID unique
        notes.push(note);
        NotesStorage.saveNotes(notes);
    },
    updateNote: (id, newNote) => {
        const notes = NotesStorage.getNotes();
        const index = notes.findIndex(note => note.id == id);
        if (index !== -1) {
            notes[index] = { ...newNote, id };
            NotesStorage.saveNotes(notes);
        }
    },
    deleteNote: (id) => {
        const notes = NotesStorage.getNotes().filter(note => note.id != id);
        NotesStorage.saveNotes(notes);
    }
};