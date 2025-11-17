import { Product } from '@domain/entities/Product';
import { Name, Photo, Price } from '@domain/value-objects';

describe('Entity: Product', () => {
  it('should create a valid product instance', () => {
    const name = Name.create('Martelo de Unha');
    const price = Price.create(39.99);
    const photo = Photo.create('http://example.com/martelo.jpg');
    
    const product = Product.create('prod-id-456', name, price, photo, 150);

    expect(product.id).toBe('prod-id-456');
    expect(product.name.value).toBe('Martelo de Unha');
    expect(product.stock).toBe(150);
  });

  it('should throw an error for negative stock', () => {
    expect(() => {
        Product.create('prod-id-789', Name.create('Betoneira'), Price.create(1800), Photo.create('http://url.com'), -1);
    }).toThrow('O estoque não pode ser negativo.');
  });

  it('should correctly decrease the stock', () => {
    const product = Product.create('prod-1', Name.create('Martelo'), Price.create(40), Photo.create('http://url.com'), 100);
    const updatedProduct = product.decreaseStock(10);
    expect(updatedProduct.stock).toBe(90);
  });

  it('should throw an error if trying to decrease stock below zero', () => {
    const product = Product.create('prod-1', Name.create('Martelo'), Price.create(40), Photo.create('http://url.com'), 5);
    expect(() => product.decreaseStock(10)).toThrow("Estoque insuficiente para o produto 'Martelo'.");
  });
});