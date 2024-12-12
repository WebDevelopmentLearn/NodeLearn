//TODO: Задание 1 START
console.log("//=============================//");
console.log("Задание 1");

abstract class Animal {
    abstract name: string;
    abstract species: string;


    abstract makeSound(): void;
}

class Dog extends Animal {
    public breed: string;
    name: string;
    species: string;
    constructor(name: string, breed: string) {
        super();
        this.name = name;
        this.species = "Dog";
        this.breed = breed;
    }

    makeSound() {
        console.log("The dog barks");
    }
}

class Cat extends Animal {
    public breed: string;
    name: string;
    species: string;
    constructor(name: string, breed: string) {
        super();
        this.name = name;
        this.species = "Cat";
        this.breed = breed;
    }

    makeSound() {
        console.log("The cat meows");
    }
}
const cat = new Cat("Tom", "Siamese");
const dog = new Dog("Rex", "German Shepherd");

const animals: Animal[] = [cat, dog];

animals.forEach((animal) => {
    console.log("animal: ", animal);
    animal.makeSound();
    console.log("");
});


console.log("//=============================//");
//TODO: Задание 1 END


//TODO: Задание 2 START
console.log("//=============================//");
console.log("Задание 2");

abstract class Shape {
    abstract name: string;

    abstract calculateArea(): number;

}

abstract class ColoredShape extends Shape {
    abstract color: string;
}

class ColoredCircle extends ColoredShape {
    color: string;
    name: string = "ColoredCircle";
    radius: number;

    constructor(color: string, radius: number) {
        super();
        this.color = color;
        this.radius = radius;
    }

    calculateArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }

}

class ColoredRectangle extends ColoredShape {
    color: string;
    name: string = "ColoredRectangle";
    width: number;
    height: number;

    constructor(color: string, width: number, height: number) {
        super();
        this.color = color;
        this.width = width;
        this.height = height;
    }

    calculateArea(): number {
        return this.width * this.height;
    }

}

const coloredCircle = new ColoredCircle("red", 5);
console.log("coloredCircle", coloredCircle);
coloredCircle.calculateArea();
console.log("coloredCircle.calculateArea(): ", coloredCircle.calculateArea());

console.log("");

const coloredRectangle = new ColoredRectangle("blue", 5, 10);
console.log("coloredRectangle", coloredRectangle);
console.log("coloredRectangle.calculateArea(): ", coloredRectangle.calculateArea());
console.log("//=============================//");
//TODO: Задание 2 END


//TODO: Задание 3 START
console.log("//=============================//");
console.log("Задание 3");

abstract class Appliance {

    abstract turnOn(): void;
    abstract turnOff(): void;
}

class WashingMachine extends Appliance {

    turnOff(): void {
        console.log("WashingMachine is disable");
    }

    turnOn(): void {
        console.log("WashingMachine is enable");
    }
}

class Refrigerator extends Appliance {

    turnOff(): void {
        console.log("Refrigerator is disable");
    }

    turnOn(): void {
        console.log("Refrigerator is enable");
    }
}

const washingMachine = new WashingMachine();
console.log("washingMachine: ", washingMachine);
washingMachine.turnOn();
washingMachine.turnOff();

console.log("");

const refrigerator = new Refrigerator();
console.log("refrigerator: ", refrigerator);
refrigerator.turnOn();
refrigerator.turnOff();

console.log("//=============================//");
//TODO: Задание 3 END


//TODO: Задание 4 START
console.log("//=============================//");
console.log("Задание 4");

abstract class Account {

    abstract deposit(amount: number): number;

    abstract withdraw(amount: number): number;

}

class SavingsAccount extends Account {
    private balance: number;
    constructor(balance: number) {
        super();
        this.balance = balance;
    }
    deposit(amount: number): number {
        return this.balance += amount;
    }

    withdraw(amount: number): number {
        return this.balance -= amount;
    }

}


class CheckingAccount extends Account {
    private balance: number;
    constructor(balance: number) {
        super();
        this.balance = balance;
    }

    deposit(amount: number): number {
        return this.balance += amount;
    }

    withdraw(amount: number): number {
        return this.balance -= amount;
    }
}

const savingsAccount = new SavingsAccount(1000);
console.log("savingsAccount: ", savingsAccount);
console.log("savingsAccount.deposit(10): ", savingsAccount.deposit(10));
console.log("savingsAccount.withdraw(50): ", savingsAccount.withdraw(50));

console.log("");

const checkingAccount = new CheckingAccount(1000);
console.log("checkingAccount: ", checkingAccount);
console.log("checkingAccount.deposit(10): ", checkingAccount.deposit(10));
console.log("checkingAccount.withdraw(50): ", checkingAccount.withdraw(50));

console.log("//=============================//");
//TODO: Задание 4 END




//TODO: Задание 5 START
console.log("//=============================//");
console.log("Задание 5");

abstract class Media {

    abstract play(): void;

}


class MyAudio extends Media {

    play(): void {
        console.log("Playing audio");
    }

}

class Video extends Media {

    play(): void {
        console.log("Playing video");
    }

}

const media: Media[] = [new MyAudio(), new Video()];

media.forEach((obj) => {
    console.log("media: ", obj);
    obj.play();
    console.log("");
})


console.log("//=============================//");
//TODO: Задание 5 END