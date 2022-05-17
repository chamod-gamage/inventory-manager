import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  quantity: { type: Number, required: true, default: 0, min: 0 },
  warehouse: { type: mongoose.Types.ObjectId, required: true },
});

ItemSchema.index({ name: 1, warehouse: 1 }, { unique: true });

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);

export default Item;
