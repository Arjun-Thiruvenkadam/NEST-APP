import { Controller, Post, Body } from '@nestjs/common';
import AuthService from './auth.service';
import LoginPayload from './interfaces/loginPayload.interface';
import AuthenticatedUser from './interfaces/authenticatedUser.interface';
import AuthPayload from './interfaces/authPayload.interface';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
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
  async signup(
    @Body() authPayload: AuthPayload,
  ): Promise<AuthenticatedUser | string> {
    const user = await this.authService.signup(authPayload);
    return user;
  }
}
