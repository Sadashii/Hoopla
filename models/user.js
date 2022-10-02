import { model, models, Schema } from "mongoose";

const user = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  username: String,
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
    firstLogin: Date,
  },
});

const User = models.User || model("User", user);

export default User;