const noteBoard = document.querySelector("#noteBoard");
let listOfNotes = [];

document.getElementById("addButton").addEventListener("click", function() {
  const noteId = IDGenerator();

  createStickyNote(noteId);

  displayNoteBoard(listOfNotes);

  addEditListener(noteId);

  document
    .getElementById(`deleteButton${noteId}`)
    .addEventListener("click", function() {
      const stickyNote = document.querySelector(`#stickyContainer${noteId}`);

      const length = listOfNotes.length;
      for (let i = 0; i < length; i++) {
        if (listOfNotes[i] === stickyNote) {
          listOfNotes.splice(i, 1);
        }
      }

      stickyNote.parentNode.removeChild(stickyNote);
      displayNoteBoard(listOfNotes);
    });
});

function createStickyNote(noteId) {
  const createdSticky = document.createElement("div");
  createdSticky.setAttribute("id", `stickyContainer${noteId}`);
  const sticky = `
      <div class="stickyNotes">
        <h3 id="noteTitle${noteId}">Title</h3>
        <p id="noteContent${noteId}">Paragraph</p>
        <div>
            <button id="editButton${noteId}">Edit</button>
            <button id="deleteButton${noteId}">Delete</button>
        </div>
      </div>`;
  createdSticky.innerHTML = sticky;

  listOfNotes.push(createdSticky);
}

function IDGenerator() {
  const timestamp = +new Date();
  const timeStampString = timestamp.toString();
  const randomNumbersArray = timeStampString.split("").reverse();

  return randomNumbersArray.join("");
}

function displayNoteBoard(array) {
  array.forEach(element => {
    noteBoard.appendChild(element);
  });
}

function replaceTitleToInput(noteId) {
  const title = document.getElementById(`noteTitle${noteId}`);
  const titleValue = title.textContent;
  const titleInput = document.createElement("input");
  titleInput.setAttribute("id", `noteTitle${noteId}`);
  titleInput.value = titleValue;
  title.parentNode.replaceChild(titleInput, title);
}

function replaceNoteContentToTextArea(noteId) {
  const content = document.getElementById(`noteContent${noteId}`);
  const contentValue = content.textContent;
  const contentInput = document.createElement("textarea");
  contentInput.setAttribute("id", `noteContent${noteId}`);
  contentInput.value = contentValue;
  content.parentNode.replaceChild(contentInput, content);
}

function replaceEditToSave(noteId) {
  const editButton = document.getElementById(`editButton${noteId}`);
  const saveButton = document.createElement("button");
  saveButton.setAttribute("id", `saveButton${noteId}`);
  saveButton.textContent = "Save";
  editButton.parentNode.replaceChild(saveButton, editButton);
}

function replaceTitleInputToH3(noteId) {
  const titleInput = document.getElementById(`noteTitle${noteId}`);
  const titleValue = titleInput.value;
  const title = document.createElement("h3");
  title.setAttribute("id", `noteTitle${noteId}`);
  title.textContent = titleValue;
  titleInput.parentNode.replaceChild(title, titleInput);
}

function replaceContentTextAreaToP(noteId) {
  const contentInput = document.getElementById(`noteContent${noteId}`);
  const contentValue = contentInput.value;
  const content = document.createElement("p");
  content.setAttribute("id", `noteContent${noteId}`);
  content.textContent = contentValue;
  contentInput.parentNode.replaceChild(content, contentInput);
}

function replaceSaveToEdit(noteId) {
  const saveButton = document.getElementById(`saveButton${noteId}`);
  const editButton = document.createElement("button");
  editButton.setAttribute("id", `editButton${noteId}`);
  editButton.textContent = "Edit";
  saveButton.parentNode.replaceChild(editButton, saveButton);
}

function addSaveListener(noteId) {
  document
    .getElementById(`saveButton${noteId}`)
    .addEventListener("click", function() {
      replaceTitleInputToH3(noteId);
      replaceContentTextAreaToP(noteId);
      replaceSaveToEdit(noteId);

      addEditListener(noteId);
    });
}

function addEditListener(noteId) {
  document
    .getElementById(`editButton${noteId}`)
    .addEventListener("click", function() {
      replaceTitleToInput(noteId);
      replaceNoteContentToTextArea(noteId);
      replaceEditToSave(noteId);

      addSaveListener(noteId);
    });
}
