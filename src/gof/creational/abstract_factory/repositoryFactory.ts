import InstallmentRepository, {InstallmentRepositoryMemory} from "./installmentRepository";
import LoanRepository, {LoanRepositoryMemory} from "./loanRepository";

//A abstract factory has to be an abstract class or an interface, so it must follow a contract
export default interface RepositoryFactory {
    createLoanRepository(): LoanRepository;
    createInstallmentRepository(): InstallmentRepository;
}

export class RepositoryMemoryFactory implements RepositoryFactory {
    createLoanRepository(): LoanRepository {
        return LoanRepositoryMemory.getInstance();
    }

    createInstallmentRepository(): InstallmentRepository {
        return InstallmentRepositoryMemory.getInstance();
    }

}
