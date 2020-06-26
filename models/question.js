const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  formId: String,
  question: String,
  questionType: {
    type: String,
    enum: ["MC", "Text", "Checkbox", "Paragragh"],
    default: "Text",
  },
  options: { type: Array, default: ["option 1"] }, //array of strings
});

module.exports = mongoose.model("Question", questionSchema);
