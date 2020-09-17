import { Controller, Get, Param } from '@nestjs/common';
import User from './interfaces/user.interface';
import UserService from './user.service';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId')
  async getUser(@Param('userId') personId: string): Promise<User | string> {
    const user = await this.userService.getUserWithId(personId);
    return user;
  }
}
