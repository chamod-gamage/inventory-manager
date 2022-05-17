import mongoose from "mongoose";

const WarehouseSchema = new mongoose.Schema({
  id: { type: String, required: true, index: { unique: true } },
  name: { type: String, required: true, index: { unique: true } },
  location: { type: String, required: true, index: { unique: true } },
});

const Warehouse = mongoose.model("Warehouse", WarehouseSchema);

export default Warehouse;
