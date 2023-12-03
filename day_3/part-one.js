const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

let sum = 0;

for (let i = 0; i < input.length; i++) {
    let numberBuilder = '';
    let leftBoundary = 0;
    for (let j = 0; j <= input[i].length; j++) {
        if (parseInt(input[i][j]) > -1) {
            leftBoundary = numberBuilder == '' ?  j - ( j > 0 ? 1 : 0) : leftBoundary;
            numberBuilder += input[i][j];
        } else if (numberBuilder != '') {
            if (isPartsPiece(input, i, leftBoundary, j)) {
                sum += parseInt(numberBuilder);
                leftBoundary = 0;
            } 
            numberBuilder = '';
        }
    }
}

function isPartsPiece(input, rowNumber, leftBoundary, rightBoundary) {
    let valid = false;
    // check left
    if (leftBoundary > 0) {
        valid = valid || isPartsSymbol(input[rowNumber][leftBoundary])
    }
    //check right
    if (rightBoundary < input[rowNumber].length) {
        valid = valid || isPartsSymbol(input[rowNumber][rightBoundary])
    }

    //check above
    if (rowNumber > 0) {
        const charRange = input[rowNumber - 1].substring(leftBoundary, rightBoundary + 1);
        for (let i = 0; i < charRange.length; i++) {
            valid = valid || isPartsSymbol(charRange[i])
        }
    }

    //check below
    if (rowNumber + 1 < input.length) {
        const charRange = input[rowNumber + 1].substring(leftBoundary, rightBoundary +1);
        for (let i = 0; i < charRange.length; i++) {
            valid = valid || isPartsSymbol(charRange[i])
        }
    }
    return valid;
}

function isPartsSymbol(char) {
    return !parseInt(char) && char != '.'
}
console.log(sum);