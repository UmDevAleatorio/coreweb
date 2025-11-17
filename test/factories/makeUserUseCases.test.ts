import { makeUserUseCases } from '@/core/factories/makeUserUseCases';

describe('Factory: makeUserUseCases', () => {
    it('should create and return all user related use cases', () => {
        const useCases = makeUserUseCases();

        expect(useCases.registerUser).toBeDefined();
        expect(useCases.loginUser).toBeDefined();
    });
});