import { Schema, Types, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  company: Types.ObjectId;
  updatedAt: Date;
  createdAt: Date;
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
      ref: "Company",
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
