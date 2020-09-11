import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './Interfaces/user.interface';
import { AuthenticatedUser } from './Interfaces/authenticatedUser.interface';
import { AuthModel } from './auth.model';

@Injectable()
export class AuthService {
  private readonly authModel;

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    this.authModel = new AuthModel(userModel);
  }

  async login(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser | string> {
    const user = await this.authModel.getVerifiedUser(email, password);
    if (user.length > 0) {
      const payload = {
        token: user[0]._id,
        name: user[0].userName,
      };
      return payload;
    } else return 'Check email and password';
  }

  async signup(user: User): Promise<AuthenticatedUser | string> {
    const result = await this.authModel.getUser(user.mail);
    if (result.length > 0) return 'Email already registered';
    else {
      const newUser = await this.authModel.createUser(user);
      if (!newUser) return 'Registration Failed';
      const payload = {
        name: newUser.userName,
        token: newUser._id,
      };
      return payload;
    }
  }

  async getUser(personId:string): Promise<User|string>{
    const user = await this.authModel.getUserWithId(personId);
    if(!user) return "No User Available with the given id";
    return user;
  }
}
