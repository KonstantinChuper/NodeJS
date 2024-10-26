"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = capitalize;
exports.reverseString = reverseString;
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function reverseString(str) {
    return str.split("").reverse().join("");
}
