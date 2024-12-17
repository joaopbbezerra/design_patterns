import Login from "../../../../src/gof/creational/singleton/Login";
import Signup from "../../../../src/gof/creational/singleton/Signup";

test('Should create an user account', async () => {

    //Using it like that the problem of having 2 instances is fixed because the dependency inversion principle solves this problem.
    //But it's not what we're aiming since we're studying singletons
/*    const userRepository = new UserRepositoryMemory();
    const signup = new Signup(userRepository);
    const login = new Login(userRepository);*/

    const signup = new Signup();
    const login = new Login()
    const inputSignup = {
        name: "Jonh Doe",
        email: "jonh.doe@gmail.com",
        password: "password123"
    }
    await signup.execute(inputSignup);
    const inputLogin = {
        email: "jonh.doe@gmail.com",
        password: "password123"
    }
    const outputLogin = await login.execute(inputLogin);
    expect(outputLogin.success).toBe(true);
})