function firstPromise() {
  return new Promise((resolve) => setTimeout(() => resolve("First result"), 1000));
}

function secondPromise() {
  return new Promise((resolve) => setTimeout(() => resolve("Second result"), 2000));
}

function thirdPromise() {
  return new Promise((resolve) => setTimeout(() => resolve("Third result"), 1500));
}

async function processPromisesSequentially() {
  const result1 = await firstPromise();
  console.log(result1);

  const result2 = await secondPromise();
  console.log(result2);

  const result3 = await thirdPromise();
  console.log(result3);
}

processPromisesSequentially();
