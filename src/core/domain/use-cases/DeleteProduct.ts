import { IProductRepository } from "../repositories/IProductRepository";

export class DeleteProduct {
    constructor(private readonly productRepository: IProductRepository) {}

    async execute(params: { id: string }): Promise<void> {
        const { id } = params;
        const existingProduct = await this.productRepository.findById(id);
        if (!existingProduct) {
            throw new Error("Produto não encontrado.");
        }
        await this.productRepository.delete(id);
    }
}