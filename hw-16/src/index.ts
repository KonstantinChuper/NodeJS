// 1. Функция приветствия
function greetUser(name: string): void {
  console.log(`Привет, ${name}!`);
}

// 2. Типизация функции с объектом в качестве параметра
interface Person {
  name: string;
  age: number;
  city: string;
}

function printPersonInfo(person: Person): void {
  console.log(`Имя: ${person.name}, Возраст: ${person.age}, Город: ${person.city}`);
}

// 3. Простая типизация для числового параметра
function squareNumber(num: number): number {
  return num * num;
}

// 4. Типизация функции с boolean
function isEven(num: number): boolean {
  return num % 2 === 0;
}

// 5. Создание интерфейса для объекта
interface Student {
  name: string;
  grade: number;
}

function printStudentInfo(student: Student): void {
  console.log(`Студент: ${student.name}, Оценка: ${student.grade}`);
}

// 6. Функция с типом `void`
function logMessage(message: string): void {
  console.log(message);
}
