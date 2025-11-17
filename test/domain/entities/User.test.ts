import { User } from '@domain/entities/User';
import { Email, Name, Password } from '@domain/value-objects';

describe('Entity: User', () => {
  it('should create a valid user instance', () => {
    const name = Name.create('Lazinho');
    const email = Email.create('lazinho@example.com');
    const password = Password.create('Valid@Pass123');
    
    const user = User.create('user-id-123', name, email, password);

    expect(user.id).toBe('user-id-123');
    expect(user.name.value).toBe('Lazinho');
    expect(user.email).toBe(email);
  });
});