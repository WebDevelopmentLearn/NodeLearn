
//Created by: Github Copilot
export const generateFibonacci = (n: number): number[] => {
    const sequence = [1, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

//Created by: Copilot
const isPrime = (n: number): boolean => {
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true
}

//Created by: Github Copilot
export const generatePrimeNumbers = (n: number): number[] => {
    const primes = [];
    for (let i = 2; primes.length < n; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

