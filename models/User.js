import mongoose, { mongo } from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxLength: 30 },
    username: { type: String, required: true, maxLength: 30 },
    email: { type: String, required: true, maxLength: 35 },
    password: {
      type: String,
      required: true,
      maxLength: 50,
    },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);
