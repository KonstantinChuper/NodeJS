//task-1
import { capitalize, reverseString } from "./task-1/stringUtils";

console.log(capitalize("hello"));
console.log(reverseString("hello"));

//task-2
import { Finance } from "./task-2/finance";

const loanPayment = Finance.LoanCalculator.calculateMonthlyPayment(10000, 5, 3);
console.log("Monthly Loan Payment:", loanPayment);

const tax = Finance.TaxCalculator.calculateIncomeTax(50000, 20);
console.log("Income Tax:", tax);

//task-3
import { UserManagement } from "./task-3/userManagement";

const admin = new UserManagement.Admin.AdminUser("User", "user@mail.com");
console.log("Admin Status:", admin.isSuperAdmin);

admin.setSuperAdminStatus(true);
console.log("Updated Admin Status:", admin.isSuperAdmin);

//task-4
import { generateFibonacci, generatePrimeNumbers } from "./task-4/sequenceUtils";

console.log("Fibonacci Sequence up to 100:", generateFibonacci(100));
console.log("Prime Numbers up to 100:", generatePrimeNumbers(100));