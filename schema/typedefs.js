const { gql } = require("apollo-server-express");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  type User {
    id: ID!
    name: String
    email: String
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

  type Question {
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

  input AddFormInput {
    userId: ID!
    title: String!
    description: String
  }

  input AddQuestionInput {
    formId: ID!
  }

  input DeleteQuestionInput {
    id: ID!
  }

  input UpdateQuestionInput {
    id: ID!
    formId: ID!
    question: String
    questionType: String
    options: [String]
  }

  type Query {
    users: [User] #finds all users
    user(id: ID): User #find user by id
    userForms(userId: ID): [Form] #find all forms for a user @id
    form(id: ID): Form #for form by id
    formQuestions(formId: ID): [Question]
  }

  type Mutation {
    addUser(input: AddUserInput!): User!
    addForm(input: AddFormInput!): Form!
    addQuestion(input: AddQuestionInput!): Question!
    deleteQuestion(input: DeleteQuestionInput!): Question!
    updateQuestion(input: UpdateQuestionInput!): Question!
  }
`;

module.exports = typeDefs;
