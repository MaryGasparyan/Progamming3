
function generate(matLen,gr,grEt=3,pred=2,rck=2,mag=1) {
    var matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
            
        }  
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0){
            matrix[y][x] = 1
        }  
    }
    for (let i = 0; i < grEt; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0){
            matrix[y][x] = 2
        }  
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0){
            matrix[y][x] = 3
        }  
    }
    for (let i = 0; i < rck; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0){
            matrix[y][x] = 4
        }  
    }
    for (let i = 0; i < mag; i++) {
        let x = Math.floor(Math.random()*matLen)
        let y = Math.floor(Math.random()*matLen)
        if(matrix[y][x] == 0){
            matrix[y][x] = 5
        }  
    }
    return matrix
}
console.log()
let matrix = generate(25,100,80,50,10,5)
var side = 25;
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var rockArr = []
var magArr = []
function setup() {

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            }
           else if (matrix[y][x] == 2) {
                let greater = new GrassEater(x, y)
                grassEaterArr.push(greater)
            }
            else if (matrix[y][x] == 3) {
                let pred = new Predator(x, y)
                predatorArr.push(pred)
            }
            else if (matrix[y][x] == 4) {
                let rock = new Rock(x, y)
                rockArr.push(rock)
            }
            else if (matrix[y][x] == 5) {
                let mag = new Magician(x, y)
                magArr.push(mag)
            }
        }
    }
    console.log(grassArr);
    console.log(grassEaterArr);
}
function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("black");
            }
            else if (matrix[y][x] == 5) {
                fill("purple");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            rect(x * side, y * side, side, side);
        }
    }
    for(let i in grassArr){
        grassArr[i].mul()
    }
    for(let i in grassEaterArr){
        grassEaterArr[i].eat()
    }
    for(let i in predatorArr){
        predatorArr[i].eat()
    }
    for(let i in rockArr){
        rockArr[i].eat()
    }
    for(let i in magArr){
        magArr[i].transform()
    }
}

