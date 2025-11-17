import { LoginUser } from '@domain/use-cases/LoginUser';
import { RegisterUser } from '@domain/use-cases/RegisterUser';
import { MockUserRepository } from '@infra/mocks/MockUserRepository';

describe('Use Case: LoginUser', () => {
    const userRepository = MockUserRepository.getInstance();
    const registerUser = new RegisterUser(userRepository);
    const loginUser = new LoginUser(userRepository);
    
    beforeEach(() => {
        userRepository.reset();
    });

    it('should login a user with valid credentials', async () => {
        const userData = {
            name: 'Lazinho',
            email: 'lazinho@example.com',
            password: 'Password@123'
        };
        await registerUser.execute(userData);

        const user = await loginUser.execute({ email: userData.email, password: userData.password });

        expect(user).toBeDefined();
        expect(user.email.value).toBe(userData.email);
    });

    it('should throw an error for a non-existent user', async () => {
        await expect(loginUser.execute({
            email: 'nonexistent@example.com',
            password: 'Password@123'
        })).rejects.toThrow('E-mail ou senha inválidos.');
    });

    it('should throw an error for an incorrect password', async () => {
        const userData = {
            name: 'Lazinho',
            email: 'lazinho@example.com',
            password: 'Password@123'
        };
        await registerUser.execute(userData);

        await expect(loginUser.execute({
            email: userData.email,
            password: 'wrongpassword'
        })).rejects.toThrow('E-mail ou senha inválidos.');
    });
});