import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import User from '../users/dto/user.dto';
import AuthenticatedUser from './dto/authenticatedUser.dto';
import UserService from '../users/user.service';
import AuthPayload from './dto/authPayload.dto';

@Injectable()
export default class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly userService: UserService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser | string> {
    const user = await this.userService.getVerifiedUser(email, password);
    if (user.length > 0) {
      const payload = {
        // eslint-disable-next-line no-underscore-dangle
        token: user[0]._id,
        name: user[0].userName,
      };
      return payload;
    }
    return 'Check email and password';
  }

  async signup(user: AuthPayload): Promise<AuthenticatedUser | string> {
    const result = await this.userService.getUser(user.mail);
    if (result) return 'Email already registered';

    const newUser = await this.userService.createUser(user);
    if (!newUser) return 'Registration Failed';
    const payload = {
      name: newUser.userName,
      // eslint-disable-next-line no-underscore-dangle
      token: newUser._id,
    };
    return payload;
  }
}
