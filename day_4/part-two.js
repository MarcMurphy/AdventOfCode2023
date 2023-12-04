const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').toString().trim().split('\n');

let amountOfCardsArray = Array(input.length).fill(1)
for (let i = 0; i < input.length; i++) {
    const line = input[i].replaceAll("  ", " ");
    const parts = line.split(':');
    const winningNumbers = parts[1].split('|')[0].trim().split(' ');
    const ourNumbers = parts[1].split('|')[1].trim().split(' ');

    let numberOfMatches = 0;
    ourNumbers.forEach(num => {
        if (winningNumbers.includes(num)) {
            numberOfMatches++;
        }
    });

    for (let j = 1; j <= numberOfMatches; j++) {
        amountOfCardsArray[i+j] = amountOfCardsArray[i+j] + (1 * amountOfCardsArray[i])
    }
}

console.log(amountOfCardsArray.reduce((partialSum, a) => partialSum + a, 0))