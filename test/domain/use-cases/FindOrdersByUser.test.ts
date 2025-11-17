import { FindOrdersByUser } from '@domain/use-cases/FindOrdersByUser';
import { CreateOrder } from '@domain/use-cases/CreateOrder';
import { MockOrderRepository } from '@infra/mocks/MockOrderRepository';
import { MockUserRepository } from '@infra/mocks/MockUserRepository';
import { MockProductRepository } from '@infra/mocks/MockProductRepository';
import { User } from '@domain/entities/User';
import { Product } from '@domain/entities/Product';
import { Name, Email, Password, Price, Photo } from '@domain/value-objects';

describe('Use Case: FindOrdersByUser', () => {
    const userRepository = MockUserRepository.getInstance();
    const productRepository = MockProductRepository.getInstance();
    const orderRepository = MockOrderRepository.getInstance();

    beforeEach(() => {
        userRepository.reset();
        productRepository.reset();
        orderRepository.reset();
    });

    it('should return all orders for a specific user', async () => {
        const user = User.create('user-1', Name.create('Cliente'), Email.create('c@c.com'), Password.create('Pass@1234'));
        await userRepository.save(user);
        const product = Product.create('prod-1', Name.create('Martelo'), Price.create(40), Photo.create('http://url.com'), 100);
        await productRepository.save(product);
        
        const createOrder = new CreateOrder(orderRepository, userRepository, productRepository);
        await createOrder.execute({ userId: 'user-1', items: [{ productId: 'prod-1', quantity: 1 }] });
        await createOrder.execute({ userId: 'user-1', items: [{ productId: 'prod-1', quantity: 2 }] });

        const findOrders = new FindOrdersByUser(orderRepository);
        const orders = await findOrders.execute({ userId: 'user-1' });

        expect(orders).toHaveLength(2);
    });

    it('should return an empty array for a user with no orders', async () => {
        const user = User.create('user-2', Name.create('Cliente Novo'), Email.create('cn@c.com'), Password.create('Pass@1234'));
        await userRepository.save(user);

        const findOrders = new FindOrdersByUser(orderRepository);
        const orders = await findOrders.execute({ userId: 'user-2' });

        expect(orders).toHaveLength(0);
    });
});