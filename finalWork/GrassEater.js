var Grass = require("Grass");
var LivingCrature = require("./LivingCrature");

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character);
    }
    mul() {
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell);
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 2;
            let newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 8
        }
    }
    move() {
        this.energy--
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell);
        if (newCell && this.energy > 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newX
            this.y = newY
        }
        else if (this.energy <= 0) {
            this.die()
        }
    }
    eat() {
        let emptyCell = this.chooseCell(1);
        let newCell = random(emptyCell);
        if (newCell) {
            this.energy += 2
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX
            this.y = newY
            if (this.energy > 15) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (let i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1)
                break
            }
        }

    }
}