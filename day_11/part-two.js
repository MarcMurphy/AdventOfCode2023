const path = require('path');
const fs = require('fs');

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Galaxy {
    constructor(map) {
        this.map = map;
    }
    expandGalaxy() {
        //expand rows
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i].split('').every(x => x === '.')) {
                this.map[i] = this.map[i].replaceAll('.', '2');
            }
        }

        //rotate the map
        let rotatedMap = []
        rotatedMap.length = this.map.length;
        for (let i = 0; i < this.map.length; i++) {
            rotatedMap[i] = this.map.map(x => x[i]).join('');
        }
        this.map = rotatedMap;

        // expand rows again, which are now columns
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i].split('').every(x => x === '.' || x === '2')) {
                this.map[i] = this.map[i].replaceAll('.', '2');
            }
        }

        //rotate the map
        rotatedMap = []
        for (let i = 0; i < this.map.length; i++) {
            let column = this.map.map(function (value, index) { return value[i] })
            rotatedMap.push(column.join(''));
        }
        this.map = rotatedMap;
    }

    findAllGalaxies() {
        let points = [];
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] == '#') {
                    points.push(new Point(j, i));
                }
            }
        }
        return points;
    }
}


const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

const galaxy = new Galaxy(input);
galaxy.expandGalaxy();
const points = galaxy.findAllGalaxies();

let sum = 0;
for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
        const pointA = points[i];
        const pointB = points[j];

        let lowX = Math.min(pointA.x, pointB.x)
        const highX = Math.max(pointA.x, pointB.x)

        let lowY = Math.min(pointA.y, pointB.y)
        const highY = Math.max(pointA.y, pointB.y)

        for (; lowX < highX; lowX++) {
            if (galaxy.map[lowY][lowX] == '2') {
                sum += 1000000;
            }
            else {
                sum++;
            }
        }

        for (; lowY < highY; lowY++) {
            if (galaxy.map[lowY][lowX] == '2') {
                sum += 1000000;
            }
            else {
                sum++;
            }
        }
    }
}
console.log(sum)