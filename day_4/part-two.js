const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

let amountOfCardsArray = Array(input.length).fill(1);
for (let i = 0; i < input.length; i++) {
    const line = input[i].replaceAll("  ", " ");
    const parts = line.split(':');
    const winningNumbers = new Set(parts[1].split('|')[0].trim().split(' '));
    const ourNumbers = new Set(parts[1].split('|')[1].trim().split(' '));

    const numberOfMatches = [...ourNumbers].reduce((count, num) => winningNumbers.has(num) ? count + 1 : count, 0);

    for (let j = 1; j <= numberOfMatches; j++) {
        amountOfCardsArray[i+j] = amountOfCardsArray[i+j] + amountOfCardsArray[i];
    }
}

console.log(amountOfCardsArray.reduce((partialSum, a) => partialSum + a, 0));