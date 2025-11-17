import { CreateProduct } from '@domain/use-cases/CreateProduct';
import { MockProductRepository } from '@infra/mocks/MockProductRepository';

describe('Use Case: CreateProduct', () => {
    it('should create a new product', async () => {
        const productRepository = MockProductRepository.getInstance();
        const createProduct = new CreateProduct(productRepository);

        const product = await createProduct.execute({
            name: 'Furadeira de Impacto',
            price: 299.90,
            photoUrl: 'http://example.com/furadeira.jpg',
            stock: 50
        });

        expect(product).toBeDefined();
        expect(product.name.value).toBe('Furadeira de Impacto');
        const foundProduct = await productRepository.findById(product.id);
        expect(foundProduct).toEqual(product);
    });
});