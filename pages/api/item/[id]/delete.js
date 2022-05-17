// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../../../api/lib/dbConnect";
import { Item } from "../../../../api/models";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;
  try {
    const item = await Item.findByIdAndDelete(id);
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json(e);
  }
}
