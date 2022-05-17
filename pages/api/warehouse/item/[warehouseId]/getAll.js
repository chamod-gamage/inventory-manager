// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../../../../api/lib/dbConnect";

import { Item } from "../../../../../api/models";

export default async function handler(req, res) {
  await dbConnect();
  const { warehouseId } = req.query;
  try {
    const items = await Item.find({ warehouse: warehouseId }).populate(
      "warehouse",
      "name",
      "Warehouse"
    );
    res.status(200).json(items);
  } catch (e) {
    res.status(400).json(e);
  }
}
