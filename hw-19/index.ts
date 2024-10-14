// Задание 1
// Напишите стрелочную функцию `sumEvenNumbers`, которая принимает массив чисел и возвращает сумму всех четных чисел.

const sumEvenNumbers = (arr: number[]): number => {
  return arr.filter((num) => num % 2 === 0).reduce((acc, num) => acc + num, 0);
};

console.log(sumEvenNumbers([1, 2, 3, 4]));

// Задание 2
// Определите интерфейс `StringToBooleanFunction` для функции, которая принимает строку и возвращает `boolean` (например, проверяет, является ли строка пустой). Реализуйте такую функцию.

interface StringToBooleanFunction {
  (str: string): boolean;
}

const isStringEmpty: StringToBooleanFunction = (str) => str === "";

console.log(isStringEmpty(""));

// Задание 3
// Создайте тип `CompareStrings` для функции, принимающей две строки и возвращающей `boolean` (например, для проверки равенства строк). Напишите функцию, соответствующую этому типу.

type CompareStrings = (str1: string, str2: string) => boolean;

const compareStrings: CompareStrings = (str1, str2) => str1 === str2;

console.log(compareStrings("hello", "hello"));

// Задание 4
// Напишите обобщенную функцию `getLastElement`, которая принимает массив любого типа и возвращает последний элемент этого массива.

const getLastElement = <T>(arr: T[]): T => arr[arr.length - 1];

console.log(getLastElement([1, 2, 3, 4]));

// Задание 5
// Создайте обобщенную функцию `make Triple`, которая принимает три аргумента одного типа и возвращает массив из этих трёх элементов.

const makeTriple = <T>(a: T, b: T, c: T): T[] => [a, b, c];

console.log(makeTriple(1, 2, 3));
