import mongoose, { Mongoose } from "mongoose";

const connection = (): Promise<Mongoose> => {
  const conn = mongoose.connect(process.env.DATABASE_URL, { minPoolSize: 5 });
  return conn;
};

export default connection;
