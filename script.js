// to get the canvas element from webpage
let canvas = document.querySelector("#board");
//assigning windows dimension to the canvas element dimension
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let tool = canvas.getContext("2d");

let isDrawing = false; //flag

//***************tool selector logic************************************
let toolArr = document.querySelectorAll(".tool");
let currentTool = "pencil";
for (let i = 0; i < toolArr.length; i++) {
  toolArr[i].addEventListener("click", function (e) {
    const toolname = toolArr[i].id;
    if (toolname == "pencil") {
      currentTool = "pencil";
      tool.strokeStyle = "blue";
      console.log("pencil clicked");
    } else if (toolname == "eraser") {
      currentTool = "eraser";
      tool.strokeStyle = "white";
      console.log("eraser is clicked");
      tool.lineWidth = 5;
    } else if (toolName == "download") {
      console.log("download clicked");
      currentTool = "download";
      downloadFile();
    } else if (toolName == "sticky") {
      currentTool = "sticky";
      createSticky();
    } else if (toolName == "upload") {
      currentTool = "upload";
      console.log(e.target);
      uploadFile();
    } else if (toolName == "undo") {
      currentTool = "undo";
      undoFN();
    } else if (toolName == "redo") {
      console.log("redo clicked");
      redoFN();
    }
  });
}

//when holding the mouse
canvas.addEventListener("mousedown", function (e) {
  let sidx = e.clientX;
  let sidy = e.clientY;
  //drawing will start
  tool.beginPath();
  let toolbarheight = getYDelta();
  tool.moveTo(sidx, sidy - toolbarheight);
  isDrawing = true;
});
canvas.addEventListener("mousemove", function (e) {
  if (isDrawing == false) return;
  let eidx = e.clientX;
  let eidy = e.clientY;
  let toolbarheight = getYDelta();
  tool.lineTo(eidx, eidy - toolbarheight);
  tool.stroke();
});
canvas.addEventListener("mouseup", function (e) {
  isDrawing = false;
});
//helper function
let toolBar = document.querySelector(".toolbar");
function getYDelta() {
  let heightoftoolBar = toolBar.getBoundingClientRect().height;
  return heightoftoolBar;
}
