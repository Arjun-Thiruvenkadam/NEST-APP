import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  userName: String,
  mail: String,
  password: String,
});
