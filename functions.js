function RandomSpot() {
    let valor1 = Math.round(Math.random() * 19)
    return valor1 * 30
}

function RandomColor() {
    let red = Math.round(Math.random() * 255)
    let green = Math.round(Math.random() * 255)
    let blue = Math.round(Math.random() * 255)

    return `rgb(${red}, ${green}, ${blue})`
}