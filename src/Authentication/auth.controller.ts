import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './Interfaces/user.interface';
import { LoginPayload } from './Interfaces/loginPayload.interface';
import { AuthenticatedUser } from './Interfaces/authenticatedUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login')
  async login(@Body() loginPayload: LoginPayload):Promise<AuthenticatedUser | string> {
    const user = await this.authService.login(loginPayload.email, loginPayload.password);
    return user;
  }

  @Post('/signup')
  async signup(@Body() authPayload: User):Promise<AuthenticatedUser | string> {
    const user = await this.authService.signup(authPayload);
    return user;
  }
}
