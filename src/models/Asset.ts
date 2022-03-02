import { Schema, Types, model } from "mongoose";

interface IAsset {
  asset_name: string;
  image: string;
  description: string;
  model: string;
  status?: "Running" | "Alerting" | "Stopped";
  health_level: number;
  owner: Types.ObjectId;
  unit: Types.ObjectId;
}

const AssetSchema = new Schema<IAsset>(
  {
    asset_name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    model: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Running", "Alerting", "Stopped"],
      default: "Stopped",
    },
    health_level: {
      type: Number,
      min: 0,
      max: 100,
      default: 100,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    unit: {
      type: Schema.Types.ObjectId,
      ref: "Unit",
    },
  },
  { minimize: false, timestamps: true }
);

const Asset = model<IAsset>("Asset", AssetSchema);

export default Asset;
