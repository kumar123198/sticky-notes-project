// Get the parts of the page that JavaScript needs to work with.
const noteText = document.getElementById("noteText");
const addButton = document.getElementById("addButton");
const notes = document.getElementById("notes");

// This number decides which background color the next note will use.
let noteCount = 0;

function addNote() {
    const text = noteText.value.trim();

    // Do not add a note if the text box is empty.
    if (text === "") {
        return;
    }

    // Make a new note and put the typed text inside it.
    const note = document.createElement("div");
    note.classList.add("note");
    note.textContent = text;

    // Alternate between the blue and white note colors.
    if (noteCount % 2 === 0) {
        note.classList.add("note-blue");
    } else {
        note.classList.add("note-white");
    }
    noteCount = noteCount + 1;

    // Make the X button that removes this note.
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("aria-label", "Delete note");
    deleteButton.addEventListener("click", function () {
        note.remove();
    });

    note.appendChild(deleteButton);
    notes.appendChild(note);

    // Clear the text box so another note can be typed.
    noteText.value = "";
}

// Run addNote when the plus button is clicked.
addButton.addEventListener("click", addNote);
