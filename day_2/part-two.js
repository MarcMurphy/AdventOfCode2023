const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

const colorKeys = ['red', 'green', 'blue'];
let power = 0;
input.forEach(line => {
    const maxMap = new Map();
    let cubeDraws = line.split(':')[1].split(/[;,]+/);
    cubeDraws.forEach(draw => {
        const arr = draw.trim().split(' ');
        const number = arr[0];
        const color = arr[1];
        if (maxMap.has(color)) {
            parseInt(maxMap.get(color)) < number ? maxMap.set(color, number) : null;
        } else {
            maxMap.set(color, number);
        }
    });

    let values = [];
    colorKeys.forEach(color => {
        if (maxMap.has(color)) {
            values.push(parseInt(maxMap.get(color)));
        }
    });
    
    power += values.reduce((a, b)=> a*b, 1)
});


console.log(power);