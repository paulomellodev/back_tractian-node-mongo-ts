import { Schema, Types, model } from "mongoose";

interface ICompany {
  corporate_name: string;
  cnpj: string;
  description: string;
  users: Array<Types.ObjectId>;
  units: Array<Types.ObjectId>;
}

const CompanySchema = new Schema<ICompany>(
  {
    corporate_name: {
      type: String,
      required: true,
    },
    cnpj: {
      type: String,
      unique: true,
      required: true,
      minlength: 14,
      maxlength: 14,
    },
    description: {
      type: String,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    units: [
      {
        type: Schema.Types.ObjectId,
        ref: "Unit",
      },
    ],
  },
  { minimize: false, timestamps: true }
);

const Company = model("Company", CompanySchema);

export default Company;
