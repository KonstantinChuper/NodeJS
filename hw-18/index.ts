// Задание 1
// Объединение и пересечение типов
// Создайте два типа: `Admin` и `User`.
// Тип `Admin` должен включать поля `name` (строка) и `permissions` (массив строк), а тип `User` должен включать поля `name` (строка) и `email` (строка).
// Создайте тип `AdminUser`, который объединяет свойства обоих типов, и создайте объект этого типа.

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
  name: "John",
  permissions: ["read", "write"],
  email: "test@mail.com",
};

// Задание 2
// Вложенные объекты и опциональные поля
// Создайте объект `Car` с полями `make` (строка), `model` (строка), и вложенным объектом `engine`, который имеет поля `type` (строка) и `horsepower` (число).
// Добавьте опциональное поле `year` (число) для года выпуска машины.
// Напишите функцию, которая выводит информацию о машине.

type Car = {
  make: string;
  model: string;
  engine: {
    type: string;
    horsepower: number;
  };
  year?: number;
};

const car: Car = {
  make: "BMW",
  model: "X5",
  engine: {
    type: "V8",
    horsepower: 400,
  },
  year: 2021,
};

function getCarInfo(car: Car): void {
  console.log(
    `Car info: ${car.make} ${car.model} ${car.engine.type} ${car.engine.horsepower} ${
      car.year ? car.year : ""
    }`
  );
}

getCarInfo(car);

// Задание 3
// Интерфейс для функции с объектом
// Создайте интерфейс для функции `calculateDiscount`, которая принимает объект `Product` с полями `name` (строка) и `price` (число), а также параметр `discount` (число).
// Функция должна возвращать новую цену продукта с учетом скидки.

interface Product {
  name: string;
  price: number;
}

function calculateDiscount(product: Product, discount: number): number {
  return product.price - product.price * discount;
}

const product: Product = {
  name: "Laptop",
  price: 1000,
};

console.log(calculateDiscount(product, 0.1));

// Задание 4
// Массив объектов и функции
// Создайте интерфейс `Employee`, который включает поля `name` (строка) и `salary` (число).
// Создайте массив объектов `Employee`, затем напишите функцию, которая принимает этот массив и возвращает массив зарплат всех сотрудников.

interface Employee {
  name: string;
  salary: number;
}

const employees: Employee[] = [
  { name: "John", salary: 1000 },
  { name: "Jane", salary: 1500 },
  { name: "Mike", salary: 2000 },
];

function getSalaries(employees: Employee[]): number[] {
  return employees.map((employee) => employee.salary);
}

console.log(getSalaries(employees));

// Задание 5
// Наследование интерфейсов и работа с объектами
// Создайте интерфейс `Person` с полями `firstName` (строка) и `lastName` (строка).
// Создайте интерфейс `Student`, который наследует `Person` и добавляет поле `grade` (число).
// Создайте объект `student` этого типа и напишите функцию, которая выводит полное имя студента и его оценку.

interface Person {
  firstName: string;
  lastName: string;
}

interface Student extends Person {
  grade: number;
}

const student: Student = {
  firstName: "John",
  lastName: "Doe",
  grade: 5,
};

function getStudentInfo(student: Student): void {
  console.log(
    `Student: ${student.firstName} ${student.lastName}, grade: ${student.grade}`
  );
}

getStudentInfo(student);

// Задание 6
// Интерфейс для функции с несколькими параметрами
// Создайте интерфейс для функции `concatStrings`, которая принимает два параметра: `str1` и `str2` (оба строки) и возвращает их объединение.
// Реализуйте эту функцию и протестируйте её.

interface ConcatStrings {
  (str1: string, str2: string): string;
}

const concatStrings: ConcatStrings = (str1, str2) => str1 + str2;

console.log(concatStrings("Hello", "World"));
