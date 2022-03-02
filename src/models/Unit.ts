import { Schema, Types, model } from "mongoose";

interface IUnit {
  unit_name: string;
  address?: string;
  company: Types.ObjectId;
  assets: Array<Types.ObjectId>;
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
      ref: "Company",
    },
    assets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Asset",
      },
    ],
  },
  { minimize: false, timestamps: true }
);

const Unit = model<IUnit>("Unit", UnitSchema);

export default Unit;
