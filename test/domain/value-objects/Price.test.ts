import { Price } from '@domain/value-objects/Price';

describe('Value Object: Price', () => {
  it('should create a valid price', () => {
    const price = Price.create(39.90);
    expect(price.value).toBe(39.90);
  });

  it('should throw an error for a negative price', () => {
    expect(() => Price.create(-10)).toThrow('O preço não pode ser negativo.');
  });

  it('should format the price correctly', () => {
    const price = Price.create(1799);
    expect(price.formatted).toBe('R$ 1.799,00'); 
  });
});