import dotenv from "dotenv";

dotenv.config();

const jwt = {
  secret: process.env.SECRET,
  expiresIn: "7d",
};

export default jwt;
