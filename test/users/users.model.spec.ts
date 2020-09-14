import * as mongoose from 'mongoose';
import UserSchema from '../../src/users/user.schema';
import { ConfigModule } from '@nestjs/config';

describe('insert', () => {
  let connection;
  let usersModel;
  beforeAll(async () => {
    ConfigModule.forRoot();
    connection = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    usersModel = mongoose.model('User', UserSchema);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should get a user', async () => {
    const user = await usersModel.findOne({mail:'arjunthiru123@gmail.com'});
    expect(user).toHaveProperty('mail','arjunthiru123@gmail.com');
  });

  it('should get a null', async () => {
    const user = await usersModel.findOne({mail:'__nomail__@gmail.com'});
    expect(user).toBeNull();
  });

});
