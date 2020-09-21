import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import UserService from '../users/user.service';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (await this.isAdmin(request.body.userId)) return true;
    return false;
  }

  isAdmin = async (userId: string): Promise<boolean> => {
    const result = await this.userService.isAdmin(userId);
    return result;
  };
}
