import { Name, Price, Photo } from "../value-objects";
import { User } from './User';

export class Product {
    private constructor(
        readonly id: string,
        readonly name: Name,
        readonly price: Price,
        readonly photo: Photo,
        readonly stock: number,
        readonly userId?: string,
        readonly user?: User
    ) { }

    static create(
        id: string,
        name: Name,
        price: Price,
        photo: Photo,
        stock: number,
        userId?: string,
        user?: User
    ): Product {


        if (stock < 0) {
            throw new Error("O estoque não pode ser negativo.");
        }

        return new Product(id, name, price, photo, stock, userId, user);
    }


    public decreaseStock(quantity: number): Product {
        
        if (this.stock < quantity) {
            throw new Error(`Estoque insuficiente para o produto '${this.name.value}'.`);
        }

        return new Product(
            this.id,
            this.name,
            this.price,
            this.photo,
            this.stock - quantity, 
            this.userId,
            this.user
        );
    }

}