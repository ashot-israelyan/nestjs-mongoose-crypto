import { UsersRepository } from './users.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequest } from './dto/request/create-user-request.dto';
import { User } from './models/User';
import { hash, compare } from 'bcrypt';
import { UserResponse } from './dto/response/user-response.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserRquest: CreateUserRequest): Promise<UserResponse> {
    await this.validateCreateUserRequest(createUserRquest);

    const user = await this.usersRepository.insertOne({
      ...createUserRquest,
      password: await hash(createUserRquest.password, 10),
    });

    return this.buildResponse(user);
  }

  async validateUser(email: string, password: string): Promise<UserResponse> {
    const user = await this.usersRepository.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) {
      throw new NotFoundException('User does not exist');
    }

    return this.buildResponse(user);
  }

  private async validateCreateUserRequest(
    createUserRequest: CreateUserRequest,
  ): Promise<void> {
    const user = await this.usersRepository.findOneByEmail(
      createUserRequest.email,
    );

    if (user) {
      throw new BadRequestException('This email already exists');
    }
  }

  private buildResponse(user: User): UserResponse {
    return {
      _id: user._id.toHexString(),
      email: user.email,
    };
  }
}
