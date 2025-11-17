import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { Name, Price, Photo } from '../../domain/value-objects';
import betoneira from '@/assets/betoneira.jpeg';
import martelo from '@/assets/martelo.jpeg';
import chaveinglesa from '@/assets/chaveinglesa.jpeg';
import sacosdecimento from '@/assets/sacosdecimento.jpeg';
import sacodeareia from '@/assets/sacodeareia.jpeg';
import serraeletrica from '@/assets/serraeletrica.jpeg';
import carrinhodemao from '@/assets/carrinhodemao.jpeg';
import serracircular from '@/assets/serracircular.jpeg';

const createInitialProducts = () => [];

export class MockProductRepository implements IProductRepository {
    private static instance: MockProductRepository;
    private products: Product[] = createInitialProducts();
    private constructor() { }

    public static getInstance(): MockProductRepository {
        if (!MockProductRepository.instance) {
            MockProductRepository.instance = new MockProductRepository();
        }
        return MockProductRepository.instance;
    }

    async save(product: Product): Promise<void> { this.products.push(product); }
    async findById(id: string): Promise<Product | null> { return this.products.find(product => product.id === id) || null; }
    async findAll(): Promise<Product[]> { return this.products; }
    async update(product: Product): Promise<void> {
        const productIndex = this.products.findIndex(p => p.id === product.id);
        if (productIndex !== -1) { this.products[productIndex] = product; }
    }
    async delete(id: string): Promise<void> { this.products = this.products.filter(product => product.id !== id); }
    
    public reset(): void {
        this.products = [];
    }
}