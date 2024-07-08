import Loan from "./loan";

export default interface LoanRepository {
    save(loan: Loan): Promise<void>;
    getById(loanId: string): Promise<Loan>
}

export class LoanRepositoryMemory implements LoanRepository {
    loans: Loan[];
    static instance: LoanRepository
    //We need that as a singleton, so we'll create an static instance of it and use an static getInstance to get it
    //We need to make the constructor private so we can't create separate instances
    private constructor() {
        this.loans = [];
    }

    async save(loan: Loan): Promise<void> {
        this.loans.push(loan);
    }

    async getById(loanId: string): Promise<Loan> {
        const loan = this.loans.find((loan: Loan) => loan.loanId === loanId)
        if (!loan) {
            throw new Error("Loan not found")
        }
        return loan;
    }

    static getInstance() {
        if (!LoanRepositoryMemory.instance) {
            LoanRepositoryMemory.instance = new LoanRepositoryMemory();
        }
        return LoanRepositoryMemory.instance;
    }
}