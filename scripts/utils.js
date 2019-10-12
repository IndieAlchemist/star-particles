const randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomColor=(listColors)=>{
    return listColors[Math.floor(Math.random() * listColors.length)];
}

const colors = [
    { fill: 'rgb(227, 17, 255)', glow: 'rgb(227, 17, 255,0.2)' },
    { fill: 'rgb(17, 255, 176)', glow: 'rgb(17, 255, 176,0.2)' },
    { fill: 'rgb(255, 17, 77)', glow: 'rgb(255, 17, 77,0.2)' },
    { fill: 'rgb(184, 255, 17)', glow: 'rgb(184, 255, 17,0.2)' }

]

export { randomIntFromRange , randomColor};