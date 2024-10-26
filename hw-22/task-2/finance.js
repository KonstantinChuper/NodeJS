"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Finance = void 0;
var Finance;
(function (Finance) {
    class LoanCalculator {
        static calculateMonthlyPayment(principal, annualRate, years) {
            const monthlyRate = annualRate / 12 / 100;
            const totalMonths = years * 12;
            return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
        }
    }
    Finance.LoanCalculator = LoanCalculator;
    class TaxCalculator {
        static calculateIncomeTax(income, taxRate) {
            return income * (taxRate / 100);
        }
    }
    Finance.TaxCalculator = TaxCalculator;
})(Finance || (exports.Finance = Finance = {}));
