const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    formId: String,
    question: String,
    questionType: { type: String, enum: ["MC", "Text"] },
    options: Array, //array of strings
  }
  //{ discriminatorKey: "type" }
);

// const Question = mongoose.model("Question", questionSchema);

// const MCQuestion = Question.discriminator(
//   "MC",
//   new mongoose.Schema({ options: Array })
// );

module.exports = mongoose.model("Question", questionSchema);
