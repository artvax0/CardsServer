import mongoose from "mongoose";
import { DEFAULT_VALIDATION, EMAIL, PHONE, URL } from "../../helpers/mongodb/mongooseValidators.js";
import IMAGE from "../../helpers/mongodb/Image.js";
import ADDRESS from "../../helpers/mongodb/Address.js";

const Card = mongoose.model('card', {
  title: DEFAULT_VALIDATION,
  subtitle: DEFAULT_VALIDATION,
  description: { ...DEFAULT_VALIDATION, maxLength: 1024, },
  phone: PHONE,
  email: EMAIL,
  web: URL,
  image: IMAGE,
  address: ADDRESS,
  bizNumber: { type: Number, min: 1000000, max: 9999999, required: true },
  likes: [String],
  createdAt: { type: Date, default: Date.now },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export default Card;