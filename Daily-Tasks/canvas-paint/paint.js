const canvas = document.querySelector('#paintDiv')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let ctx = canvas.getContext("2d")



const toolPanel = document.querySelector('#toolPanel')
const changeColorBtn = document.querySelector('#changeColor')
const colorPicker = document.querySelector('#colorPicker')

colorPicker.addEventListener('input', function(e){
    changeColorBtn.style.backgroundColor = this.value
    document.querySelector('#pickerCard').style.backgroundColor = this.value
})
changeColorBtn.addEventListener('click', function(e){
    canvas.style.backgroundColor = colorPicker.value
})



const colorPalateDiv =  document.querySelector('#colorPalate')

const colors = ['#002642','#840032','#E59500','#E5DADA','#02040F']

function createColorCircle(parentEle, colorsArr){  
    colorsArr.forEach(item => {
        const div = document.createElement('div')
        div.classList.add('color-card')
        div.id = item
        div.style.backgroundColor = item
        parentEle.appendChild(div)
    })
   
    addEventToCircles(parentEle)
}

function addEventToCircles(parentEle){
    const box = parentEle.querySelectorAll('.color-card')
    console.log(parentEle.children,box)
    box.forEach(item => {
        item.addEventListener('click', function(e){
            console.log(`#${item.id}`)
            canvas.style.backgroundColor = `${item.id}`
        })
    })
}

createColorCircle(colorPalateDiv, colors)
