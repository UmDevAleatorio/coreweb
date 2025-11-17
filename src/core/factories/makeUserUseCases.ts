import { IUserRepository } from '../domain/repositories/IUserRepository';
import { LoginUser } from '../domain/use-cases/LoginUser';
import { RegisterUser } from '../domain/use-cases/RegisterUser';
import { FindUserByEmail } from '../domain/use-cases/FindUserByEmail'; // 1. IMPORTE O NOVO ARQUIVO
import { MockUserRepository } from '../infra/mocks/MockUserRepository';

export function makeUserUseCases() {
  const userRepository: IUserRepository = MockUserRepository.getInstance();

  const registerUser = new RegisterUser(userRepository);
  const loginUser = new LoginUser(userRepository);
  const findUserByEmail = new FindUserByEmail(userRepository);

  return {
    registerUser,
    loginUser,
    findUserByEmail, 
  };
}