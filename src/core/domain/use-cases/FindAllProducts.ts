import { Product } from "../entities/Product";
import { IProductRepository } from "../repositories/IProductRepository";

export class FindAllProducts {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(): Promise<Product[]> {
        return this.productRepository.findAll();
    }
}