const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    createdAt: String
    updatedAt: String
    books: [Book!]!
  }

  type Book {
    _id: ID!
    title: String!
    author: String!
    user: User!
    createdAt: String
    updatedAt: String
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  input UpdateUserInput {
    name: String
    email: String
  }

  input CreateBookInput {
    title: String!
    author: String!
  }

  input UpdateBookInput {
    title: String
    author: String
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    booksByUser(userId: ID!): [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!

    createBook(userId: ID!, input: CreateBookInput!): Book!
    updateBook(id: ID!, input: UpdateBookInput!): Book!
    deleteBook(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
