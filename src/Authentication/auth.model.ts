import { User} from './auth.interface';
import { Model } from 'mongoose';

export class AuthModel {
  constructor(private readonly authModel:Model<User>) {}

  async getUser(email:string):Promise<User[]> {
    const user = await this.authModel.find({ mail: email });
    return user;
  }
  
  async createUser(user:User):Promise<User> {
    const newUser = await this.authModel.create(user);
    return newUser;
  }
  
  async getVerifiedUser(email:string, password:string) : Promise<User[]>{
    const verUser = await this.authModel.find({mail:email, password:password});
    return verUser;
  }
}
