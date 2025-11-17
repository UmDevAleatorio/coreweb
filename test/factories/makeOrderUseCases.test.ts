import { makeOrderUseCases } from '@/core/factories/makeOrderUseCases';

describe('Factory: makeOrderUseCases', () => {
    it('should create and return all order related use cases', () => {
        const useCases = makeOrderUseCases();

        expect(useCases.createOrder).toBeDefined();
        expect(useCases.findOrdersByUser).toBeDefined();
    });
});