const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim().split('\n');

let sum = 0;
input.forEach(line => {
    line = line.replaceAll("  ", " ");
    const parts = line.split(':');
    const winningNumbers = parts[1].split('|')[0].trim().split(' ');
    const ourNumbers = parts[1].split('|')[1].trim().split(' ');

    let pointsAccumulator = 0.5;
    ourNumbers.forEach(num => {
        if (winningNumbers.includes(num)) {
            pointsAccumulator *= 2;
        }
    });
    sum +=  Math.floor(pointsAccumulator);
});

console.log(sum)