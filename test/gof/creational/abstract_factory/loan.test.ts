import {CarLoan, MortgageLoan} from "../../../../src/gof/creational/abstract_factory/loan";

test("Should create a mortgage loan", () => {
    const loan = MortgageLoan.create(100000, 10000, 240);

    expect(loan.loanId).toBeDefined();
    expect(loan.amount).toBe(100000)
    expect(loan.income).toBe(10000)
    expect(loan.installments).toBe(240)
})

test("Should not have a mortgage loan higher than 420 months", () => {
    expect(() => MortgageLoan.create(100000, 10000, 450)).toThrow(new Error("The maximum number of installments for mortgage loan is 420"))
})

test("Should not create a mortgage loan when the installments value is higher than 25% of monthly income", () => {
    expect(() => MortgageLoan.create(200000, 1000, 420)).toThrow(new Error("The installment amount could not exceed 25% of monthly income"))
})

test("Should not create a vehicle loan higher than 60 months", () => {
    expect(() => CarLoan.create(200000, 1000, 72)).toThrow(new Error("The maximum number of installments for mortgage loan is 60"))
})

test("Should not create a mortgage loan when the installments value is higher than 30% of monthly income", () => {
    expect(() => CarLoan.create(20000, 1000, 60)).toThrow(new Error("The installment amount could not exceed 25% of monthly income"))
})