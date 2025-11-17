import { Name } from '@domain/value-objects/Name';

describe('Value Object: Name', () => {
  it('should create a valid name', () => {
    const name = Name.create('Martelo de Unha');
    expect(name.value).toBe('Martelo de Unha');
  });

  it('should throw an error for a name that is too short', () => {
    expect(() => Name.create('TV')).toThrow('O nome deve ter mais de 2 caracteres.');
  });
});