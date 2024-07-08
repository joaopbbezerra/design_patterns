import crypto from "crypto"

export default abstract class Loan {
    abstract rate: number;

    constructor(readonly loanId: string, readonly amount: number, readonly income: number, readonly installments: number, readonly type: string) {}

    static create (amount: number, income: number, installments: number) {
        throw new Error("This method is abstract")
    } //It's static because it doesnt have an instance, it will create one
}

export class MortgageLoan extends Loan {
    rate = 10;

    constructor(loanId: string, amount: number, income: number, installments: number) {
        super(loanId, amount, income, installments, "mortgage");
        if (installments > 420) {
            throw new Error("The maximum number of installments for mortgage loan is 420")
        }
        if ((income * 0.25) < (amount/installments)) {
            throw new Error("The installment amount could not exceed 25% of monthly income")
        }
    }

    //The factory methods works by giving us an alternative to the constructor.

    static create (amount: number, income: number, installments: number) {
        const loadId = crypto.randomUUID();
        return new MortgageLoan(loadId, amount, income, installments)
    }
}

export class CarLoan extends Loan {
    rate = 15;

    constructor(loanId: string, amount: number, income: number, installments: number) {
        super(loanId, amount, income, installments, "mortgage");
        if (installments > 60) {
            throw new Error("The maximum number of installments for mortgage loan is 60")
        }
        if ((income * 0.30) < (amount/installments)) {
            throw new Error("The installment amount could not exceed 25% of monthly income")
        }
    }

    static create (amount: number, income: number, installments: number) {
        const loadId = crypto.randomUUID();
        return new CarLoan(loadId, amount, income, installments)
    }
}