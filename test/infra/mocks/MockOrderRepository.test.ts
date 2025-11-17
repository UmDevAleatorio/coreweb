import { MockOrderRepository } from '@infra/mocks/MockOrderRepository';
import { Order } from '@domain/entities/Order';
import { OrderItem } from '@domain/entities/OrderItem';
import { Price } from '@domain/value-objects';

describe('MockOrderRepository', () => {
    it('should not throw when updating a non-existent order', async () => {
        const orderRepository = MockOrderRepository.getInstance();
        const item = OrderItem.create('p1', 'Produto Teste', 1, Price.create(10));
        const order = Order.create('non-existent-id', 'user-1', [item]);

        await expect(orderRepository.update(order)).resolves.not.toThrow();
    });
});