const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');


const maxMap = new Map();
maxMap.set('red', 12);
maxMap.set('green', 13);
maxMap.set('blue', 14);

let sum = 0;
input.forEach(line => {
    let currentGame = line.split(':')[0].split(' ')[1];
    let cubeDraws = line.split(':')[1].split(/[;,]+/);
    let valid = true;
    cubeDraws.forEach(draw => {
        const arr = draw.trim().split(' ');
        const number = arr[0];
        const color = arr[1];
        if (number > maxMap.get(color)) {
            valid = false;
        }
    });
    if (valid) {
        sum += parseInt(currentGame);
    }
});


console.log(sum);