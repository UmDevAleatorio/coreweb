import { Email } from '@domain/value-objects/Email';

describe('Value Object: Email', () => {
  it('should create a valid email', () => {
    const email = Email.create('cliente@buildmart.com');
    expect(email.value).toBe('cliente@buildmart.com');
  });

  it('should throw an error for an invalid email format', () => {
    expect(() => Email.create('email-invalido')).toThrow('Formato de e-mail inválido.');
  });
});