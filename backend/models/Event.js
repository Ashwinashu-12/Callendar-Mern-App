import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String },
  allDay: { type: Boolean, default: false },
});

export default mongoose.model("Event", eventSchema);
