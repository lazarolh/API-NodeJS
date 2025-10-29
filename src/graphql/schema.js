/**
 * @file schema.js
 * @description Define el esquema GraphQL: tipos, queries y mutations.
 * Usa el sistema de tipos GraphQL con gql de Apollo Server.
 */
const { gql } = require('apollo-server');

const typeDefs = gql`
#Tipos principales
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
    genre: String
    year: Int
    createdAt: String
    updatedAt: String
  }
  type BookStats {
    _id: String
    total: Int
    latestYear: Int
  }

  extend type Query {
    books(search: String, genre: String, sortByYear: String, limit: Int, skip: Int): [Book]
    bookStatsByGenre: [BookStats]
  }
#Inputs
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
    genre: String!
    year: Int

  }

  input UpdateBookInput {
    title: String
    author: String
    genre: String
    year: Int

  }
#Consultas
  type Query {
    users: [User!]!
    user(id: ID!): User
    booksByUser(userId: ID!): [Book!]!
    book(id: ID!): Book
  }
  #Mutaciones para crear, editar y eliminar
  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!

    createBook(userId: ID!, input: CreateBookInput!): Book!
    updateBook(id: ID!, input: UpdateBookInput!): Book!
    deleteBook(id: ID!): Boolean!
  }
`;

module.exports =  typeDefs;
