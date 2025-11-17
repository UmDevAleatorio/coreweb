import { Product } from '../entities/Product';
import { IProductRepository } from '../repositories/IProductRepository';
import { Name, Price, Photo } from '../value-objects';

export class UpdateProduct {
    constructor(private readonly productRepository: IProductRepository) { }

    async execute(params: {
        id: string;
        name?: string;
        price?: number;
        stock?: number;
        photoUrl?: string; 
    }): Promise<Product> {
        const { id, name, price, stock, photoUrl } = params; 

        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new Error('Product not found');
        }

        const newName = name ? Name.create(name) : product.name;
        const newPrice = price ? Price.create(price) : product.price;
        const newStock = stock ?? product.stock; 
        const newPhoto = photoUrl ? Photo.create(photoUrl) : product.photo; 

        const updatedProduct = Product.create(
            product.id,
            newName,
            newPrice,
            newPhoto, 
            newStock,
            product.userId, 
            product.user
        );

        await this.productRepository.update(updatedProduct);

        return updatedProduct;
    }
}