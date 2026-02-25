import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    content: String,
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);