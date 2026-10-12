const STORAGE_KEY = "sticky-notes";
const notesContainer = document.querySelector("#notes");
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");

function readNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter((note) => typeof note === "string") : [];
  } catch {
    return [];
  }
}

let notes = readNotes();

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // The notes remain usable for this visit if browser storage is unavailable.
  }
}

function renderNotes() {
  notesContainer.replaceChildren();

  notes.forEach((text, index) => {
    const note = document.createElement("article");
    note.className = "note";
    note.append(document.createTextNode(text));

    const removeButton = document.createElement("button");
    removeButton.className = "delete-button";
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `Delete note ${index + 1}`);
    removeButton.addEventListener("click", () => {
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    });

    note.append(removeButton);
    notesContainer.append(note);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }

  notes.push(text);
  saveNotes();
  renderNotes();
  form.reset();
  input.focus();
});

renderNotes();
