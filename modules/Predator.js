var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Predator extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy = 10;
    }
    //vorpes method
    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    //qayluma
    move() {

        // yntruma vandak
        var newCell = random(this.chooseCell(3));
        this.energy--;
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            this.y = newY;
            this.x = newX;

        }
    }
    eat() {


        var newCell1 = this.chooseCell(3)
        var cell = this.chooseCell(1)
        var miacum = newCell1.concat(cell);
        var newCell = random(miacum)
        
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;



            for (var i in YellowEaterArr) {
                if (newX == YellowEaterArr[i].x && newY == YellowEaterArr[i].y) {
                    YellowEaterArr.splice(i, 1);
                    break;
                }
            }
            for(var i in grassArr){
            if (newX == grassArr[i].x && newY == grassArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }
        }
            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }
    }

    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newpredator = new Predator(newCell[0], newCell[1], this.index);
            PredatorArr.push(newpredator);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 5;

            PredatorHashiv++;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.x][this.y] = 0;
            for (var i in PredatorArr) {
                if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}