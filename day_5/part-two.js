const path = require('path');
const fs = require('fs');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8').trim().split('\n');

class MapData {
    constructor(source, dest, range) {
        this.source = source;
        this.dest = dest;
        this.range = range;
    }
}
class SeedRange {
    constructor(startingValue, range) {
        this.startingValue = startingValue;
        this.range = range;
    }
}
const keysArr = ['seed-to-soil map:', 'soil-to-fertilizer map:', 'fertilizer-to-water map:', 'water-to-light map:', 'light-to-temperature map:', 'temperature-to-humidity map:', 'humidity-to-location map:'];
const keysMap = new Set(keysArr)
const almanac = new Map(Array.from(keysMap).map(key => [key, []]));

let currentMap = -1;
for (let i = 1; i < input.length; i++) {
    const line = input[i];
    if (line == '') { continue; }
    if (keysMap.has(line)) { currentMap++; continue; }
    const [dest, source, range] = line.split(' ').map(item => BigInt(item));
    almanac.get(keysArr[currentMap]).push(new MapData(source, dest, range))
}

const seedsAndRanges = input[0].split(':')[1].trim().split(' ').map(function (item) { return BigInt(item); });
const seeds = new Set();
for(let i = 2; i < seedsAndRanges.length - 1; i+=2) {
    seeds.add(new SeedRange(seedsAndRanges[i], seedsAndRanges[i+1]));
}

let lowestLocation = 1000000000000n;
seeds.forEach(seedAndRange => {
    console.log(`starting range ${seedAndRange.startingValue}`)
    for(let j = 0n; j <= seedAndRange.range; j++) {
        let seed = seedAndRange.startingValue + j;

        for (let i = 0; i < keysArr.length; i++) {
            const appropriateMap = almanac.get(keysArr[i]);
    
            let found = false;
            appropriateMap.forEach(map => {
                if (seed < map.source || found) { return; }
                if (seed >= map.source && seed < map.source + map.range) {
                    seed = map.dest + (seed - map.source);
                    found = true;
                }
            });
        }
        if (seed < lowestLocation ) {
            console.log(`new lowest seed is ${seed}`);
            lowestLocation = seed;
        }
        if (j%1000000n == 0n) {
            console.log(`1000000n values processed, ${seedAndRange.range - j} to go`)
        }
    }
    console.log(`completed range`)
});

console.log(`Lowest Location is ${lowestLocation}`)