import { FindAllProducts } from '@domain/use-cases/FindAllProducts';
import { MockProductRepository } from '@infra/mocks/MockProductRepository';
import { Product } from '@domain/entities/Product';
import { Name, Price, Photo } from '@domain/value-objects';

describe('Use Case: FindAllProducts', () => {
    const productRepository = MockProductRepository.getInstance();

    beforeEach(() => {
        productRepository.reset();
    });
    
    it('should return an empty array when there are no products', async () => {
        const findAllProducts = new FindAllProducts(productRepository);
        const products = await findAllProducts.execute();
        expect(products).toHaveLength(0);
    });
    
    it('should return a list of all registered products', async () => {
        const product1 = Product.create('1', Name.create('Martelo'), Price.create(40), Photo.create('http://url1.com'), 100);
        const product2 = Product.create('2', Name.create('Cimento'), Price.create(20), Photo.create('http://url2.com'), 50);
        await productRepository.save(product1);
        await productRepository.save(product2);

        const findAllProducts = new FindAllProducts(productRepository);
        const products = await findAllProducts.execute();

        expect(products).toHaveLength(2);
        expect(products[0].name.value).toBe('Martelo');
    });
});