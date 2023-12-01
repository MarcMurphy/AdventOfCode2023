const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

let sum = 0;
for (let i = 0; i < input.length; i++) {
    let firstChar, secondChar = false;
    for (let j = 0, k = input[i].length - 1; j < input[i].length; j++, k--) {
        firstChar = firstChar ? firstChar : parseInt(input[i][j]);
        secondChar = secondChar ? secondChar : parseInt(input[i][k]);
    }
    sum += parseInt('' + firstChar + '' + secondChar);
}

console.log(sum);