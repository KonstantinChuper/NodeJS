// Задание 1
// Абстрактный класс Animal
// Создайте абстрактный класс `Animal` с абстрактным методом `makeSound()`.
// Затем создайте классы `Dog` и `Cat`, которые наследуют `Animal` и реализуют метод `makeSound()` по-своему (`Dog` должен возвращать "Bark", а `Cat` — "Meow").
// Создайте массив типа `Animal[]`, включающий объекты `Dog` и `Cat`, и вызовите метод `makeSound()` для каждого элемента массива.

class Animal {
  makeSound() {
    throw new Error("This method must be implemented");
  }
}

class Dog extends Animal {
  makeSound() {
    return "Bark";
  }
}

class Cat extends Animal {
  makeSound() {
    return "Meow";
  }
}

const animals = [new Dog(), new Cat()];

animals.forEach((animal) => {
  console.log(animal.makeSound());
});

// Задание 2
// Абстрактный класс Shape с цветом
// Создайте абстрактный класс `ColoredShape`, который наследует `Shape` (из задания 4 на уроке) и добавляет абстрактное поле `color`.
// Реализуйте классы `ColoredCircle` и `ColoredRectangle`, которые наследуют `ColoredShape`, задают `color` и реализуют метод `calculateArea()`.
// Выведите площадь и цвет для каждого объекта.

class Shape {
  calculateArea() {
    throw new Error("This method must be implemented");
  }
}

class ColoredShape extends Shape {
  constructor(color) {
    super();
    this.color = color;
  }
}

class ColoredCircle extends ColoredShape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  calculateArea() {
    return Math.PI * this.radius ** 2;
  }
}

class ColoredRectangle extends ColoredShape {
  constructor(color, width, height) {
    super(color);
    this.width = width;
    this.height = height;
  }

  calculateArea() {
    return this.width * this.height;
  }
}

const shapes = [new ColoredCircle("red", 5), new ColoredRectangle("blue", 10, 20)];

shapes.forEach((shape, index) => {
  console.log(
    `Area of object ${index + 1}: ${shape.calculateArea()}, Color of object ${
      index + 1
    }: ${shape.color}`
  );
});

// Задание 3
// Абстрактный класс Appliance
// Создайте абстрактный класс `Appliance` с абстрактными методами `turnOn()` и `turnOff()`.
// Затем создайте классы `WashingMachine` и `Refrigerator`, которые наследуют `Appliance` и реализуют методы `turnOn()` и `turnOff()`, выводя соответствующие сообщения.
// Создайте массив типа `Appliance[]`, добавьте в него объекты `WashingMachine` и `Refrigerator`, и вызовите методы `turnOn()` и `turnOff()` для каждого элемента.

class Appliance {
  turnOn() {
    throw new Error("This method must be implemented");
  }

  turnOff() {
    throw new Error("This method must be implemented");
  }
}

class WashingMachine extends Appliance {
  turnOn() {
    console.log("Washing machine is turned on");
  }

  turnOff() {
    console.log("Washing machine is turned off");
  }
}

class Refrigerator extends Appliance {
  turnOn() {
    console.log("Refrigerator is turned on");
  }

  turnOff() {
    console.log("Refrigerator is turned off");
  }
}

const appliances = [new WashingMachine(), new Refrigerator()];

appliances.forEach((appliance) => {
  appliance.turnOn();
  appliance.turnOff();
});

// Задание 4
// Абстрактный класс Account
// Создайте абстрактный класс `Account` с абстрактными методами `deposit(amount: number)` и `withdraw(amount: number)`.
// Реализуйте классы `SavingsAccount` и `CheckingAccount`, которые наследуют `Account`.
// В классе `SavingsAccount` добавьте логику для начисления процентов на остаток.
// В классе `CheckingAccount` реализуйте снятие средств с учетом комиссии.
// Проверьте работу методов на объектах обоих классов.

class Account {
  deposit() {
    throw new Error("This method must be implemented");
  }

  withdraw() {
    throw new Error("This method must be implemented");
  }
}

class SavingsAccount extends Account {
  constructor(balance, interestRate) {
    super();
    this.balance = balance;
    this.interestRate = interestRate;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    this.balance -= amount;
  }

  addInterest() {
    this.balance += this.balance * this.interestRate;
  }
}

class CheckingAccount extends Account {
  constructor(balance, commission) {
    super();
    this.balance = balance;
    this.commission = commission;
  }

  deposit(amount) {
    this.balance += amount;
  }

  withdraw(amount) {
    this.balance -= amount + this.commission;
  }
}

const savingsAccount = new SavingsAccount(1000, 0.1);
savingsAccount.deposit(100);
console.log(savingsAccount.balance);

savingsAccount.addInterest();
console.log(savingsAccount.balance);

const checkingAccount = new CheckingAccount(1000, 10);
checkingAccount.deposit(100);
console.log(checkingAccount.balance);

checkingAccount.withdraw(50);
console.log(checkingAccount.balance);

// Задание 5
// Абстрактный класс Media
// Создайте абстрактный класс `Media` с абстрактным методом `play()`.
// Затем создайте классы `Audio` и `Video`, которые наследуют `Media` и реализуют метод `play()` по-своему (например, `Audio` выводит "Playing audio", а `Video` — "Playing video").
// Создайте массив типа `Media[]`, включающий объекты `Audio` и `Video`, и вызовите метод `play()` для каждого элемента массива.

class Media {
  play() {
    throw new Error("This method must be implemented");
  }
}

class Audio extends Media {
  play() {
    console.log("Playing audio");
  }
}

class Video extends Media {
  play() {
    console.log("Playing video");
  }
}

const media = [new Audio(), new Video()];

media.forEach((media) => {
  media.play();
});
