// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../../api/lib/dbConnect";
import { Warehouse } from "../../../api/models";

export default async function handler(req, res) {
  await dbConnect();

  const { name, location } = req.query;
  try {
    const warehouse = await Warehouse.create({ name, location });
    res.status(200).json(warehouse);
  } catch (e) {
    res.status(400).json(e);
  }
}
