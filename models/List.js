import mongoose, { mongo } from "mongoose";
import User from "./User";
const ListSchema = new mongoose.Schema(
  {
    value: { type: Number, required: true },
    type: { type: String, required: true, maxLength: 30 },
    description: { type: String, required: true, maxLength: 100 },
    category: { type: String, required: true, maxLength: 30 },
    inserted: { type: Date, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  { timestamps: true }
);
export default mongoose.models.List || mongoose.model("List", ListSchema);
