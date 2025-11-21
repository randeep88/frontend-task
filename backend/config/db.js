import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://randeepsingh:MyrdAs7qgfMlaMtV@deepcluster.a9xymf6.mongodb.net/assignment"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
