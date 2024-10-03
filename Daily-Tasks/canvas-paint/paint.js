const canvas = document.querySelector('#paintDiv')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext("2d")

context.fillRect(0,100,100,100)
context.fillRect(200,100,100,100)

for(let i = 0; i < 10; i++){
    let x = (i * 100) * 2 
    context.fillRect(x, 0,100,100)
}

