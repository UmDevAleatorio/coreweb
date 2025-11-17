import { CreateOrder } from '@domain/use-cases/CreateOrder';
import { MockOrderRepository } from '@infra/mocks/MockOrderRepository';
import { MockUserRepository } from '@infra/mocks/MockUserRepository';
import { MockProductRepository } from '@infra/mocks/MockProductRepository';
import { User } from '@domain/entities/User';
import { Product } from '@domain/entities/Product';
import { Name, Email, Password, Price, Photo } from '@domain/value-objects';

describe('Use Case: CreateOrder', () => {
    const userRepository = MockUserRepository.getInstance();
    const productRepository = MockProductRepository.getInstance();
    const orderRepository = MockOrderRepository.getInstance();
    const createOrder = new CreateOrder(orderRepository, userRepository, productRepository);

    beforeEach(() => {
        userRepository.reset();
        productRepository.reset();
        orderRepository.reset();
    });

    it('should create an order and decrease product stock', async () => {
        const user = User.create('user-1', Name.create('Cliente Teste'), Email.create('cliente@teste.com'), Password.create('Pass@1234'));
        await userRepository.save(user);
        
        const product = Product.create('prod-1', Name.create('Martelo'), Price.create(40), Photo.create('http://url.com'), 100);
        await productRepository.save(product);
        
        await createOrder.execute({
            userId: 'user-1',
            items: [{ productId: 'prod-1', quantity: 3 }]
        });

        const updatedProduct = await productRepository.findById('prod-1');
        expect(updatedProduct?.stock).toBe(97);
        const orders = await orderRepository.findByUserId('user-1');
        expect(orders).toHaveLength(1);
        expect(orders[0].totalPrice.value).toBe(120);
    });

    it('should throw an error if stock is insufficient', async () => {
        const user = User.create('user-1', Name.create('Cliente'), Email.create('c@c.com'), Password.create('Pass@1234'));
        await userRepository.save(user);
        
        const product = Product.create('prod-1', Name.create('Martelo'), Price.create(40), Photo.create('http://url.com'), 5);
        await productRepository.save(product);

        await expect(createOrder.execute({
            userId: 'user-1',
            items: [{ productId: 'prod-1', quantity: 10 }]
        })).rejects.toThrow("Estoque insuficiente para o produto 'Martelo'.");
    });
    
    it('should throw an error if the user is not found', async () => {
        const product = Product.create('prod-1', Name.create('Martelo'), Price.create(40), Photo.create('http://url.com'), 5);
        await productRepository.save(product);

        await expect(createOrder.execute({
            userId: 'user-inexistente',
            items: [{ productId: 'prod-1', quantity: 2 }]
        })).rejects.toThrow("Usuário não encontrado.");
    });
});