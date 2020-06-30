require("../config");
const User = require("../models/user");
const Form = require("../models/form");
const Question = require("../models/question");
const Answer = require("../models/answer");
const { response } = require("express");

const resolvers = {
  Query: {
    //find all users
    users: async () => await User.find({}).exec(),
    //find user based on email
    user: async (parent, args, ctx, info) =>
      await User.findById(args.id).exec(),
    userForms: async (parent, args, ctx, info) => {
      let user = await User.findOne({ email: args.userEmail }).exec();
      return await Form.find({ userId: user.id }).exec();
    },
    form: async (parent, args, ctx, info) =>
      await Form.findById(args.id).exec(),
    formQuestions: async (parent, args, ctx, info) =>
      await Question.find(args).exec(),
  },
  Mutation: {
    addUser: async (_, { input }, { token, error }) => {
      //error from token validation
      if (error) {
        throw new Error(error);
      }
      try {
        let user = await User.findOne({ email: input.email }).exec();
        if (user) {
          return user;
        } else {
          let response = await User.create(input);
          return response;
        }
      } catch (e) {
        return e.message;
      }
    },
    addForm: async (_, { input }, { error }) => {
      if (error) {
        throw new Error(error);
      }
      try {
        if (input.userEmail) {
          let user = await User.findOne({ email: input.userEmail });

          input.userId = user.id;
          let response = await Form.create(input);
          await Question.create({ formId: response.id });
          return response;
        } else {
          let response = await Form.create(input);
          await Question.create({ formId: response.id });
          return response;
        }
      } catch (e) {
        return e.message;
      }
    },
    updateForm: async (_, { input }, { error }) => {
      if (error) {
        throw new Error(error);
      }
      try {
        let response = await Form.findByIdAndUpdate(input.id, input);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    deleteForm: async (_, { input }, { error }) => {
      if (error) {
        throw new Error(error);
      }
      try {
        let form = await Form.findByIdAndDelete(input.id).exec();
        let questions = await Question.find({ formId: input.id }).exec();
        questions.forEach(async (question) => {
          await Answer.deleteMany({ questionId: question.id });
          await Question.findByIdAndDelete(question.id);
        });
        return form;
      } catch (e) {
        return e.message;
      }
    },
    addQuestion: async (_, { input }, { error }) => {
      if (error) {
        throw new Error(error);
      }
      try {
        let response = await Question.create(input);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    deleteQuestion: async (_, { input }, { error }) => {
      if (error) {
        throw new Error(error);
      }
      try {
        let response = await Question.findByIdAndDelete(input.id);
        await Answer.deleteMany({ questionId: input.id });
        return response;
      } catch (e) {
        return e.message;
      }
    },
    updateQuestion: async (_, { input }, { error }) => {
      if (error) {
        throw new Error(error);
      }
      try {
        let response = await Question.findByIdAndUpdate(input.id, input);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    addAnswer: async (_, { input }) => {
      try {
        let response = await Answer.create(input);
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },

  Form: {
    user: async (parent, args, ctx, info) => {
      return await User.findById(parent.userId).exec();
    },
    questions: async (parent, args, ctx, info) => {
      return await Question.find({ formId: parent.id }).exec();
    },
    answerCount: async (parent, args, ctx, info) => {
      let q = await Question.findOne({ formId: parent.id });
      let count = Answer.count({ questionId: q.id });
      return count ? count : 0;
    },
  },
  User: {
    forms: async (parent, args, ctx, info) => {
      return await Form.find({ userId: parent.id }).exec();
    },
  },
  Question: {
    answers: async (parent, args, ctx, info) => {
      return await Answer.find({ questionId: parent.id }).exec();
    },
  },
};

module.exports = resolvers;
