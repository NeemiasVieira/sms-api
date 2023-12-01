import mongoose from 'mongoose';

async function connectToMongo() {
  try {
    await mongoose.connect('mongodb://localhost:27017/local', {
    });

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

export default connectToMongo;
