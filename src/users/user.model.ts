import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

export default class UserModel {
  constructor(private readonly userModel: Model<User>) {}

  async getUser(mail: string): Promise<User[]> {
    const user = await this.userModel.find({ mail });
    return user;
  }

  async createUser(user: User): Promise<User> {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async getVerifiedUser(mail: string, password: string): Promise<User[]> {
    const verifiedUser = await this.userModel.find({ mail, password });
    return verifiedUser;
  }

  async getUserWithId(personId: string): Promise<User|string> {
    const user = await this.userModel
      .findById(personId, '-__v -password')
      .exec()
      .catch((e) => 'Invalid Id');
    return user;
  }
}
