import { MockUserRepository } from '@infra/mocks/MockUserRepository';
import { User } from '@domain/entities/User';
import { Name, Email, Password } from '@domain/value-objects';

describe('MockUserRepository', () => {
    it('should not throw when updating a non-existent user', async () => {
        const userRepository = MockUserRepository.getInstance();
        const user = User.create(
            'non-existent-id',
            Name.create('Lazinho'),
            Email.create('lazinho@example.com'),
            Password.create('Valid@Pass123'),
        );

        await expect(userRepository.update(user)).resolves.not.toThrow();
    });
});