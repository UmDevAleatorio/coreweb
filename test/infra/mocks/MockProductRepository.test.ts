import { MockProductRepository } from '@infra/mocks/MockProductRepository';
import { Product } from '@domain/entities/Product';
import { Name, Price, Photo } from '@domain/value-objects';

describe('MockProductRepository', () => {
    it('should not throw when updating a non-existent product', async () => {
        const productRepository = MockProductRepository.getInstance();
        const product = Product.create(
            'non-existent-id',
            Name.create('Martelo'),
            Price.create(50),
            Photo.create('http://url.com'),
            10
        );

        await expect(productRepository.update(product)).resolves.not.toThrow();
    });
});