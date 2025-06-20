import mongoose from "mongoose";
const connectDatabase = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✓ MongoDB connected with server: ${connection.host}`);
  } catch (error) {
    console.error(`✗ Failed to connect to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure code
  }
};

export default connectDatabase;
