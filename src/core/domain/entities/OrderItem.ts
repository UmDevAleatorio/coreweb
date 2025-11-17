import { Price } from "../value-objects/Price";

export class OrderItem {
    private constructor(
        readonly productId: string,
        readonly productName: string,
        readonly quantity: number,
        readonly unitPrice: Price
    ) {}

    static create(
        productId: string,
        productName: string,
        quantity: number,
        unitPrice: Price
    ): OrderItem {
        if (quantity <= 0) {
            throw new Error("A quantidade de um item deve ser positiva.");
        }
        return new OrderItem(productId, productName, quantity, unitPrice);
    }

    get subTotal(): Price {
        const totalValue = this.unitPrice.value * this.quantity;
        return Price.create(totalValue);
    }
}