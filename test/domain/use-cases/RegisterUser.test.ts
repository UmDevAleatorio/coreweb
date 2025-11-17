import { RegisterUser } from '@domain/use-cases/RegisterUser';
import { MockUserRepository } from '@infra/mocks/MockUserRepository';

describe('Use Case: RegisterUser', () => {
    const userRepository = MockUserRepository.getInstance();

    beforeEach(() => {
        userRepository.reset();
    });

    it('should register a new user successfully', async () => {
        const registerUser = new RegisterUser(userRepository);
        const userData = {
            name: 'Lazinho',
            email: 'lazinho@example.com',
            password: 'Password@123'
        };

        const user = await registerUser.execute(userData);

        expect(user).toBeDefined();
        expect(user.name.value).toBe(userData.name);
        
        const foundUser = await userRepository.findByEmail(userData.email);
        expect(foundUser).toEqual(user);
    });

    it('should throw an error if email is already in use', async () => {
        const registerUser = new RegisterUser(userRepository);
        const userData = {
            name: 'Lazinho',
            email: 'lazinho@example.com',
            password: 'Password@123'
        };
        await registerUser.execute(userData);

        await expect(registerUser.execute({
             name: 'Lázaro',
             email: 'lazinho@example.com',
             password: 'Password@456'
        })).rejects.toThrow('Este e-mail já está em uso.');
    });
});