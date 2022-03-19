var LivingCrature = require("./LivingCrature");
var Predator = require("./Pedator");

module.exports = class Rock extends LivingCreature {
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
    eat() {
        let foods = this.chooseCell(3)
        if (rockArr.length < predatorArr.length) {
            if (foods.length != 0) {
                let randomFoods = random(foods)
                let x = randomFoods[0]
                let y = randomFoods[1]
                matrix[y][x] = 4
                let rock = new Rock(x, y)
                rockArr.push(rock)

                for (let i in predatorArr) {
                    if (x == predatorArr[i].x && y == predatorArr[i].y) {
                        predatorArr.splice(i, 1)
                        break
                    }
                }
            }
        }
    }
}