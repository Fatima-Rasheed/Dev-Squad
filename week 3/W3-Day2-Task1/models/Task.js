const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const taskSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,  // ✅ auto-generate UUID on creation
      unique: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);