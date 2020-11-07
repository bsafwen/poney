import { rollerCoaster } from "./roller_coaster";

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let inputStrings: string[] = [];

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', () => {
    inputStrings = inputString.trim().split('\n').map(str => str.trim());
    rollerCoaster(inputStrings);
});