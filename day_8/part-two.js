const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

class Node {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
}

const nodesMap = new Map();
const startingNodes = [];

for (let i = 2; i < input.length; i++) {
    const key = input[i].substring(0, 3);
    const left = input[i].substring(7, 10);
    const right = input[i].substring(12, 15);
    nodesMap.set(key, new Node(left, right));
    if (key[2] == 'A') {
        startingNodes.push(key);
    }
}

let numberOfSteps = 0;
const numberOfStepsArray = Array(startingNodes.length);
for (let i = 0; i <= input[0].length; i++) {
    if (i == input[0].length) { i = 0; }
    let finished = true;
    for (let j = 0; j < numberOfStepsArray.length; j++) { 
        finished = finished && numberOfStepsArray[j];
    }
    if(finished) { 
        break; 
    }
    for (let j = 0; j < startingNodes.length; j++) { 
        if ( startingNodes[j][2] == 'Z' && !numberOfStepsArray[j]) {
            numberOfStepsArray[j] = numberOfSteps;
        }
    }
    
    for (let j = 0; j < startingNodes.length; j++) {
        startingNodes[j] = input[0][i] === 'L' ? nodesMap.get(startingNodes[j]).left : nodesMap.get(startingNodes[j]).right;
    }
    numberOfSteps++;
}

var gcd = function (a, b) {
    return a ? gcd(b % a, a) : b;
}

var lcm = function (a, b) {
    return a * b / gcd(a, b);
}

console.log(numberOfStepsArray.reduce(lcm));
console.log(numberOfSteps)