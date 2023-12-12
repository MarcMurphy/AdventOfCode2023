const path = require('path');
const fs = require('fs');
const { group } = require('console');

const input = fs.readFileSync(path.join(__dirname, 'example.txt'), 'utf8').trim().split('\n');

// Start copy pasted code
// Thanks stack overflow https://stackoverflow.com/questions/66013729/get-n-sized-numbers-that-add-up-to-a-number-x
function _sumToN(n, size, maxValue, acc = [], solutions = []) {
    if (size === 0) {
        const sum = acc.reduce((sum, num) => sum + num);
        if (sum === n && !acc.slice(1, -1).includes(0)) {
            solutions = solutions.concat([acc]);
        }
        return solutions;
    }

    for (let i = 0; i <= n; ++i) {
        solutions = _sumToN(n, size - 1, maxValue, acc.concat(i), solutions);
    }

    return solutions;
}

function sumToN(n, size, maxValue) {
    return _sumToN(n, size, maxValue);
}
//END copy pasted code

let sum = 0;
input.forEach(line => {
    const parts = line.split(' ');
    const groups = parts[1].split(',').map(Number);

    const forcedSpaces = groups.length;
    const forcedSprings = groups.reduce((acc, val) => { return acc + val; }, 0);
    const extraSpaces = parts[0].length - forcedSprings - forcedSpaces;
    
    const x = sumToN(groups.length + extraSpaces, forcedSpaces+1, Math.max(...groups));
    const possibleSpaceIterations = x.filter(item => {
        for (let i = 1; i < item.length - 1; i++) {
            if (item[i] === 0) {
                return false;
            }
        }
        return true;
    });

    let allPossibleSpringSpaceCombos = [];
    possibleSpaceIterations.forEach(spaces => {
        let builder = '';
        for(let i = 0; i < spaces.length; i++) {
            builder += '.'.repeat(spaces[i]);
            if(builder.length < parts[0].length) {
                builder += '#'.repeat(groups[i]);
            }
        }
        allPossibleSpringSpaceCombos.push(builder);
    });

    const knownCharacters = [];
    for(let i = 0; i < parts[0].length; i++) {
        if (parts[0][i] != '?') {
            knownCharacters.push({ char: parts[0][i], pos: i});
        }
    }
    const filteredCombos = allPossibleSpringSpaceCombos.filter( combo => {
        for(let i = 0; i < knownCharacters.length; i++) {
            if (combo[knownCharacters[i].pos] != knownCharacters[i].char) {
                return false;
            }
        }
        return true;
    });
    console.log(filteredCombos.length);
    sum += filteredCombos.length;
})
console.log(sum);