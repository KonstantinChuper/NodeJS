const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();
const filename = process.env.FILENAME;

fs.writeFile(filename, "This text was written to file", (err) => {
  if (err) {
    console.log("Error writting to file: ", err);
  }
  console.log(`File ${filename} was successfully created`);
});

fs.readFile(filename, "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file: ", err);
  }
  console.log(data);
});
