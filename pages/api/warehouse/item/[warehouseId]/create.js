// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Item } from "../../../../../api/models";

export default async function handler(req, res) {
  await dbConnect();
  const { name, quantity } = req.query;
  const { warehouseId } = req.params;
  try {
    const item = await Item.create({ name, quantity, warehouse: warehouseId });
    res.status(200).json(item);
  } catch (e) {
    res.status(400).json(e);
  }
}
