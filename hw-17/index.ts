// Задание 1
// Напишите функцию `calculateTotal`, которая принимает три параметра:
// `price` (число)
// `quantity` (число)
// `discount` (число, по умолчанию равен 0)
// Функция должна возвращать общую стоимость товаров с учетом скидки. Если скидка не указана, она считается равной нулю.

function calculateTotal(price: number, quantity: number, discount: number = 0): number {
  return price * quantity * (1 - discount / 100);
}
console.log(calculateTotal(100, 2, 10));

// Задание 2
// Использование Union типов
// Создайте переменную `id`, которая может быть либо строкой, либо числом.
// Напишите функцию `displayId`, которая принимает эту переменную и выводит сообщение, содержащее значение ID. Если `id` — строка, выведите её в верхнем регистре. Если `id` — число, умножьте его на 10 перед выводом.

let id: string | number = "123";
function displayId(id: string | number): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id * 10);
  }
}
displayId(id);

// Задание 3
// Объявление и типизация массивов объектов
// Создайте массив объектов `orders`, где каждый объект описывает заказ и содержит следующие свойства:
// `orderId` (строка)
// `amount` (число)
// `status` (строка, может принимать значения "pending", "shipped" или "delivered")
// Напишите функцию `filterOrdersByStatus`, которая принимает этот массив и строку `status`, и возвращает массив заказов, соответствующих указанному статусу.

type Order = {
  orderId: string;
  amount: number;
  status: "pending" | "shipped" | "delivered";
};

let orders: Order[] = [
  { orderId: "1", amount: 100, status: "pending" },
  { orderId: "2", amount: 200, status: "shipped" },
  { orderId: "3", amount: 300, status: "delivered" },
  { orderId: "4", amount: 400, status: "pending" },
  { orderId: "5", amount: 500, status: "shipped" },
];

function filterOrdersByStatus(
  orders: Order[],
  status: "pending" | "shipped" | "delivered"
): Order[] {
  return orders.filter((order) => order.status === status);
}

console.log(filterOrdersByStatus(orders, "pending"));

// Задание 4
// Работа с кортежами и объектами
// Создайте кортеж `productInfo`, который содержит:  
// название товара (строка)  
// его цену (число)  
// количество на складе (число)
// Напишите функцию `updateStock`, которая принимает объект `inventory` (где ключ — это название товара, а значение — количество на складе) и кортеж `productInfo`, обновляет количество товара в объекте `inventory` и возвращает обновленный объект.

type ProductInfo = [string, number, number];
let productInfo: ProductInfo = ["apple", 100, 10];

type Inventory = Record<string, number>;
let inventory: Inventory = {
  apple: 10,
  banana: 20,
};

function updateStock(inventory: Inventory, productInfo: ProductInfo): Inventory {
  let [productName, quantity] = productInfo;
  inventory[productName] = quantity;
  return inventory;
}

console.log(updateStock(inventory, productInfo));