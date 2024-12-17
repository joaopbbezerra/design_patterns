import crypto from "crypto"

export default class User {

    //If I want to retrieve from the DB I can use the constructor, if not I can use the static method. That's the advantage
    constructor(readonly userId: string, readonly name: string, readonly email: string, readonly password: string) {}

    static create (name: string, email: string, password: string) {
        const userId = crypto.randomUUID();
        return new User(userId, name, email, password);
    }

    passwordMatches(password: string): boolean {
        return this.password === password;
    }
}