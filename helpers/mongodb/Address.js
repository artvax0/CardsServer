import mongoose from "mongoose";
import { DEFAULT_VALIDATION } from "./mongooseValidators.js";

const ADDRESS = new mongoose.Schema({
  country: DEFAULT_VALIDATION,
  state: { type: String, maxLength: 256, trim: true },
  city: DEFAULT_VALIDATION,
  street: DEFAULT_VALIDATION,
  houseNumber: { type: Number, required: true, min: 1 },
  zip: { type: Number, default: 0 },
});

export default ADDRESS;