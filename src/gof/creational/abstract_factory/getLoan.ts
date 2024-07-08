import LoanRepository from "./loanRepository";
import InstallmentRepository from "./installmentRepository";
import RepositoryFactory from "./repositoryFactory";

export default class GetLoan {
    loanRepository: LoanRepository;
    installmentRepository: InstallmentRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.loanRepository = this.repositoryFactory.createLoanRepository();
        this.installmentRepository = this.repositoryFactory.createInstallmentRepository();
    }

    async execute(input: Input): Promise<Output> {
     const loan = await this.loanRepository.getById(input.loanId);
     const installments = await this.installmentRepository.listByLoanId(input.loanId);
     const output: Output = {
         amount: loan.amount,
         income: loan.income,
         installments: []
     }
     for (const installment of installments) {
         const {number, amount, amortization, interest, balance} = installment
         output.installments.push({
             number,
             amount,
             amortization,
             interest,
             balance
         })
     }
     return output;
    }
}

type Input = {
    loanId: string
}

type Output = {
    amount: number,
    income: number,
    installments: {
        number: number,
        amount: number,
        amortization: number,
        interest: number,
        balance: number,
    } []
}