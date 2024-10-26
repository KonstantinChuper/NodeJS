function processStringAsync(str) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(str.toUpperCase()), Math.random() * 1000)
  );
}

async function processArray(strings) {
  const promises = strings.map((str) => processStringAsync(str));
  const results = await Promise.all(promises);
  console.log("Processed results:", results);
}

const stringArray = ["hello", "world", "async", "processing"];
processArray(stringArray);
