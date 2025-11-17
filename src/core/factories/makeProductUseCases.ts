import { IProductRepository } from '@domain/repositories/IProductRepository';
import { MockProductRepository } from '@infra/mocks/MockProductRepository';
import { FindAllProducts } from '@domain/use-cases/FindAllProducts';
import { FindProductById } from '@domain/use-cases/FindProductById';
import { CreateProduct } from '@domain/use-cases/CreateProduct';
import { UpdateProduct } from '@domain/use-cases/UpdateProduct';
import { DeleteProduct } from '@domain/use-cases/DeleteProduct';

export function makeProductUseCases() {
    const productRepository: IProductRepository = MockProductRepository.getInstance();

    const findAllProducts = new FindAllProducts(productRepository);
    const findProductById = new FindProductById(productRepository);
    const createProduct = new CreateProduct(productRepository);
    const updateProduct = new UpdateProduct(productRepository);
    const deleteProduct = new DeleteProduct(productRepository);

    return {
        findAllProducts,
        findProductById,
        createProduct,
        updateProduct,
        deleteProduct,
    };
}