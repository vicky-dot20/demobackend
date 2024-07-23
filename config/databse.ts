import mongoose from 'mongoose';

import dotenv from "dotenv";

dotenv.config();

const uri = 'mongodb+srv://MohamedAbdulKather:riyAbu%40143@atlascluster.a5kdrzr.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster'

const connectToMongoDB = async () => {
    try {
      await mongoose.connect(uri, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
      console.log('MongoDB is connected');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error; // rethrow the error to handle it in the index.js
    }
  };
  
  export default connectToMongoDB;
