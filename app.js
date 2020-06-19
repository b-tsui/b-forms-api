const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { checkJwt } = require("./auth");
const morgan = require("morgan");
const cors = require("cors");

require("./config");
const User = require("./models/user");
const Form = require("./models/form");
const Question = require("./models/question");
const MCQuestion = require("./models/question");
const Answer = require("./models/answer");

const userRouter = require("./routes/user");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  type User {
    id: ID!
    name: String!
    email: String!
    forms: [Form]
  }

  type Form {
    id: ID!
    user: User
    userId: ID
    title: String
    description: String
    questions: [Question]
    createdAt: String
  }

  interface Question {
    id: ID!
    formId: ID!
    question: String
    questionType: String
    options: [String]
  }

  # type TextQuestion implements Question {
  #   id: ID!
  #   formId: ID!
  #   question: String
  #   questionType: String
  # }

  # type MCQuestion implements Question {
  #   id: ID!
  #   formId: ID!
  #   question: String
  #   questionType: String
  #   options: [String]
  # }

  type Answer {
    id: String
    question: Question
    answer: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  enum AllowedQuestionType {
    MC
    Text
  }

  input UserInput {
    id: ID
    email: String
  }

  input AddUserInput {
    name: String!
    email: String!
  }

  input QuestionInput {
    formId: String!
    question: String
    questionType: AllowedQuestionType
  }

  type Query {
    users: [User]
    user(id: ID): User
    userForms(userId: ID): Form
    form(id: ID): Form
  }

  type Mutation {
    addUser(input: AddUserInput!): User!
    addForm(
      user: ID!
      title: String!
      description: String
      question: QuestionInput
    ): Form
  }
`;

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
    form: async (parent, args, ctx, info) => await Form.findById(args).exec(),
  },

  Mutation: {
    addUser: async (_, { input }) => {
      try {
        let response = await User.create(input);
        console.log("string here", response);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    addForm: async (_, args) => {
      try {
        let response = await Form.create(args);
        console.log(args);
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
  },
  User: {
    forms: async (parent, args, ctx, info) => {
      return await Form.find({ userId: parent.id });
    },
  },
  Question: {
    __resolveType(question) {
      return null;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context() {
    return { User, Question, Form, Answer, MCQuestion };
  },
});
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

app.get("/authorized", checkJwt, (req, res) => {
  res.send("Secured Resource");
});

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!",
  });
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
