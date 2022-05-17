// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../../../api/lib/dbConnect";
import { Item, Warehouse } from "../../../../api/models";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;
  try {
    if ((await Item.find({ warehouse: id })).length)
      throw new Error("Cannot delete warehouse with items");
    const warehouse = await Warehouse.findByIdAndDelete(id);
    res.status(200).json(warehouse);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
