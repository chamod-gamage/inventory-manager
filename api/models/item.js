import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  id: { type: String, required: true, index: { unique: true } },
  name: { type: String, required: true, index: { unique: true } },
  quantity: { type: Number, required: true, default: 0 },
  warehouse: { type: mongoose.Types.ObjectId, required: true },
});

const Item = mongoose.model("Item", ItemSchema);

export default Item;
