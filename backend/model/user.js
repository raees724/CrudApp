
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: Number
});

const User = mongoose.model('User', userSchema);

export default User;