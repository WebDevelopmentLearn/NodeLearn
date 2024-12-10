//TODO: Задание 1 START
console.log("//=============================//");
console.log("Задание 1");
const sumEvenNumbers = (arr: number[]): number => {
    return arr.reduce((pv, cv) => {
        return pv + cv;
    }, 0);
}

const numbers: number[] = [1, 2, 3, 5, 10, 4, 2];
console.log("sumEvenNumbers(numbers): ", sumEvenNumbers(numbers));
console.log("//=============================//");
//TODO: Задание 1 END


//TODO: Задание 2 START
console.log("//=============================//");
console.log("Задание 2");
interface StringToBooleanFunction {
    (str: string): boolean;
}

const stringIsEmpty: StringToBooleanFunction = (str) => {
    return str === "";
}

console.log("stringIsEmpty(\"\"): ", stringIsEmpty(""));
console.log("stringIsEmpty(\"Hello\"): ", stringIsEmpty("Hello"));
console.log("//=============================//");
//TODO: Задание 2 END


//TODO: Задание 3 START
console.log("//=============================//");
console.log("Задание 3");
type CompareStrings = {
    (str: string, str2: string): boolean;
}

const compareStrings: CompareStrings = (str, str2) => {
    return str === str2;
}

console.log("compareStrings(\"Hello\", \"World\"): ", compareStrings("Hello", "World"));
console.log("compareStrings(\"Hello\", \"hello\"): ", compareStrings("Hello", "hello"));
console.log("compareStrings(\"Hello\", \"Hello\"): ", compareStrings("Hello", "Hello"));
console.log("//=============================//");
//TODO: Задание 3 END


//TODO: Задание 4 START
console.log("//=============================//");
console.log("Задание 4");

function getLastElement<T>(arr: T[]): T {
    return arr[arr.length - 1];
}

const names: string[] = ["Harry", "Samantha", "Kenny", "Lee", "Alvin", "Leon", "Clementine"];

console.log("getLastElement<string>(names): ", getLastElement<string>(names));

console.log("//=============================//");
//TODO: Задание 4 END


//TODO: Задание 5 START
console.log("//=============================//");
console.log("Задание 5");

function makeTriple<T>(arg: T, arg2: T, arg3: T): T[] {
    return [arg, arg2, arg3];
}

console.log("makeTriple<string>(\"Lee\", \"Clementine\", \"Kenny\"): ", makeTriple<string>("Lee", "Clementine", "Kenny"));

console.log("//=============================//");
//TODO: Задание 5 END
