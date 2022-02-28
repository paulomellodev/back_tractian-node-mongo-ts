import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  company: Schema.Types.ObjectId;
}
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "companies",
      required: true,
    },
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const User = model<IUser>("User", UserSchema);

export default User;
