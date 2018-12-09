const noteBoard = document.querySelector("#noteBoard");
const listOfNotes = [];

document.getElementById("addButton").addEventListener("click", function() {
  const createdSticky = document.createElement("div");
  const sticky =
    '<div class="stickyNote"><h3>Title</h3><p>Paragraph</p><div><button>Edit</button><button>Delete</button></div></div>';
  createdSticky.innerHTML = sticky;
  listOfNotes.push(createdSticky);

  displayNoteBoard();
});

function displayNoteBoard() {
  listOfNotes.forEach(element => {
    noteBoard.appendChild(element);
  });
}
