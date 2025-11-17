import { Product } from '../entities/Product';
import { IProductRepository } from '../repositories/IProductRepository';
import { Name, Price, Photo } from '../value-objects';

export class CreateProduct {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(params: {
        name: string;
        price: number;
        photoUrl: string;
        stock: number;
        userId: string; 
    }): Promise<Product> {
        const { name, price, photoUrl, stock, userId } = params; 

        const product = Product.create(
            Math.random().toString(),
            Name.create(name),
            Price.create(price),
            Photo.create(photoUrl),
            stock,
            userId 
        );

        await this.productRepository.save(product);

        return product;
    }
}