const fs = require("fs");

fs.mkdir("myFolder", (err) => {
  if (err) {
    return console.error("Ошибка при создании каталога:", err);
  }
  console.log('Каталог "myFolder" успешно создан.');

  fs.rmdir("myFolder", (err) => {
    if (err) {
      return console.error("Ошибка при удалении каталога:", err);
    }
    console.log('Каталог "myFolder" успешно удален.');
  });
});
