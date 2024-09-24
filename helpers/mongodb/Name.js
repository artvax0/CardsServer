import mongoose from "mongoose";
import { DEFAULT_VALIDATION } from "./mongooseValidators.js";

const NAME = new mongoose.Schema({
  first: DEFAULT_VALIDATION,
  middle: {
    ...DEFAULT_VALIDATION,
    required: false,
    minLength: 0,
  },
  last: DEFAULT_VALIDATION,
});

export default NAME;