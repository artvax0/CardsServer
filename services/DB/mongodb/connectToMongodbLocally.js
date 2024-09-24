import mongoose from "mongoose";

const connectToLocalDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/cards_server');
    console.log('Successfully connected to MongoDB locally');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
  }
}

export default connectToLocalDb;