import UserRepository, {UserRepositoryMemory} from "./UserRepository";

export default class Login {
    userRepository: UserRepository;
    //constructor(private readonly userRepository: UserRepository) {
    //This way we create another instance of the class, so it's not the same instance that we've in the login.
    //this.userRepository = new UserRepositoryMemory();
    constructor() {
        this.userRepository = UserRepositoryMemory.getInstance();
    }




    async execute(input: Input): Promise<Output> {
        const user = await this.userRepository.getByEmail(input.email)
        let success = false;
        if (user) {
            success = user.passwordMatches(input.password)
        }
        return {
            success
        }
    }
}

type Input = {
    email: string;
    password: string;
}

type Output = {
    success: boolean;
}