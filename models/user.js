import { Schema, model, models } from 'mongoose';

const user = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  firstName: String,
  lastName: String,
  createdAt: Date,
  email: {
    address: String,
    verified: Boolean,
    verificationCode: String,
  },
  services: {
    password: {
      bcrypt: String,
      lastChanged: Date,
    },
    google: Object,
  },
  meta: {
    marketing: Boolean,
  }
});

const User = models.User || model('User', user);

export default User;