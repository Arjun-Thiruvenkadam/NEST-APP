import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import AuthPayload from '../authentication/dto/authPayload.dto';
import User from './dto/user.dto';
import UserModel from './user.model';

@Injectable()
export default class UserService {
  private readonly userModel;

  constructor(@InjectModel('User') private readonly userDbModel: Model<User>) {
    this.userModel = new UserModel(userDbModel);
  }

  async getUser(mail: string): Promise<User> {
    const user = await this.userModel.getUser(mail);
    return user;
  }

  async createUser(user: AuthPayload): Promise<User> {
    const newUser = await this.userModel.createUser(user);
    return newUser;
  }

  async getVerifiedUser(mail: string, password: string): Promise<User[]> {
    const user = await this.userModel.getVerifiedUser(mail, password);
    return user;
  }

  async getUserWithId(personId: string): Promise<User | string> {
    const user = await this.userModel.getUserWithId(personId);
    if (!user) return 'No User Available with the given id';
    return user;
  }

  async isAdmin(personId: string): Promise<boolean> {
    const user = await this.userModel.isAdmin(personId);
    if (user && user.isAdmin) {
      return true;
    }
    return false;
  }
}
