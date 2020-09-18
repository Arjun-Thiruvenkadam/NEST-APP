import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiBody } from '@nestjs/swagger';
import AuthService from './auth.service';
import LoginPayload from './dto/loginPayload.dto';
import AuthenticatedUser from './dto/authenticatedUser.dto';
import AuthPayload from './dto/authPayload.dto';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({ status: 201, type: AuthenticatedUser })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'arjunthiru123@gmail.com' },
        password: { type: 'string', example: 'Arjun@123' },
      },
    },
  })
  async login(
    @Body() loginPayload: LoginPayload,
  ): Promise<AuthenticatedUser | string> {
    const user = await this.authService.login(
      loginPayload.email,
      loginPayload.password,
    );
    return user;
  }

  @Post('/signup')
  @ApiResponse({ status: 201, type: AuthenticatedUser })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userName: { type: 'string', example: 'user' },
        email: { type: 'string', example: 'user@gmail.com' },
        password: { type: 'string', example: 'password' },
      },
    },
  })
  async signup(
    @Body() authPayload: AuthPayload,
  ): Promise<AuthenticatedUser | string> {
    const user = await this.authService.signup(authPayload);
    return user;
  }
}
