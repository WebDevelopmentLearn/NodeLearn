
//TODO: Задание 1 START
function greetUser(username: string): string {
    return `Привет, ${username}!`;
}

const message = greetUser("Artem");
console.log(message);
//TODO: Задание 1 END


//TODO: Задание 2 START
interface Person {
    name: string;
    age: number;
    city: string;
}

function printPersonInfo(person: Person): void {
    console.log(`Имя: ${person.name} \nВозраст: ${person.age} \nГород: ${person.city}`);
}

const person: Person = {
    name: "Artem",
    age: 24,
    city: "Braunschweig"
}

printPersonInfo(person);
//TODO: Задание 2 END


//TODO: Задание 3 START
function squareNumber(num: number): number {
    return num * num;
}

const square = squareNumber(5);
console.log(square);
//TODO: Задание 3 END


//TODO: Задание 4 START
function isEven(num: number): boolean {
    return num % 2 === 0;
}

const even = isEven(5);
console.log(even);

const even2 = isEven(4);
console.log(even2);
//TODO: Задание 4 END


//TODO: Задание 5 START
interface Student {
    name: string;
    grade: number;
}

function printStudentInfo(student: Student): void {
    console.log(`Имя: ${student.name} \nОценка: ${student.grade}`);
}

const student: Student = {
    name: "Artem",
    grade: 5
}

printStudentInfo(student);
//TODO: Задание 5 END


//TODO: Задание 6 START
function logMessage(message: string): void {
    console.log(message);
}

logMessage("Hello, World!");
//TODO: Задание 6 END