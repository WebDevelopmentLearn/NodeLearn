
namespace Finance {

    export class LoanCalculator {
        private readonly loanAmount: number;
        private readonly annualInterestRate: number;
        private readonly loanPeriod: number;

        constructor(loanAmount: number, annualInterestRate: number, loanPeriod: number) {
            this.loanAmount = loanAmount;
            this.annualInterestRate = annualInterestRate;
            this.loanPeriod = loanPeriod;
        }

        /**
         * Рассчитывает ежемесячный платёж по кредиту
         * @author ChatGPT
         */
        calculateMonthlyPayment() {
            const monthlyInterestRate = this.annualInterestRate / 100 / 12;
            const numberOfPayments = this.loanPeriod * 12;

            // Формула аннуитета
            const monthlyPayment = this.loanAmount *
                (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

            return monthlyPayment.toFixed(2); // Возвращаем округлённый результат
        }
    }

    export class TaxCalculator  {
        private readonly income: number;
        constructor(income: number) {
            this.income = income;
        }

        /**
         * Рассчитывает налог на доходы физических лиц в зависимости от уровня дохода
         * @author ChatGPT
         */
        calculateTax() {
            let tax = 0;

            if (this.income <= 50000) {
                tax = this.income * 0.10; // 10% налог
            } else if (this.income <= 100000) {
                tax = 50000 * 0.10 + (this.income - 50000) * 0.15; // 10% на первые 50,000, 15% на остаток
            } else {
                tax = 50000 * 0.10 + 50000 * 0.15 + (this.income - 100000) * 0.20; // Прогрессивная шкала
            }

            return tax.toFixed(2); // Округляем налог
        }

    }
}

export default Finance;