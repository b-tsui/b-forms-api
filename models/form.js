const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      default: "New Form",
      required: true,
    },
    description: { type: String, default: "Form description goes here" },
    questions: Array,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Form", formSchema);
