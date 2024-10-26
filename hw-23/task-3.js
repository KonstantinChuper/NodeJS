function promiseWithError() {
  return new Promise((_, reject) => setTimeout(() => reject("Intentional Error"), 1500));
}

function promiseSuccess1() {
  return new Promise((resolve) => setTimeout(() => resolve("Success 1"), 1000));
}

function promiseSuccess2() {
  return new Promise((resolve) => setTimeout(() => resolve("Success 2"), 500));
}

async function handlePromisesWithError() {
  try {
    const results = await Promise.all([promiseSuccess1(), promiseSuccess2(), promiseWithError()]);
    console.log("All Promises Resolved:", results);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

handlePromisesWithError();
