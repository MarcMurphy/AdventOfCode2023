const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input2.txt'), 'utf8').trim().split('\n');

const times = input[0].match(/\d+/g).map(Number);
const distances = input[1].match(/\d+/g).map(Number);
let numWaysToBeatRecord = 1;
for (let i = 0; i < times.length; i++) {
    let minTime, maxTime = false;

    const time = times[i];
    const dist = distances[i];
    const speed = 1;
    let previousSuccess = false;
    for (let secondsButtonHeldFor = 0; secondsButtonHeldFor < time || (!minTime || !maxTime); secondsButtonHeldFor++) {
        let distanceTraveled = secondsButtonHeldFor * (time - secondsButtonHeldFor);
        if (distanceTraveled > dist) {
            if (!minTime) { minTime = secondsButtonHeldFor; }
            previousSuccess = true;
        } else if (previousSuccess){
            maxTime = secondsButtonHeldFor - 1;
            previousSuccess = false;
        }
    }
    numWaysToBeatRecord *= (maxTime - minTime + 1);
}

console.log(numWaysToBeatRecord);