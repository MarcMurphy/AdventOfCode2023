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

const seeds = input[0].split(':')[1].trim().split(' ').map(function (item) { return BigInt(item); });
let lowestLocation = 1000000000000;
seeds.forEach(seed => {
    for (let i = 0; i < keysArr.length; i++) {
        const appropriateMap = almanac.get(keysArr[i]);

        let found = false;
        appropriateMap.forEach(map => {
            if (seed < map.source || found) { return; }
            if (seed >= map.source && seed <= map.source + map.range) {
                seed = map.dest + (seed - map.source);
                found = true;
            }
        });
    }
    lowestLocation = seed < lowestLocation ? seed : lowestLocation;
});

console.log(`Lowest Location is ${lowestLocation}`)