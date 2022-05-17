// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../../../api/lib/dbConnect";
import { Warehouse } from "../../../../api/models";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;
  try {
    const warehouse = await Warehouse.findById(id);
    res.status(200).json(warehouse);
  } catch (e) {
    res.status(400).json(e);
  }
}
