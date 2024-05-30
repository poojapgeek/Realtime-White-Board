// to get the canvas element from webpage
let canvas = document.querySelector("#board");
//assigning windows dimension to the canvas element dimension
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let tool = canvas.getContext("2d");

let isDrawing = false; //flag
tool.strokeStyle = "black"; // default pencil color
tool.lineWidth = 1; // default pencil line width
/***************tool selector logic************************************/
let toolArr = document.querySelectorAll(".tool");
let currentTool = "pencil";
for (let i = 0; i < toolArr.length; i++) {
  toolArr[i].addEventListener("click", function (e) {
    const toolname = toolArr[i].id;
    if (toolname == "pencil") {
      currentTool = "pencil";
      tool.strokeStyle = colorPicker.value; // set to current color
      tool.lineWidth = lineWidth.value; // set to current line width
      console.log("pencil clicked");
    } else if (toolname == "eraser") {
      currentTool = "eraser";
      tool.strokeStyle = "white";
      console.log("eraser is clicked");
      tool.lineWidth = 5;
    } else if (toolname == "sticky") {
      currentTool = "sticky";
      createSticky();
    } else if (toolname == "download") {
      console.log("download clicked");
      currentTool = "download";
      downloadFile();
    } else if (toolname == "upload") {
      currentTool = "upload";
      //console.log(e.target);
      uploadFile();
    } else if (toolname == "undo") {
      currentTool = "undo";
      undoFN();
    } else if (toolname == "redo") {
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
//create outershell
function createOuterShell(textarea) {
  //element creation
  let stickydiv = document.createElement("div");
  let navdiv = document.createElement("div");
  let mindiv = document.createElement("div");
  let closediv = document.createElement("div");

  mindiv.innerText = "min";
  closediv.innerText = "X";

  //class styling
  stickydiv.setAttribute("class", "sticky");
  navdiv.setAttribute("class", "nav");
  mindiv.setAttribute("class", "minimize");
  closediv.setAttribute("class", "close");
  // html structure
  stickydiv.appendChild(navdiv);
  navdiv.appendChild(mindiv);
  navdiv.appendChild(closediv);
  //add it to the page
  document.body.appendChild(stickydiv);

  let isMinimized = false;
  closediv.addEventListener("click", function () {
    stickydiv.remove();
  });
  mindiv.addEventListener("click", function () {
    textarea.style.display = isMinimized == true ? "block" : "none";
    isMinimized = !isMinimized;
  });
  let isStickyDown = false;
  navdiv.addEventListener("mousedown", function (e) {
    //initial point
    initialX = e.clientX;
    initialY = e.clientY;
    isStickyDown = true;
  });
  navdiv.addEventListener("mousemove", function (e) {
    if (isStickyDown == true) {
      //final point
      let finalX = e.clientX;
      let finalY = e.clientY;
      //distance
      let dx = finalX - initialX;
      let dy = finalY - initialY;
      //move sticky
      let { top, left } = stickydiv.getBoundingClientRect();
      stickydiv.style.top = top + dy + "px";
      stickydiv.style.left = left + dx + "px";
      initialX = finalX;
      initialY = finalY;
    }
  });
  navdiv.addEventListener("mouseup", function () {
    isStickyDown = false;
  });
  return stickydiv;
}

//sticky function
function createSticky() {
  /*<div class="sticky">
  <div class="nav">
    <div class="minimize">min</div>
    <div class="close">X</div>
  </div>
  <textarea class="text-area"></textarea>
</div>
*/

  let textarea = document.createElement("textarea");
  textarea.setAttribute("class", "text-area");
  let stickydiv = createOuterShell(textarea);
  stickydiv.appendChild(textarea);
}

let inputTag = document.querySelector(".input-tag");
function uploadFile() {
  // 1. input tag -> file(<input type="file">) [hide] -> css
  // 2. click image icon -> input tag click
  inputTag.click();
  // 3. file read input tag
  inputTag.addEventListener("change", function () {
    //4.add it to UI
    let data = inputTag.files[0];
    let img = document.createElement("img");
    //src -> file url
    let url = URL.createObjectURL(data);
    img.src = url;
    img.setAttribute("class", "upload-img");
    // add it to the stickydiv
    let stickydiv = createOuterShell(img);
    stickydiv.appendChild(img);
  });
}
