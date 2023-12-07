const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

const ranking = new Map();
ranking.set('A', 14);
ranking.set('K', 13);
ranking.set('Q', 12);
ranking.set('J', 11);
ranking.set('T', 10);
ranking.set('9', 9);
ranking.set('8', 8);
ranking.set('7', 7);
ranking.set('6', 6);
ranking.set('5', 5);
ranking.set('4', 4);
ranking.set('3', 3);
ranking.set('2', 2);

class Player {
    constructor(cards, bid) {
        this.cards = cards;
        this.bid = bid;
        this.score = this.getPlayerHandRank();
    }

    getPlayerHandRank() {
        const cardsMap = new Map();
        for (let i = 0; i < this.cards.length; i++) {
            const char = this.cards[i];
            if (cardsMap.has(char)) {
                cardsMap.set(char, cardsMap.get(char) + 1);
            } else {
                cardsMap.set(char, 1);
            }
        }

        let pairFound, twoPairFound, threeOfAKindFound, fullHouseFound, fourOfAKindFound, fiveOfAKindFound = false;

        for (let v of cardsMap.values()) {
            if (v == 5) { fiveOfAKindFound = true; }
            if (v == 4) { fourOfAKindFound = true; }
            if (v == 3) {
                threeOfAKindFound = true;
                if (pairFound) { fullHouseFound = true; }
            }
            if (v == 2) {
                if (pairFound) { twoPairFound = true; }
                pairFound = true;
                if (threeOfAKindFound) { fullHouseFound = true; }
            }
        }

        if (fiveOfAKindFound) { return 6; }
        else if (fourOfAKindFound) { return 5; }
        else if (fullHouseFound) { return 4; }
        else if (threeOfAKindFound) { return 3; }
        else if (twoPairFound) { return 2; }
        else if (pairFound) { return 1; }
        return 0;
    }
}

let players = [];

input.forEach(line => {
    players.push(new Player(line.split(' ')[0], parseInt(line.split(' ')[1])))
});


players.sort(function (a, b) {
    if (a.score > b.score) { return 1; }
    if (a.score < b.score) { return -1; }

    for (let i = 0; i < a.cards.length; i++) {
        const aCurrCard = ranking.get(a.cards[i])
        const bCurrCard = ranking.get(b.cards[i])
        if (aCurrCard > bCurrCard) { return 1; }
        if (aCurrCard < bCurrCard) { return -1; }
    }
    return 0;
});

let currTotal = 0;
for(let i = 0; i < players.length; i++) {
    currTotal += (players[i].bid * (i + 1));
}

console.log(currTotal)