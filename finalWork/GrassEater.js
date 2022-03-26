var LivingCrature = require("./LivingCrature");

module.exports = class GrassEater extends LivingCrature {
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
    }

    mul() {
        let emptyCell = super.chooseCell(0);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]
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
        let emptyCell = super.chooseCell(0);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]
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
        let emptyCell = super.chooseCell(1);
        let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]
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