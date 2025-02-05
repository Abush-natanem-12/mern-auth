import mongoose from "mongoose";
const connectDB = async function () {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
    console.log("databse connected");
  } catch (error) {
    console.log("error happenng while connecting the database", error);
    process.exit(1);
  }
};

export default connectDB;
