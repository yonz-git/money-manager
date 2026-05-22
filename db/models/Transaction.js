import mongoose from "mongoose";
 
const transactionSchema = new Schema(
    {
        amount: { type: Number, required: true},
        title: { type: String, required: true},
        catergory: { type: String, required: true},
        date: { type: Date, required: true},
        
    }
);

export default Transaction;