//select the element

let pencilElement = document.querySelector("#pencil");
let eraserElement = document.querySelector("#eraser");
let stickyElement = document.querySelector("#sticky");
let uploadElement = document.querySelector("#upload");
let downloadElement = document.querySelector("#download");
let undoElement = document.querySelector("#undo");
let redoElement = document.querySelector("#redo");

//add event listener
pencilElement.addEventListener("click", function tellPencil() {
  console.log("pencil is clicked");
});
eraserElement.addEventListener("click", function tellEraser() {
  console.log("Eraser is clicked");
});
stickyElement.addEventListener("click", function tellSticky() {
  console.log("Sticky is clicked");
});
uploadElement.addEventListener("click", function tellUpload() {
  console.log("Upload is clicked");
});
downloadElement.addEventListener("click", function tellDownload() {
  console.log("Download is clicked");
});
undoElement.addEventListener("click", function tellUndo() {
  console.log("undo is clicked");
});
redoElement.addEventListener("click", function tellRedo() {
  console.log("redo is clicked");
});
let canvas = document.querySelector("#board");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ghggbcgfdgf;
