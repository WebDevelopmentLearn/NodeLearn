//TODO: Задание 1 START
type Admin = {
    name: string;
    permissions: string[];
};
type User = {
    name: string;
    email: string;
};
type AdminUser = Admin & User;
const adminUser: AdminUser = {
    name: "Alice",
    permissions: ["create", "delete"],
    email: "Alice@gmail.com",
};
console.log(adminUser);
//TODO: Задание 1 END


//TODO: Задание 2 START
type Engine = {
    type: string;
    horsepower: number;
}

type Car = {
    make: string;
    model: string;
    engine: Engine;
    year?: number;
}

const printCarInfo = (car: Car): void => {
    console.log(`
    Car make: ${car.make}
    Car mode: ${car.model}
    Car Engine: Engine type: ${car.engine.type}
                Engine horsepower: ${car.engine.horsepower}
    ${car.year ? `Car year: ${car.year}` : ""}
    `);
}

const bmwObj: Car = {
    make: "BMW",
    model: "X5",
    engine: {
        type: "dizel",
        horsepower: 100
    }
}

const chevroletObj: Car = {
    make: "Chevrolet",
    model: "Camaro",
    engine: {
        type: "Unknown",
        horsepower: 150
    },
    year: 2016,
}

printCarInfo(bmwObj);
printCarInfo(chevroletObj);
//TODO: Задание 2 END


//TODO: Задание 3 START
type Product = {
    name: string;
    price: number;
}

interface CalculateDiscount {
    (product: Product, discount: number): number
}

const product: Product = {
    name: "Product",
    price: 10
}

const calculateDiscount: CalculateDiscount = (product, discount)  => {
    return product.price - discount;
}

console.log("calculateDiscount(product, 5): ", calculateDiscount(product, 5));
//TODO: Задание 3 END


//TODO: Задание 4 START
interface Employee {
    name: string;
    salary: number;
}

const employees: Employee[] = [
    {
        name: "John",
        salary: 10,
    },
    {
        name: "Alice",
        salary: 16,
    },
    {
        name: "Tom",
        salary: 12,
    },
    {
        name: "Merry",
        salary: 18,
    },
    {
        name: "Tony",
        salary: 25,
    }
]

const getEmployeeSalary = (array: Employee[]): number[] => {
    return array.map((el) => {
        return el.salary;
    });
}

console.log("getEmployeeSalary(employees): ", getEmployeeSalary(employees));
//TODO: Задание 4 END


//TODO: Задание 5 START
interface Person {
    firstName: string;
    lastName: string;
}

interface Student extends Person{
    grade: number;
}

const student: Student = {
    firstName: "John",
    lastName: "Doe",
    grade: 15
}

const printStudent = (student: Student): void => {
    console.log(`Name: ${student.firstName} ${student.lastName}\nGrade: ${student.grade}`);
}

printStudent(student);
//TODO: Задание 5 END


//TODO: Задание 6 START
interface ConcatStrings {
    (str1: string, str2: string): string;
}

const concatStrings: ConcatStrings = (str1, str2) => {
    return str1 + str2;
}

console.log("concatStrings(\"Hello\", \"World!\"): ", concatStrings("Hello", "World!"));
//TODO: Задание 6 END

