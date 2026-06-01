import dbConnect from "@/db/connect";
import Transaction from "@/db/models/Transaction";

export default async function handler(request, response) {
  const { id } = request.query;

  try {
    await dbConnect();

    if (request.method === "PUT") {
      const { amount, title, category, date, type } = request.body;

      const finalAmount =
        type === "Expense"
          ? -Math.abs(Number(amount))
          : Math.abs(Number(amount));

      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        {
          amount: finalAmount,
          title: title,
          category: category,
          date: new Date(date),
        },
        { new: true }
      );

      if (!updatedTransaction) {
        return response.status(404).json({ status: "Transaction not found." });
      }

      return response.status(200).json(updatedTransaction);
    }

    response.status(405).json({ status: "Method not allowed." });

  } catch (error) {
    response.status(500).json({ status: "Database error.", error: error.message });
  }
}