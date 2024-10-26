"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFibonacci = generateFibonacci;
exports.generatePrimeNumbers = generatePrimeNumbers;
function generateFibonacci(limit) {
    const sequence = [0, 1];
    while (sequence[sequence.length - 1] + sequence[sequence.length - 2] <= limit) {
        sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
    }
    return sequence;
}
function generatePrimeNumbers(limit) {
    const primes = [];
    for (let i = 2; i <= limit; i++) {
        if (primes.every((p) => i % p !== 0)) {
            primes.push(i);
        }
    }
    return primes;
}
