import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  priority: { type: Number, required: true },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task", taskSchema);
