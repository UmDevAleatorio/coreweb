import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { Order } from '../../domain/entities/Order';

export class MockOrderRepository implements IOrderRepository {
  private static instance: MockOrderRepository;
  private orders: Order[] = [];

  private constructor() {}

  public static getInstance(): MockOrderRepository {
    if (!MockOrderRepository.instance) {
      MockOrderRepository.instance = new MockOrderRepository();
    }
    return MockOrderRepository.instance;
  }
  
  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.find(o => o.id === id) || null;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return this.orders.filter(o => o.userId === userId);
  }

  async update(order: Order): Promise<void> {
    const index = this.orders.findIndex(o => o.id === order.id);
    if (index !== -1) {
      this.orders[index] = order;
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orders;
  }
  
  public reset(): void {
    this.orders = [];
  }
}