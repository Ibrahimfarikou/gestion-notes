// Charge les notes au démarrage
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('notes-list')) {
        loadNotes();
    }
    if (document.getElementById('form-note')) {
        setupAddForm();
    }
    if (document.getElementById('form-edit')) {
        setupEditForm();
    }
});

// Affiche toutes les notes
function loadNotes() {
    const notes = NotesStorage.getNotes();
    const tbody = document.getElementById('notes-list');
    tbody.innerHTML = notes.map(note => `
        <tr>
            <td>${note.etudiant}</td>
            <td>${note.matiere}</td>
            <td>${note.note}/20</td>
            <td>
                <a href="modifier-note.html?id=${note.id}" class="btn">✏️</a>
                <button onclick="deleteNote(${note.id})" class="btn">🗑️</button>
            </td>
        </tr>
    `).join('');
}

// Supprime une note
function deleteNote(id) {
    if (confirm("Supprimer cette note ?")) {
        NotesStorage.deleteNote(id);
        loadNotes();
    }
}

// Configure le formulaire d'ajout
function setupAddForm() {
    const form = document.getElementById('form-note');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const note = {
            etudiant: document.getElementById('etudiant').value,
            matiere: document.getElementById('matiere').value,
            note: document.getElementById('note').value
        };
        NotesStorage.addNote(note);
        window.location.href = 'index.html';
    });
}

// Configure le formulaire de modification
function setupEditForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const note = NotesStorage.getNotes().find(n => n.id == id);

    if (note) {
        document.getElementById('note-id').value = note.id;
        document.getElementById('edit-etudiant').value = note.etudiant;
        document.getElementById('edit-matiere').value = note.matiere;
        document.getElementById('edit-note').value = note.note;

        const form = document.getElementById('form-edit');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const updatedNote = {
                etudiant: document.getElementById('edit-etudiant').value,
                matiere: document.getElementById('edit-matiere').value,
                note: document.getElementById('edit-note').value
            };
            NotesStorage.updateNote(id, updatedNote);
            window.location.href = 'index.html';
        });
    } else {
        window.location.href = 'index.html';
    }
}