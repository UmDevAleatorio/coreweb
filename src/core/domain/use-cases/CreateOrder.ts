import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { IUserRepository } from "../repositories/IUserRepository";
import { IProductRepository } from "../repositories/IProductRepository";
import { IOrderRepository } from "../repositories/IOrderRepository";

type ItemInput = { productId: string; quantity: number; }

export class CreateOrder {
    constructor(
        private readonly orderRepository: IOrderRepository,
        private readonly userRepository: IUserRepository,
        private readonly productRepository: IProductRepository,
    ) {}

    async execute(params: { userId: string; items: ItemInput[] }): Promise<Order> {
        const { userId, items } = params;

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        const orderItemsPromises = items.map(async (item) => {
            const product = await this.productRepository.findById(item.productId);
            if (!product) {
                throw new Error(`Produto com ID ${item.productId} não encontrado.`);
            }
            return OrderItem.create(product.id, product.name.value, item.quantity, product.price);
        });

        const orderItems = await Promise.all(orderItemsPromises);
        
        const order = Order.create(
            Math.random().toString(36).substring(7),
            userId,
            orderItems
        );

        await this.orderRepository.save(order);
        
        for (const item of orderItems) {
            const product = await this.productRepository.findById(item.productId);
            if (product) {
                const updatedProduct = product.decreaseStock(item.quantity);
                await this.productRepository.update(updatedProduct);
            }
        }

        return order;
    }
}