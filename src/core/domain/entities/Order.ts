import { OrderItem } from "./OrderItem";
import { Price } from "../value-objects/Price";

export type OrderStatus = 'Processando' | 'Enviado' | 'Entregue' | 'Cancelado';

export class Order {
    private constructor(
        readonly id: string,
        readonly userId: string,
        readonly items: OrderItem[],
        readonly totalPrice: Price,
        readonly orderDate: Date,
        readonly status: OrderStatus
    ) {}

    static create(
        id: string,
        userId: string,
        items: OrderItem[],
    ): Order {
        if (items.length === 0) {
            throw new Error("Um pedido não pode ser criado sem itens.");
        }
        const totalPrice = items.reduce((total, item) => total + item.subTotal.value, 0);
        
        return new Order(id, userId, items, Price.create(totalPrice), new Date(), 'Processando');
    }
}