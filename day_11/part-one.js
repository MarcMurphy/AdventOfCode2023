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
                this.map.splice(i, 0, this.map[i]);
                i++;
            }
        }
        //expand columns
        for (let i = 0; i < this.map[0].length; i++) {
            var col = this.map.map(function (value, index) { return value[i]; });
            if (col.every(x => x === '.')) {
                for (let j = 0; j < this.map.length; j++) {
                    this.map[j] = this.map[j].substring(0, i) + '.' + this.map[j].substring(i);;
                }
                i++;
            }
        }
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
        const xDist = Math.abs(points[i].x - points[j].x);
        const yDist = Math.abs(points[i].y - points[j].y);
        //console.log(`${points[i].x},${points[i].y} -> ${points[j].x},${points[j].y} is distance ${xDist} + ${yDist} = ${xDist+yDist}`)
        sum += xDist + yDist;
    }
}
console.log(sum)