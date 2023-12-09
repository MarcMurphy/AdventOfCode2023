const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

let sum = 0;
input.forEach(sequence => {
    //Part 1
    const initialNumbers = sequence.split(" ").map(Number);
    //Part 2
    //const initialNumbers = sequence.split(" ").map(Number).reverse;
    const numberSequenceMap = new Map();
    numberSequenceMap.set(0, initialNumbers);

    let currentRow = 0;
    while (!numberSequenceMap.get(currentRow).every(x => x === 0)) {
        let newNumbers = [];
        const currentNumbersArr = numberSequenceMap.get(currentRow);
        for (let i = 0, j = 1; j < currentNumbersArr.length; i++, j++) {
            newNumbers.push(currentNumbersArr[j] - currentNumbersArr[i]);
        }
        currentRow++;
        if(newNumbers.length === 0) {
            newNumbers.push(0);
        }
        numberSequenceMap.set(currentRow, newNumbers);
    }

    while (currentRow > 0) {
        let modifier = numberSequenceMap.get(currentRow)[numberSequenceMap.get(currentRow).length - 1];
        const nextNumbersArr = numberSequenceMap.get(currentRow - 1);
        nextNumbersArr.push(nextNumbersArr[nextNumbersArr.length - 1] + modifier)
        currentRow--;
    }

    sum += numberSequenceMap.get(0)[numberSequenceMap.get(0).length - 1];
});

console.log(sum);
