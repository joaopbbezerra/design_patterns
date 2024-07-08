import InstallmentCalculator, {PriceInstallmentCalculator, SACInstallmentCalculator} from "./installmentCalculator";
import Loan, {MortgageLoan} from "./loan";

export default interface LoanFactory {
    createLoan(amount: number, income: number, installments: number): Loan;
    createInstallmentCalculator(): InstallmentCalculator;
}

export class MortgageLoanFactory implements LoanFactory {

    createLoan(amount: number, income: number, installments: number): Loan {
        return MortgageLoan.create(amount, income, installments)
    }

    createInstallmentCalculator(): InstallmentCalculator {
        return new SACInstallmentCalculator()
    }
}

export class CarLoanFactory implements LoanFactory {

    createLoan(amount: number, income: number, installments: number): Loan {
        return MortgageLoan.create(amount, income, installments)
    }

    createInstallmentCalculator(): InstallmentCalculator {
        return new PriceInstallmentCalculator()
    }
}