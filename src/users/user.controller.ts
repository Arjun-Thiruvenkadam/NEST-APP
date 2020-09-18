import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import User from './dto/user.dto';
import UserService from './user.service';

@Controller('users')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId')
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        userName: { type: 'string' },
        mail: { type: 'string' },
      },
    },
    status: 200,
  })
  @ApiParam({ name: 'userId', example: '5f465cf7a8ecff62f072353e' })
  async getUser(@Param('userId') personId: string): Promise<User | string> {
    const user = await this.userService.getUserWithId(personId);
    return user;
  }
}
