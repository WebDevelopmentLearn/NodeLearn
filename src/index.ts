//TODO: Задание 1 START
console.log("//=============================//");
console.log("Задание 1");

class Animal {
    name: string;
    species: string;
    constructor(name: string, species: string) {
        this.name = name;
        this.species = species;
    }

    sound(): void {
        console.log("The animal makes a sound");
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name, "Dog");
        this.breed = breed;
    }

    sound(): void {
        console.log("The dog barks");
    }
}

const animal = new Animal("Animal", "Unknown");
console.log("animal: ", animal);
animal.sound();

console.log("");

const dog = new Dog("Rex", "German Shepherd");
console.log("dog: ", dog);
dog.sound();

console.log("//=============================//");
//TODO: Задание 1 END


//TODO: Задание 2 START
console.log("//=============================//");
console.log("Задание 2");

class Library {
    static totalBooks: number = 0;
    constructor() {
        Library.totalBooks++;
    }

    static addBook(): void {
        Library.totalBooks++;
    }
}

console.log("Library.totalBooks: ", Library.totalBooks);
for (let i = 0; i < 10; i++) {
    Library.addBook();
}
console.log("Library.totalBooks: ", Library.totalBooks);

console.log("//=============================//");
//TODO: Задание 2 END


//TODO: Задание 3 START
console.log("//=============================//");
console.log("Задание 3");
class Vehicle {
    make: string;
    model: string;

    constructor(make: string, model: string) {
        this.make = make;
        this.model = model;
    }

}

class Motorcycle extends Vehicle {
    type: string;
    constructor(make: string, model: string, type: string) {
        super(make, model);
        this.type = type;
    }
}

const vehicle = new Vehicle("Toyota", "Corolla");
console.log("vehicle: ", vehicle);

console.log("");

const motorcycle = new Motorcycle("Yamaha", "FZ6", "Sport");
console.log("motorcycle: ", motorcycle);

console.log("//=============================//");
//TODO: Задание 3 END


