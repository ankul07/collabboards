import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  boardname: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BoardSchema = mongoose.model("Board", boardSchema);
export default BoardSchema;
