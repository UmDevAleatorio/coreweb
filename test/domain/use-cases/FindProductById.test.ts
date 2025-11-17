import { FindProductById } from '@domain/use-cases/FindProductById';
import { MockProductRepository } from '@infra/mocks/MockProductRepository';
import { Product } from '@domain/entities/Product';
import { Name, Price, Photo } from '@domain/value-objects';

describe('Use Case: FindProductById', () => {
    const productRepository = MockProductRepository.getInstance();

    beforeEach(() => {
        productRepository.reset();
    });

    it('should find and return a product by its id', async () => {
        const product = Product.create('prod-123', Name.create('Parafusadeira'), Price.create(350), Photo.create('http://url.com'), 30);
        await productRepository.save(product);

        const findProductById = new FindProductById(productRepository);
        const foundProduct = await findProductById.execute({ id: 'prod-123' });

        expect(foundProduct).toBeDefined();
        expect(foundProduct?.id).toBe('prod-123');
    });

    it('should return null if product is not found', async () => {
        const findProductById = new FindProductById(productRepository);
        const foundProduct = await findProductById.execute({ id: 'non-existent-id' });

        expect(foundProduct).toBeNull();
    });
});