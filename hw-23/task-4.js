function dynamicPromise(time) {
  return new Promise((resolve) => setTimeout(() => resolve(time), time));
}

async function handleDynamicPromises(times) {
  const promises = times.map((time) => dynamicPromise(time));
  const results = await Promise.all(promises);
  console.log("Dynamic Results:", results);
}

const timeArray = [1000, 2000, 1500, 500];
handleDynamicPromises(timeArray);
