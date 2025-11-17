import { makeProductUseCases } from '@/core/factories/makeProductUseCases';

describe('Factory: makeProductUseCases', () => {
    it('should create and return all product related use cases', () => {
        const useCases = makeProductUseCases();

        expect(useCases.findAllProducts).toBeDefined();
        expect(useCases.findProductById).toBeDefined();
    });
});