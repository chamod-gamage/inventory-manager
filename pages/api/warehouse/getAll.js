// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../../api/lib/dbConnect";
import { Warehouse } from "../../../api/models";

export default async function handler(req, res) {
  await dbConnect();

  try {
    const warehouses = await Warehouse.find({});
    res.status(200).json(warehouses);
  } catch (e) {
    res.status(400).json(e);
  }
}
