var LivingCrature = require("./LivingCrature");
var Grass = require("./Grass");
var GrassEater = require("./GrassEater");
var Predator = require("./Predator");

module.exports = class Magician extends LivingCrature {
    constructor(x, y) {
        super(x, y);
    }
    move() {
        let emptyCell = super.chooseCell(0);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]
        let emptyCell1 = super.chooseCell(1);
        let newCell1 = emptyCell1[Math.floor(Math.random() * emptyCell1.length)]
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;
            this.x = newX;
            this.y = newY;
        }
        else if (newCell1 && grassArr.length >= 600) {
            let newX = newCell1[0];
            let newY = newCell1[1];
            matrix[this.y][this.x] = 1;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            let newGrass = new Grass(this.x, this.y);
            grassArr.push(newGrass);
            matrix[newY][newX] = 5;
            this.x = newX;
            this.y = newY;
        }
    }
    transform() {
        let emptyCell = super.chooseCell(4);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 0;
            for (let i in rockArr) {
                if (this.x == rockArr[i].x && this.y == rockArr[i].y) {
                    rockArr.splice(i, 1);
                    break;
                }
            }
            var possibleNumber = [1, 2, 3];
            var item = Math.floor(Math.random() * possibleNumber.length);
            var newCharacter = possibleNumber[item]
            if (newCharacter == 1) {
                matrix[newY][newX] = 1;
                let grass = new Grass(newX, newY);
                grassArr.push(grass);
            }
            else if (newCharacter == 2) {
                matrix[newY][newX] = 2;
                let grassEater = new GrassEater(newX, newY);
                grassEaterArr.push(grassEater);
            }
            else if (newCharacter == 3) {
                matrix[newY][newX] = 3;
                let pred = new Predator(newX, newY);
                predatorArr.push(pred);
            }
        }
        else {
            this.move()
        }
    }
}