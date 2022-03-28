var LivingCrature = require("./LivingCrature");

module.exports = class Grass extends LivingCrature {
    constructor(x, y, index, multiply) {
        super(x, y, index, multiply);
    }
    mul() {
        this.multiply++;
        if (this.multiply >= 3) {
            let emptyCells = super.chooseCell(0)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (newCell) {
                let x = newCell[0]
                let y = newCell[1]
                matrix[y][x]=1
                var gr = new Grass(x, y, 1)
                grassArr.push(gr)
                this.multiply = 0;
            }
        }
    }
}