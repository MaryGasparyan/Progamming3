var socket = io()
var side = 10;
var weather = "winter"
function setup() {
    frameRate(5);
    createCanvas(50 * side, 50 * side);
    background('#acacac');
}
var cl = 0
function changeWeather() {
    cl++
}
function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[0].length; x++) {
            if (matrix[y][x] == 1) {
                if (c % 2 != 0) {
                    fill("#80F3CD")
                }
                else {
                    fill("green");
                }

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
}
socket.on('send matrix', nkarel)

function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredator() {
    socket.emit("add predator")
}
function addRock() {
    socket.emit("add rock")
}
function addMagician() {
    socket.emit("add magician")
}

