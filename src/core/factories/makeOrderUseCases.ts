import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { CreateOrder } from '../domain/use-cases/CreateOrder';
import { FindOrdersByUser } from '../domain/use-cases/FindOrdersByUser';
import { MockOrderRepository } from '../infra/mocks/MockOrderRepository';
import { MockUserRepository } from '../infra/mocks/MockUserRepository';
import { MockProductRepository } from '../infra/mocks/MockProductRepository';

export function makeOrderUseCases() {
    const orderRepository: IOrderRepository = MockOrderRepository.getInstance();
    const userRepository: IUserRepository = MockUserRepository.getInstance();
    const productRepository: IProductRepository = MockProductRepository.getInstance();

    const createOrder = new CreateOrder(orderRepository, userRepository, productRepository);
    const findOrdersByUser = new FindOrdersByUser(orderRepository);

    return {
        createOrder,
        findOrdersByUser,
    };
}