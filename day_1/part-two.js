const path = require('path');
const fs = require('fs');

const wordToNumberMap = [
    { word: 'one', number: 1 },
    { word: 'two', number: 2 },
    { word: 'three', number: 3 },
    { word: 'four', number: 4 },
    { word: 'five', number: 5 },
    { word: 'six', number: 6 },
    { word: 'seven', number: 7 },
    { word: 'eight', number: 8 },
    { word: 'nine', number: 9 },
];

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim().split('\n');

let sum = 0;
for (let i = 0; i < input.length; i++) {
    let firstChar, secondChar = false;
    for (let j = 0, k = input[i].length - 1; j < input[i].length; j++, k--) {
        firstChar = firstChar ? firstChar : parseInt(input[i][j]);
        if (!firstChar) {
            for (let l = 0; l < wordToNumberMap.length; l++) {
                if (input[i].substring(j, j + wordToNumberMap[l].word.length) === wordToNumberMap[l].word) {
                    firstChar = wordToNumberMap[l].number;
                    break;
                }
            }
        }
        secondChar = secondChar ? secondChar : parseInt(input[i][k]);
        if (!secondChar) {
            for (let l = 0; l < wordToNumberMap.length; l++) {
                if (input[i].substring(k, k + wordToNumberMap[l].word.length) === wordToNumberMap[l].word) {
                    secondChar = wordToNumberMap[l].number;
                    break;
                }
            }
        }

    }
    sum += parseInt('' + firstChar + '' + secondChar);
}

console.log(sum);