import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserRequest } from './dto/request/create-user-request.dto';
import { UsersService } from './users.service';
import { UserResponse } from './dto/response/user-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(
    @Body() createUserRequest: CreateUserRequest,
  ): Promise<UserResponse> {
    return this.usersService.createUser(createUserRequest);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: UserResponse): Promise<UserResponse> {
    return user;
  }
}
