import mongoose from "mongoose";
import 'dotenv/config';

const connectionString = process.env.ATLAS_CONT;

const connectToAtlasDb = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('Successfully connected to MongoDB in Atlas');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
  }
}

export default connectToAtlasDb;