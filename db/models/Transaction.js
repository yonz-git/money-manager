import { Schema, model, models } from "mongoose";

const transactionSchema = new Schema(
  {
    amount: { type: Number, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Transaction =
  models.Transaction || model("Transaction", transactionSchema);

export default Transaction;
