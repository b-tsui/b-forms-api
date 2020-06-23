require("../config");
const User = require("../models/user");
const Form = require("../models/form");
const Question = require("../models/question");
const Answer = require("../models/answer");

const resolvers = {
  Query: {
    //find all users
    users: async () => await User.find({}).exec(),
    //find user based on email
    user: async (parent, args, ctx, info) =>
      await User.findById(args.id).exec(),
    userForms: async (parent, { input }, ctx, info) => {
      return await Form.find(input).exec();
    },
    form: async (parent, args, ctx, info) =>
      await Form.findById(args.id).exec(),
    formQuestions: async (parent, args, ctx, info) =>
      await Question.find(args).exec(),
  },

  Mutation: {
    addUser: async (_, { input }, { token, error }) => {
      console.log(input.email);
      //error from token validation
      if (error) {
        throw new Error(error);
      }
      try {
        let user = await User.findOne({ email: input.email }).exec();
        if (user) {
          return user;
        } else {
          let response = await User.create(input).exec();
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
        let response = await Form.create(input).exec();
        return response;
      } catch (e) {
        return e.message;
      }
    },
    addQuestion: async (_, { input }, { error }) => {
      if (error) {
        throw new Error(error);
      }
      try {
        let response = await Question.create(input).exec();
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
        let response = await Question.findByIdAndDelete(input.id).exec();
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
        let response = await Question.findByIdAndUpdate(input.id, input).exec();
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
  },
  User: {
    forms: async (parent, args, ctx, info) => {
      return await Form.find({ userId: parent.id }).exec();
    },
  },
};

module.exports = resolvers;
