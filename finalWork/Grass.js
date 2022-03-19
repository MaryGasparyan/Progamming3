var LivingCrature = require("./LivingCrature");


module.exports = class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell);
        if (this.multiply >= 5 && newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 1;
            let newGrass = new Grass(newX, newY);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }
}