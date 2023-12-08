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

for (let i = 2; i < input.length; i++) {
    const key = input[i].substring(0, 3);
    const left = input[i].substring(7, 10);
    const right = input[i].substring(12, 15);
    nodesMap.set(key, new Node(left, right));
}

let numberOfSteps = 0;
for (let i = 0; i <= input[0].length; i++) {
    if (i == input[0].length) { i = 0; }
    if (currentNode == 'ZZZ') { break; }
    currentNode = input[0][i] === 'L' ? nodesMap.get(currentNode).left : nodesMap.get(currentNode).right;
    numberOfSteps++;
}

console.log(numberOfSteps)