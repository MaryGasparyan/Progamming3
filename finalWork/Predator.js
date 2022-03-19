var LivingCrature = require("./LivingCrature");
var GrassEater = require("./GrassEater");

module.exports = class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 20;
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
        console.log("Yee")
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell);
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 3;
            let newPredator = new Predator(newX, newY);
            predatorArr.push(newPredator);
        }
    }
    move() {
        this.energy--
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell);
        if (newCell && this.energy > 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;
            this.x = newX
            this.y = newY
        }

        else if (this.energy <= 0) {
            this.die()
        }

    }
    eat() {
        let emptyCell = this.chooseCell(2);
        let newCell = random(emptyCell);
        if (newCell) {
            this.energy += 2
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX
            this.y = newY
            if (this.energy > 25) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (let i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1)
                break
            }
        }

    }
}