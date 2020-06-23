const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  formId: String,
  question: String,
  questionType: { type: String, enum: ["MC", "Text"], default: "Text" },
  options: Array, //array of strings
});

module.exports = mongoose.model("Question", questionSchema);
