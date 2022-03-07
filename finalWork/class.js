class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
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
class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.directions = [];
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
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
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
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.directions = [];
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
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
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
class Rock {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];

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
    chooseCell(number) {
        this.getNewCoordinates()
        let result = []

        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)
                if (matrix[y][x] == number) {
                    result.push(this.directions[i])
                }
        }
        return result
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
class Magician {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
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
    chooseCell(number) {
        this.getNewCoordinates();
        let result = [];

        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)
                if (matrix[y][x] == number) {
                    result.push(this.directions[i]);
                }
        }
        return result;
    }
    move() {
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell);
        let emptyCell1 = this.chooseCell(1);
        let newCell1 = random(emptyCell1);
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
        let emptyCell = this.chooseCell(4);
        let newCell = random(emptyCell);
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
        else{
            this.move()
        }
    }
}
//Rock-գիշատիչներին քարացնում է երբ նրանց քանակը գերազանցում է քարերի քանակին
