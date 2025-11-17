import { Password } from '@domain/value-objects/Password';

describe('Value Object: Password', () => {
  it('should create a valid password', () => {
    const pass = Password.create('Senha@Forte123');
    expect(pass.value).toBe('Senha@Forte123');
  });

  it('should throw an error for a password that is too short', () => {
    expect(() => Password.create('aB1@')).toThrow('A senha deve ter pelo menos 8 caracteres.');
  });

  it('should throw an error if there is no uppercase letter', () => {
    expect(() => Password.create('senhaforte123@')).toThrow('A senha deve ter pelo menos uma letra maiúscula.');
  });

  it('should throw an error if there is no lowercase letter', () => {
    expect(() => Password.create('SENHAFORTE123@')).toThrow('A senha deve ter pelo menos uma letra minúscula.');
  });

  it('should throw an error if there is no number', () => {
    expect(() => Password.create('SenhaForte@')).toThrow('A senha deve ter pelo menos um número.');
  });

  it('should throw an error if there is no special character', () => {
    expect(() => Password.create('SenhaForte123')).toThrow('A senha deve conter pelo menos um caractere especial.');
  });
});