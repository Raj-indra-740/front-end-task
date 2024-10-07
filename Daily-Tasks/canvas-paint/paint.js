const canvas = document.querySelector('#paintDiv');
const toolPanel_1 = document.querySelector('#toolPanel-1')
const changeColorBtnFill = document.querySelector('#changeColorFill')
const changeColorBtnStroke = document.querySelector('#changeColorStroke')
const colorPickerFill = document.querySelector('#colorPickerFill')
const colorPickerStroke = document.querySelector('#colorPickerStroke')
const colorPalateDivFill =  document.querySelector('#colorPalate')
const colorPalateDivStroke =  document.querySelector('#colorPalateStroke')
const clearCanvasBtn = document.querySelector('#clear')
const strokeWidthInput = document.querySelector('#strokeWidth')
const rangeInputValue = document.querySelector('#rangeValue')
const eraserDiv = document.querySelector('#eraser')
const undoBtn =  document.querySelector('#undo')
const redoBtn =  document.querySelector('#redo')
const cursorSmall = document.querySelector('.cursorSmall')
const colors = ['#002642','#840032','#E59500','#7C00FE','#FFFFFF']

let paintStartFlag = false;
let drawStatus = false;
let eraseStatus = false;
let lineWidth = 10;
let lineCap = 'round'
let strokeColor = 'black';
let eraserColor = 'white';

const undoSnapShot = JSON.parse(localStorage.getItem('undoStack')) || []; 
const redoSnapShot = [];


// Initial setup
let ctx = canvas.getContext("2d")
ctx.lineWidth = lineWidth;
ctx.lineCap = lineWidth;
ctx.strokeStyle = strokeColor;

// undo and redo
function updateUndoStack(){
    let currData = canvas.toDataURL()
    undoSnapShot.push(currData)
    localStorage.setItem('undoStack', JSON.stringify(undoSnapShot))
    redoSnapShot.length = 0;
}

function undo() {
    if (undoSnapShot.length > 1) {
        const lastUpdate = undoSnapShot.pop(); 
        redoSnapShot.push(lastUpdate); 

        const previousState = undoSnapShot[undoSnapShot.length - 1];

        rePaintImg(previousState); 
    }
}
function redo() {
    if (redoSnapShot.length > 0) {
        const redoState = redoSnapShot.pop();
        undoSnapShot.push(redoState);
        rePaintImg(redoState); 
    }
}
undoBtn.addEventListener('click', function(e){
    undo()
})
redoBtn.addEventListener('click', function(e){
    redo()
})


// window.addEventListener('resize', changeCanvasSize)
window.addEventListener('load', function(e){
    changeCanvasSize()
})

changeCanvasSize()

function changeCanvasSize(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

// Stoke size 
strokeWidthInput.addEventListener('input', function(e){
    lineWidth = this.value
    rangeInputValue.value = `${this.value}`
})

rangeInputValue.addEventListener('input', function(){
    lineWidth = this.value.trim();
    strokeWidthInput.value = this.value.trim()
})

//fill tool
colorPickerFill.addEventListener('input', function(e){
    // changeColorBtnFill.style.backgroundColor = this.value
    document.querySelector('#pickerCard').style.backgroundColor = this.value
})
changeColorBtnFill.addEventListener('click', function(e){
    changeCanvasColor(colorPickerFill.value)
})

//stroke tool
colorPickerStroke.addEventListener('input', function(e){
    // changeColorBtnStroke.style.backgroundColor = this.value
    document.querySelector('#pickerCardStroke').style.backgroundColor = this.value
})
changeColorBtnStroke.addEventListener('click', function(e){
    changeStrokeColor(colorPickerStroke.value) 
})

//clear canvas button
clearCanvasBtn.addEventListener('click', function(){
    localStorage.setItem('canvasBg', 'white')
    localStorage.setItem('canvasImage', '')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})



//function to create color circle
function createColorCircle(parentEle, colorsArr, func){  
    colorsArr.forEach(item => {
        const div = document.createElement('div')
        div.classList.add('color-card')
        div.classList.add('cursor-pointer')
        div.id = item
        div.style.backgroundColor = item
        parentEle.appendChild(div)
    })
   
    addEventToCircles(parentEle, func)
}

//function to add event listener on each color circle
function addEventToCircles(parentEle, callBack){
    const box = parentEle.querySelectorAll('.color-card')
    console.log(parentEle.children,box)
    box.forEach(item => {
        item.addEventListener('click', function(e){
            eraseStatus = false
            callBack(item.id)
            canvas.classList.remove('cursor-eraser')
            canvas.classList.add('cursor-pen')
            paintStartFlag = true;
            console.log('pen added')

        })
    })
}

createColorCircle(colorPalateDivFill, colors, changeCanvasColor)
createColorCircle(colorPalateDivStroke, colors, changeStrokeColor)

//function to change stroke color
function changeStrokeColor(color){
    strokeColor = color
}

//function to change canvas color
function changeCanvasColor(color){
    localStorage.setItem('canvasBg', color); 
    canvas.style.backgroundColor = color
}

//functions to perform drawing

function startDrawing(e){
    if(!paintStartFlag) return
    drawStatus = true;
    draw(e)
}
function finishDrawing(){
    drawStatus = false
    ctx.beginPath()
}

function draw(e){
    // console.log('drawing started')
    if(!drawStatus) return;
    if(eraseStatus){
        eraser(e)
        return
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = strokeColor;
    ctx.lineTo(e.clientX, e.clientY)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.clientX, e.clientY)
}

//event listener on canvas for mouse events
canvas.addEventListener('mousedown', startDrawing)
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', function(e){
    finishDrawing()
    saveCanvas()
    updateUndoStack()
})

console.log(ctx)
const positionElement = (e)=> {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
     
    cursorSmall.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    
    // cursorBig.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
   
}
//Eraser function
function eraser(e){
    ctx.clearRect(e.clientX, e.clientY, lineWidth * 1.5, lineWidth * 1.5)
}

eraserDiv.addEventListener('click', function()  {
    eraseStatus = true
    canvas.classList.add('cursor-eraser')
    canvas.classList.remove('cursor-pen')
    console.log('eraser added')
})


function saveCanvas() {
    const dataURL = canvas.toDataURL(); 
    localStorage.setItem('canvasImage', dataURL); 
}

window.addEventListener('load', function() {
    changeCanvasSize();
    const savedImage = localStorage.getItem('canvasImage');
    let bgColor =   localStorage.getItem('canvasBg')
    canvas.style.backgroundColor = bgColor
    rePaintImg(savedImage)
});

function rePaintImg(data){
    if (data) {
        const img = new Image();
        img.src = data; 
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    } 
}