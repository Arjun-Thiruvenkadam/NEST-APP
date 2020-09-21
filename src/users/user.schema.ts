import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userName: String,
  mail: String,
  password: String,
  isAdmin: Boolean,
});
export default UserSchema;
