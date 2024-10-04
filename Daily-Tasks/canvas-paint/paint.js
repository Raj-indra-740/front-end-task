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

const colors = ['#002642','#840032','#E59500','#7C00FE','#FFFFFF']

let drawStatus = false;
let eraseStatus = false;
let lineWidth = 10;
let lineCap = 'round'
let strokeColor = 'black';
let eraserColor = 'white';


// Initial setup
let ctx = canvas.getContext("2d")
ctx.lineWidth = lineWidth;
ctx.lineCap = lineWidth;
ctx.strokeStyle = strokeColor;



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
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})



//function to create color circle
function createColorCircle(parentEle, colorsArr, func){  
    colorsArr.forEach(item => {
        const div = document.createElement('div')
        div.classList.add('color-card')
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
    canvas.style.backgroundColor = color
}

//functions to perform drawing

function startDrawing(e){
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
canvas.addEventListener('mouseup', finishDrawing)

console.log(ctx)

//Eraser function
function eraser(e){
    ctx.clearRect(e.clientX, e.clientY, lineWidth, lineWidth)
}

eraserDiv.addEventListener('click', function()  {
    eraseStatus = true
})