export namespace Finance {
  export class LoanCalculator {
    static calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
      const monthlyRate = annualRate / 12 / 100;
      const totalMonths = years * 12;
      return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));
    }
  }

  export class TaxCalculator {
    static calculateIncomeTax(income: number, taxRate: number): number {
      return income * (taxRate / 100);
    }
  }
}
