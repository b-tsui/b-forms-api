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
//     title: "Vegetable Battle",
//     description: "A grand battle between the two greatest vegetables",
//     questions: [],
//   });
//   const form2 = await new Form({
//     userId: user1.id,
//     title: "Smoothie Ingredients",
//     description:
//       "Check all of your favorite ingredients and I'll make a smoothie out of the top 5 ingredients!",
//     questions: [],
//   });
//   const question1 = await new Question({
//     formId: form1.id,
//     question: "Best Vegetable?",
//     questionType: "MC",
//     options: ["Boy Choy", "Potato"],
//   });
//   const question2 = await new Question({
//     formId: form2.id,
//     question: "Choose Smoothie Ingredients",
//     questionType: "Checkbox",
//     options: [
//       "Apple",
//       "Banana",
//       "Strawberry",
//       "Watermelon",
//       "Blueberries",
//       "Bok Choy",
//       "Pineapple",
//       "Mango",
//       "Orange",
//       "Pear",
//       "Papaya",
//       "Durian",
//       "Peach",
//       "Broccoli",
//     ],
//   });

//   const question3 = await new Question({
//     formId: form2.id,
//     question: "What is one other ingredient I can add?",
//     questionType: "Text",
//   });

//   const answer1 = await new Answer({
//     questionId: question1.id,
//     answer: "Potato",
//   });
//   const answer2 = await new Answer({
//     questionId: question1.id,
//     answer: "Potato",
//   });
//   const answer3 = await new Answer({
//     questionId: question1.id,
//     answer: "Potato",
//   });
//   const answer4 = await new Answer({
//     questionId: question1.id,
//     answer: "Potato",
//   });
//   const answer5 = await new Answer({
//     questionId: question1.id,
//     answer: "Potato",
//   });
//   const answer6 = await new Answer({
//     questionId: question1.id,
//     answer: "Potato",
//   });
//   const answer7 = await new Answer({
//     questionId: question1.id,
//     answer: "Potato",
//   });
//   const answer8 = await new Answer({
//     questionId: question1.id,
//     answer: "Potato",
//   });
//   const answer9 = await new Answer({
//     questionId: question1.id,
//     answer: "Potato",
//   });
//   const answer10 = await new Answer({
//     questionId: question1.id,
//     answer: "Bok Choy",
//   });
//   const answer11 = await new Answer({
//     questionId: question1.id,
//     answer: "Bok Choy",
//   });
//   const answer12 = await new Answer({
//     questionId: question1.id,
//     answer: "Bok Choy",
//   });
//   const answer13 = await new Answer({
//     questionId: question1.id,
//     answer: "Bok Choy",
//   });
//   const answer14 = await new Answer({
//     questionId: question1.id,
//     answer: "Bok Choy",
//   });
//   const answer15 = await new Answer({
//     questionId: question1.id,
//     answer: "Bok Choy",
//   });
//   const answer16 = await new Answer({
//     questionId: question1.id,
//     answer: "Bok Choy",
//   });
//   const answer17 = await new Answer({
//     questionId: question1.id,
//     answer: "Bok Choy",
//   });

//   form1.update({ questions: [question1] });
//   form2.update({ questions: [question2, question3] });

//   await user1.save();
//   await question1.save();
//   await question2.save();
//   await question3.save();
//   await form1.save();
//   await form2.save();
//   await answer1.save();
//   await answer2.save();
//   await answer3.save();
//   await answer4.save();
//   await answer5.save();
//   await answer6.save();
//   await answer7.save();
//   await answer8.save();
//   await answer9.save();
//   await answer10.save();
//   await answer11.save();
//   await answer12.save();
//   await answer13.save();
//   await answer14.save();
//   await answer15.save();
//   await answer16.save();
//   await answer17.save();
// };

mongoose.connection.once("open", () => {
  console.log("conneted to database");
});
