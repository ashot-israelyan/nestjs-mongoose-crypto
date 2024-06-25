import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserResponse } from '../users/dto/response/user-response.dto';

const getCurrentUserByContext = (context: ExecutionContext): UserResponse => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
