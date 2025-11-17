import { Order } from "../entities/Order";
import { IOrderRepository } from "../repositories/IOrderRepository";

export class FindOrdersByUser {
    constructor(private readonly orderRepository: IOrderRepository) {}

    async execute(params: { userId: string }): Promise<Order[]> {
        return this.orderRepository.findByUserId(params.userId);
    }
}