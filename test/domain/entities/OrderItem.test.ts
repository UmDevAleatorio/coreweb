import { Order } from '@domain/entities/Order';
import { OrderItem } from '@domain/entities/OrderItem';
import { Price } from '@domain/value-objects/Price';

describe('Entity: Order', () => {
  it('should create a valid order and calculate the total price', () => {
    const item1 = OrderItem.create('prod-1', 'Martelo', 2, Price.create(40));
    const item2 = OrderItem.create('prod-2', 'Saco de Cimento', 5, Price.create(20));

    const order = Order.create('order-id-xyz', 'user-id-abc', [item1, item2]);

    expect(order.id).toBe('order-id-xyz');
    expect(order.items).toHaveLength(2);
    expect(order.totalPrice.value).toBe(180);
    expect(order.status).toBe('Processando');
  });

  it('should throw an error if created with no items', () => {
    expect(() => {
        Order.create('order-id-xyz', 'user-id-abc', []);
    }).toThrow('Um pedido não pode ser criado sem itens.');
  });
});