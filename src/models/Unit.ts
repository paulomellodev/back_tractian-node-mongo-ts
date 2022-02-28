import { Schema, model } from "mongoose";

interface IUnit {
  unit_name: string;
  address?: string;
  company: Schema.Types.ObjectId;
  assets: Array<Schema.Types.ObjectId>;
}

const UnitSchema = new Schema<IUnit>(
  {
    unit_name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
    assets: [
      {
        type: Schema.Types.ObjectId,
        ref: "assets",
      },
    ],
  },
  { minimize: false, timestamps: true }
);

const Unit = model<IUnit>("Unit", UnitSchema);

export default Unit;
