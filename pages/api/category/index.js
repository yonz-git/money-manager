import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      const categories = await Category.find();

      response.status(200).json(categories);
      return;
    }

    response.status(405).json({ status: "Method not allowed." });
  } catch (error) {
    response.status(500).json({ status: "Database error.", error: error.message });
  }
}