import mongoose from "mongoose";

const WarehouseSchema = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  location: { type: String, required: true },
});

const Warehouse =
  mongoose.models.Warehouse || mongoose.model("Warehouse", WarehouseSchema);

export default Warehouse;
