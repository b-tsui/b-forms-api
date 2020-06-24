const mongoose = require("mongoose");
require("dotenv").config();
mongoose.Promise = global.Promise;
const User = require("./models/user");
const Form = require("./models/form");
const Question = require("./models/question");
const Answer = require("./models/answer");

const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@b-forms-l9ld2.mongodb.net/b-forms?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//   .then(async () => {
//     await Promise.all([
//       User.deleteMany({}),
//       Form.deleteMany({}),
//       Question.deleteMany({}),
//       Answer.deleteMany({}),
//     ]);
//     createSeedData();
//   });

// const createSeedData = async () => {
//   const user1 = await new User({
//     name: "demo",
//     email: "demo@demo.com",
//   });
//   const form1 = await new Form({
//     userId: user1.id,
//     title: "form1",
//     description: "form1 description",
//     questions: [],
//   });
//   const question1 = await new Question({
//     formId: form1.id,
//     question: "question1?",
//     questionType: "MC",
//     options: ["option1", "option2"],
//   });
//   const question2 = await new Question({
//     formId: form1.id,
//     question: "question2?",
//     questionType: "MC",
//     options: ["option1", "option2"],
//   });
//   const answer1 = await new Answer({
//     questionId: question1.id,
//     answer: "option1",
//   });
//   const answer2 = await new Answer({
//     questionId: question2.id,
//     answer: "option1",
//   });
//   form1.update({ questions: [question1, question2] });

//   await user1.save();
//   await question1.save();
//   await question2.save();
//   await form1.save();
//   await answer1.save();
//   await answer2.save();
// };

mongoose.connection.once("open", () => {
  console.log("conneted to database");
});
