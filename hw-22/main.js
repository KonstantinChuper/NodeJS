"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//task-1
const stringUtils_1 = require("./task-1/stringUtils");
console.log((0, stringUtils_1.capitalize)("hello"));
console.log((0, stringUtils_1.reverseString)("hello"));
//task-2
const finance_1 = require("./task-2/finance");
const loanPayment = finance_1.Finance.LoanCalculator.calculateMonthlyPayment(10000, 5, 3);
console.log("Monthly Loan Payment:", loanPayment);
const tax = finance_1.Finance.TaxCalculator.calculateIncomeTax(50000, 20);
console.log("Income Tax:", tax);
//task-3
const userManagement_1 = require("./task-3/userManagement");
const admin = new userManagement_1.UserManagement.Admin.AdminUser("User", "user@mail.com");
console.log("Admin Status:", admin.isSuperAdmin);
admin.setSuperAdminStatus(true);
console.log("Updated Admin Status:", admin.isSuperAdmin);
//task-4
const sequenceUtils_1 = require("./task-4/sequenceUtils");
console.log("Fibonacci Sequence up to 100:", (0, sequenceUtils_1.generateFibonacci)(100));
console.log("Prime Numbers up to 100:", (0, sequenceUtils_1.generatePrimeNumbers)(100));
