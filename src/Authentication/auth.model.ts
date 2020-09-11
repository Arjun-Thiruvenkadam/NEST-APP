import { User } from './Interfaces/user.interface';
import { Model } from 'mongoose';

export class AuthModel {
  constructor(private readonly authModel: Model<User>) {}

  async getUser(mail: string): Promise<User[]> {
    const user = await this.authModel.find({ mail });
    return user;
  }

  async createUser(user: User): Promise<User> {
    const newUser = await this.authModel.create(user);
    return newUser;
  }

  async getVerifiedUser(mail: string, password: string): Promise<User[]> {
    const verifiedUser = await this.authModel.find({ mail, password });
    return verifiedUser;
  }

  async getUserWithId(personId: string): Promise<User|string> {
    const user = await this.authModel
      .findById(personId)
      .exec()
      .catch(e => {return 'Invalid Id'});
    return user;
  }
}
