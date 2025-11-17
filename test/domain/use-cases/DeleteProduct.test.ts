import { CreateProduct } from '@domain/use-cases/CreateProduct';
import { DeleteProduct } from '@domain/use-cases/DeleteProduct';
import { MockProductRepository } from '@infra/mocks/MockProductRepository';

describe('Use Case: DeleteProduct', () => {
    it('should delete a product', async () => {
        const productRepository = MockProductRepository.getInstance();
        productRepository.reset();
        const createProduct = new CreateProduct(productRepository);
        const deleteProduct = new DeleteProduct(productRepository);

        const product = await createProduct.execute({
            name: 'Lixadeira',
            price: 150,
            photoUrl: 'http://example.com/lixadeira.jpg',
            stock: 40
        });

        await deleteProduct.execute({ id: product.id });
        
        const foundProduct = await productRepository.findById(product.id);
        expect(foundProduct).toBeNull();
    });
});