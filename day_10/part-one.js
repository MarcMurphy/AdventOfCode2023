const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
}

function findStartingPosition() {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === 'S') {
                return new Node(j, i);
            }
        }
    }
}

function findValidFirstMoves(startingPosition) {
    const validMoves = [];
    const leftMoves = new Set(["-", "L", "F"]);
    const rightMoves = new Set(["-", "J", "7"]);
    const northMoves = new Set(["|", "F", "7"]);
    const southMoves = new Set(["|", "J", "L"]);

    try {
        if (leftMoves.has(input[startingPosition.y][startingPosition.x - 1])) {
            validMoves.push(new Node(startingPosition.x - 1, startingPosition.y));
        }
    } catch (error) { console.log(error) }

    try {
        if (rightMoves.has(input[startingPosition.y][startingPosition.x + 1])) {
            validMoves.push(new Node(startingPosition.x + 1, startingPosition.y));
        }
    } catch (error) { console.log(error) }

    try {
        if (northMoves.has(input[startingPosition.y - 1][startingPosition.x])) {
            validMoves.push(new Node(startingPosition.x, startingPosition.y - 1));
        }
    } catch (error) { console.log(error) }

    try {
        if (southMoves.has(input[startingPosition.y + 1][startingPosition.x])) {
            validMoves.push(new Node(startingPosition.x, startingPosition.y + 1));
        }
    } catch (error) { console.log(error) }

    return validMoves;
}

function areNodesPositionsEqual(a,b) {
    return a.getPosition().x == b.getPosition().x && a.getPosition().y == b.getPosition().y;
}

let numOfSteps = 0;
const route = new Map();
const startingNode = findStartingPosition();
route.set(numOfSteps, startingNode);

const validStartingMoves = findValidFirstMoves(startingNode.getPosition())
let nextNode = new Node(validStartingMoves[0].x, validStartingMoves[0].y);
while (!areNodesPositionsEqual(startingNode,nextNode)) {
    numOfSteps++;
    route.set(numOfSteps, nextNode);

    const previousNodePosition = route.get(numOfSteps - 1).getPosition();
    const pipeChar = input[nextNode.y][nextNode.x];

    if (pipeChar == "|") {
        // if previous position was lower, then next node is above
        // else next node is below
        if (previousNodePosition.y < nextNode.getPosition().y) {
            nextNode = new Node(nextNode.x, nextNode.y + 1);
        } else {
            nextNode = new Node(nextNode.x, nextNode.y - 1);
        }
    }
    if (pipeChar == "-") { 
        // if previous position was to the left, then next node is right
        // else next node is left
        if (previousNodePosition.x < nextNode.getPosition().x) {
            nextNode = new Node(nextNode.x + 1, nextNode.y);
        } else {
            nextNode = new Node(nextNode.x - 1, nextNode.y);
        }
    }
    if (pipeChar == "L") { 
        // if previous position was to the right, then next node is above
        // else next node is right
        if (previousNodePosition.x > nextNode.getPosition().x) {
            nextNode = new Node(nextNode.x, nextNode.y -1);
        } else {
            nextNode = new Node(nextNode.x + 1, nextNode.y);
        }
    }
    if (pipeChar == "J") { 
        // if previous position was to the left, then next node is above
        // else next node is left
        if (previousNodePosition.x < nextNode.getPosition().x) {
            nextNode = new Node(nextNode.x, nextNode.y -1);
        } else {
            nextNode = new Node(nextNode.x - 1, nextNode.y);
        }
    }
    if (pipeChar == "7") { 
        // if previous position was to the left, then next node is below
        // else next node is left
        if (previousNodePosition.x < nextNode.getPosition().x) {
            nextNode = new Node(nextNode.x, nextNode.y +1);
        } else {
            nextNode = new Node(nextNode.x - 1, nextNode.y);
        }
    }
    if (pipeChar == "F") { 
        // if previous position was to the right, then next node is below
        // else next node is right
        if (previousNodePosition.x > nextNode.getPosition().x) {
            nextNode = new Node(nextNode.x, nextNode.y +1);
        } else {
            nextNode = new Node(nextNode.x + 1, nextNode.y);
        }
    }
}

console.log(`${numOfSteps} steps total`)
if(numOfSteps % 2 == 0 ) {
    console.log(`${numOfSteps / 2} furthest distance`)
}
else if(numOfSteps % 2 == 1 ) {
    console.log(`${(numOfSteps / 2)+1} furthest distance`)
}