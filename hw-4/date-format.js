const moment = require("moment");

const now = moment();

const format1 = now.format("DD-MM-YYYY");
console.log("Формат DD-MM-YYYY:", format1);

const format2 = now.format("MMM Do YY");
console.log("Формат MMM Do YY:", format2);

const format3 = now.format("dddd");
console.log("Формат dddd (день недели):", format3);
