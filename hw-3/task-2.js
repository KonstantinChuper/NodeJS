const fs = require("fs");

fs.writeFile("info.txt", "Node.js is awesome!", (err) => {
  if (err) {
    return console.error("Ошибка при записи в файл:", err);
  }
  console.log('Файл "info.txt" успешно записан.');

  fs.readFile("info.txt", "utf8", (err, data) => {
    if (err) {
      return console.error("Ошибка при чтении файла:", err);
    }
    console.log('Содержимое файла "info.txt":');
    console.log(data);
  });
});
