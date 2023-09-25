const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')


//SCORES
const TopMenu = document.querySelector('.top_menu')
const DownMenu = document.querySelector('.down_menu')

const bestScore = document.querySelector('.best_score_value')
let topScore = document.querySelector('#score_value')
const downBestScore = document.querySelector('.best_score_value')

const menuRest = document.querySelector('.resetMenu')
let menuPotuation = document.querySelector('.potuation')
let namePotuation = document.querySelector('.namePotuation')


//SOUND
const soundPop = new Audio('./assets/apple_bite.ogg')
soundPop.playbackRate = 2.5

const size = 30

let countP = 0
let countF = 0

let spead = 180

let power = false

let direction

let snake = [
    { x: 300, y: 270 }// CABEÇA
]

let imagesArray = [
    './assets/maca1.png'
]

let imagesPowers = [
    './assets/coffee.png'
]

const snakeHead = () => snake[snake.length - 1]

const food = {
    x: RandomSpot(),
    y: RandomSpot(),
    color: RandomColor()
}

const drawSnake = () => {

    if (power) {
        ctx.fillStyle = RandomColor()
    } else {
        ctx.fillStyle = "#2e2"
    }
    snake.forEach((elemento, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = "green"
        }
        ctx.fillRect(elemento.x, elemento.y, size, size)
    })
}


let newpower = new Image()

let newpowerXY = {
    x: RandomSpot(),
    y: RandomSpot()
}

newpower.src = `${imagesPowers[countP]}`

const drawPower = () => {
    ctx.drawImage(newpower, newpowerXY.x, newpowerXY.y, size, size)
    // ctx.fillStyle = food.color
}

const drawFood = () => {

    let newfood = new Image()

    newfood.src = `${imagesArray[countF]}`
    ctx.drawImage(newfood, food.x, food.y, size, size)

    // ctx.fillStyle = food.color

    // ctx.strokeStyle = 'white'
    // ctx.strokeRect(food.x, food.y, size, size)
    // ctx.fillRect(food.x, food.y, size, size)
}

const eatVerification = () => {
    const head = snakeHead();

    if (head.x == food.x && head.y == food.y) {

        snake.push(head)

        count = Math.round(Math.random() * 2)

        soundPop.play()

        topScore.innerHTML = parseInt(topScore.innerText) + 10


        do {
            food.x = RandomSpot()
            food.y = RandomSpot()
            food.color = RandomColor()
            //console.log(snake.filter(s => s.x === food.x && s.y === food.y).length > 0, food,  snake)   ---------- !!!!!!!!!!!!!!!!!!!
        } while (snake.filter(s => s.x === food.x && s.y === food.y).length > 0)// && s[snake.length-1].x === food.x && s[snake.length-1].y === food.y).length > 0)
    }
}

const eatPowerVerification = () => {
    const head = snakeHead();

    if (head.x == newpowerXY.x && head.y == newpowerXY.y) {
        count = Math.round(Math.random() * 2)

        soundPop.play()

        topScore.innerHTML = parseInt(topScore.innerText) + 10

        newpowerXY.x = undefined
        newpowerXY.y = undefined

        switch (countF) {
            case 0:
                spead = 120
                power = true
                setTimeout(() => {
                    spead = 180
                    power = false
                }, 5000);
                break;

        }

        setTimeout(() => {
            do {
                newpowerXY.x = RandomSpot()
                newpowerXY.y = RandomSpot()
                //console.log(snake.filter(s => s.x === food.x && s.y === food.y).length > 0, food,  snake)   ---------- !!!!!!!!!!!!!!!!!!!
            } while (snake.filter(s => s.x === food.x && s.y === food.y).length > 0)// && s[snake.length-1].x === food.x && s[snake.length-1].y === food.y).length > 0)

        }, 15000);
    }
}

const moveSnake = () => {

    if (!direction) return

    const head = snakeHead();

    snake.shift()

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }
    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }
    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }
    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

}

const cellSize = 30;
const numRows = canvas.height / cellSize;
const numCols = canvas.width / cellSize;

function drawGrid() {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            ctx.strokeStyle = "rgb(19, 19, 19)";
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

const Collision = () => {
    const head = snakeHead()
    const body = snake.length - 2

    const wallColision = head.x == 600 || head.x == -30 || head.y == 600 || head.y == -30

    const bodyColision = snake.find((part, index) => {
        return index < body && head.x === part.x && head.y === part.y
    })

    if (wallColision || bodyColision) {
        power = false
        spead = 180
        setTimeout(gameOver(), 40)
    }
}

document.onkeydown = e => changeDirection(e)

const changeDirection = (event) => {
    switch (event.key) {
        case 'ArrowDown':
            if (direction != "up") {
                direction = "down"
            }
            break;
        case 'ArrowUp':
            if (direction != "down") {
                direction = "up"
            }
            break;
        case 'ArrowRight':
            if (direction != "left") {
                direction = "right"
            }
            break;
        case 'ArrowLeft':
            if (direction != "right") {
                direction = "left"
            }
            break;

    }
    console.log(event.key);
}

// document.addEventListener("keydown", ({key}) => {
//     if(key == "ArrowDown"){
//         direction = "down"
//     }
// })



const gameOver = () => {
    console.log(topScore)
    if (downBestScore.innerHTML < topScore.innerText) {
        downBestScore.innerText = topScore.innerText
        namePotuation.innerText = "Best Score!!"
        menuPotuation.innerText = `${topScore.innerText} pontos`
    } else if (downBestScore.innerHTML > topScore.innerText) {
        namePotuation.innerText = "Pontuação: "
        menuPotuation.innerText = `${topScore.innerText} pontos`
    }



    direction = undefined
    canvas.style.filter = "blur(5px)"


    TopMenu.style.display = "none"
    DownMenu.style.display = "none"

    menuRest.style.display = 'flex'
}



const drawPowers = () => {

}


function ResetGame() {
    snake = [
        { x: 270, y: 270 },
        { x: 300, y: 270 }// CABEÇA
    ]
    canvas.style.filter = 'blur(0px)'
    menuRest.style.display = "none"

    topScore.innerText = 0
    TopMenu.style.display = "flex"
    DownMenu.style.display = "flex"

}

const gameLoop = () => {

    ctx.clearRect(0, 0, 600, 600)
    Collision()
    drawSnake()
    drawFood()
    drawPower()
    moveSnake()
    eatVerification()
    eatPowerVerification(newpower)
    drawGrid()

    setTimeout(() => {
        gameLoop()
    }, spead);
}

gameLoop()