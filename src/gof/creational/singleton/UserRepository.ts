import User from "./User";


//Steps to make it into a singleton:
export default interface UserRepository {
    save (user: User): Promise<void>;
    getByEmail(email: string): Promise<User>;
}

export class UserRepositoryMemory implements UserRepository {
    private users: User[];

    // 1 - Static variables define a property in the class and we'll only have one reference for this class.
    private static instance: UserRepositoryMemory;

    // 2 - We'll make the constructor private, to avoid us from creating new instances of this class
    private constructor() {
        this.users = [];
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async getByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);
        if (!user) {
            throw new Error('User not find!')
        }
        return user;
    }

    // 3 - Static method to get the instance of the class. This way we can use the same instance across the application.
    static getInstance() {
        if (!UserRepositoryMemory.instance) {
            UserRepositoryMemory.instance = new UserRepositoryMemory();
        }
        return UserRepositoryMemory.instance;
    }
}