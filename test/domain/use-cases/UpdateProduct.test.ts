import { CreateProduct } from '@domain/use-cases/CreateProduct';
import { UpdateProduct } from '@domain/use-cases/UpdateProduct';
import { MockProductRepository } from '@infra/mocks/MockProductRepository';

describe('Use Case: UpdateProduct', () => {
    it('should update an existing product', async () => {
        const productRepository = MockProductRepository.getInstance();
        productRepository.reset(); // Garante que o repositório está limpo
        const createProduct = new CreateProduct(productRepository);
        const updateProduct = new UpdateProduct(productRepository);

        const originalProduct = await createProduct.execute({
            name: 'Serra de Bancada',
            price: 1200,
            photoUrl: 'http://example.com/serra.jpg',
            stock: 15
        });

        const updatedProduct = await updateProduct.execute({
            id: originalProduct.id,
            price: 1150,
            stock: 12
        });
        
        expect(updatedProduct.price.value).toBe(1150);
        expect(updatedProduct.stock).toBe(12);
        expect(updatedProduct.name.value).toBe('Serra de Bancada');
    });
});