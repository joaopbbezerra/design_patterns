import User from "./User";
import UserRepository, {UserRepositoryMemory} from "./UserRepository";

export default class Signup {
    userRepository: UserRepository;
    //constructor(private readonly userRepository: UserRepository) {
        //This way we create another instance of the class, so it's not the same instance that we've in the login.
        //this.userRepository = new UserRepositoryMemory();
    constructor() {
        this.userRepository = UserRepositoryMemory.getInstance();
    }



    async execute(input: Input): Promise<void> {
        //Instead of using the default constructor we'll use a static factory method, it's an alternative to avoid the constructor, but still represents it
        //Pretty useful when we have different types of constructor.
        const user = User.create(input.name, input.email, input.password);

        //We'll need a repository the persist data since we're using a domain model
        await this.userRepository.save(user);
    }
}

type Input = {
    name: string;
    email: string;
    password: string;
}