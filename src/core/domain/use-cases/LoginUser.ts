import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class LoginUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(params: LoginUser.Params): Promise<User> {
    const { email, password } = params;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('E-mail ou senha inválidos.');
    }

    const isPasswordValid = await this.comparePassword(
      password,
      user.password.value
    );

    if (!isPasswordValid) {
      throw new Error('E-mail ou senha inválidos.');
    }

    return user;
  }

  private async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return `hashed_${password}` === hashedPassword;
  }
}


export namespace LoginUser {
  export type Params = {
    email: string;
    password: string;
  }
}