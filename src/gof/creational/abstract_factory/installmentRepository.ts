import Installment from "./installment";

export default interface InstallmentRepository {
    save(installment: Installment): Promise<void>;
    listByLoanId(loanId: string): Promise<Installment[]>
}

export class InstallmentRepositoryMemory implements InstallmentRepository {
    installments: Installment[];
    static instance: InstallmentRepository;

    private constructor() {
        this.installments = [];
    }

    async save(installment: Installment): Promise<void> {
        this.installments.push(installment);
    }

    async listByLoanId(loanId: string): Promise<Installment[]> {
        const loan = this.installments.filter((installment: Installment) => installment.loanId === loanId)
        if (!loan) {
            throw new Error("Installments not found for loan")
        }
        return loan;
    }


    static getInstance() {
        if (!InstallmentRepositoryMemory.instance) {
            InstallmentRepositoryMemory.instance = new InstallmentRepositoryMemory();
        }
        return InstallmentRepositoryMemory.instance;
    }
}