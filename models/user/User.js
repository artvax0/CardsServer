import mongoose from "mongoose";
import { EMAIL, PHONE } from "../../helpers/mongodb/mongooseValidators.js";
import NAME from "../../helpers/mongodb/Name.js";
import IMAGE from "../../helpers/mongodb/Image.js";
import ADDRESS from "../../helpers/mongodb/Address.js";

const User = mongoose.model('user', {
  name: NAME,
  phone: PHONE,
  email: EMAIL,
  password: { type: String, required: true, trim: true },
  image: IMAGE,
  address: ADDRESS,
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default User;