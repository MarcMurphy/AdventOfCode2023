const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

let sum = 0;

const gearIndexToValuesMap = new Map();

for (let i = 0; i < input.length; i++) {
    let numberBuilder = '';
    let leftBoundary = 0;
    for (let j = 0; j <= input[i].length; j++) {
        if (parseInt(input[i][j]) > -1) {
            leftBoundary = numberBuilder == '' ? j - (j > 0 ? 1 : 0) : leftBoundary;
            numberBuilder += input[i][j];
        } else if (numberBuilder != '') {
            const details = getNearbyGearDetails(input, i, leftBoundary, j);
            if (details.isTouchingGear) {
                leftBoundary = 0;
                if (gearIndexToValuesMap.has(details.rowKey + details.columnKey)) {
                    gearIndexToValuesMap.get(details.rowKey + details.columnKey).push(parseInt(numberBuilder));
                } else {
                    gearIndexToValuesMap.set(details.rowKey + details.columnKey, [parseInt(numberBuilder)]);
                }
            }
            numberBuilder = '';
        }
    }
}

gearIndexToValuesMap.forEach((value, key, map) => {
    if(value.length == 2) {
        sum += value[0] * value[1]
    }
});

function getNearbyGearDetails(input, rowNumber, leftBoundary, rightBoundary) {
    let valid = false;
    let row, column = -1;
    // check left
    if (leftBoundary > 0) {
        if (isGearSymbol(input[rowNumber][leftBoundary])) {
            valid = true;
            row = 'row:' + rowNumber;
            column = 'column:' + leftBoundary;
        }
    }
    //check right
    if (rightBoundary < input[rowNumber].length) {
        if (isGearSymbol(input[rowNumber][rightBoundary])) {
            valid = true;
            row = 'row:' + rowNumber;
            column = 'column:' + rightBoundary;
        }
    }

    //check above
    if (rowNumber > 0) {
        const charRange = input[rowNumber - 1].substring(leftBoundary, rightBoundary + 1);
        for (let i = 0; i < charRange.length; i++) {
            if (isGearSymbol(charRange[i])) {
                valid = true;
                row = 'row:' + (rowNumber - 1);
                column = 'column:' + (leftBoundary + i);
            }
        }
    }

    //check below
    if (rowNumber + 1 < input.length) {
        const charRange = input[rowNumber + 1].substring(leftBoundary, rightBoundary + 1);
        for (let i = 0; i < charRange.length; i++) {
            if (isGearSymbol(charRange[i])) {
                valid = true;
                row = 'row:' + (rowNumber + 1);
                column = 'column:' + (leftBoundary + i);
            }
        }
    }
    return { isTouchingGear: valid, rowKey: row, columnKey: column };
}

function isGearSymbol(char) {
    return char == '*'
}
console.log(sum);