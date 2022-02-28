import { Schema, model } from "mongoose";

interface ICompany {
  corporate_name: string;
  cnpj: string;
  description: string;
  users: Array<Schema.Types.ObjectId>;
  units: Array<Schema.Types.ObjectId>;
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
        ref: "users",
      },
    ],
    units: [
      {
        type: Schema.Types.ObjectId,
        ref: "units",
      },
    ],
  },
  { minimize: false, timestamps: true }
);

const Company = model<ICompany>("Company", CompanySchema);

export default Company;
