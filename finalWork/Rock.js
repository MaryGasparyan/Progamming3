var LivingCrature = require("./LivingCrature");

module.exports = class Rock extends LivingCrature {
    constructor(x, y) {
        super(x, y);
    }
    eat() {
        let foods = super.chooseCell(3);
        if (rockArr.length < predatorArr.length) {
            if (foods.length != 0) {
                let randomFoods = foods[Math.floor(Math.random() * foods.length)]
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