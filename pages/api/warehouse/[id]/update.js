// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "../../../../api/lib/dbConnect";
import { Warehouse } from "../../../../api/models";

export default async function handler(req, res) {
  await dbConnect();

  const { name, location } = req.body;
  const { id } = req.query;
  try {
    if ((await Warehouse.find({ name })).length)
      throw new Error("Name already exists");
    const warehouse = await Warehouse.updateOne(
      { _id: id },
      { name, location },
      { omitUndefined: true }
    );
    res.status(200).json(warehouse);
  } catch (e) {
    res.status(400).json(e);
  }
}
