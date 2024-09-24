import mongoose from "mongoose";
import { URL, DEFAULT_VALIDATION } from "./mongooseValidators.js";

const IMAGE = new mongoose.Schema({
  url: URL,
  alt: { ...DEFAULT_VALIDATION, required: false, minLength: 0 },
});

export default IMAGE;