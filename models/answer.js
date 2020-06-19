const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  questionId: String,
  answer: String,
});

module.exports = mongoose.model("Answer", answerSchema);
