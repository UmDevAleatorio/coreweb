import { Product } from "../entities/Product";
import { IProductRepository } from "../repositories/IProductRepository";

export class FindProductById {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(params: { id: string }): Promise<Product | null> {
        return this.productRepository.findById(params.id);
    }
}