const { gql } = require('apollo-server-express');

const typeDefs = gql `

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addThought(thoughtData: ThoughtInput!): User
        removeThought(reactionId: String!): User
    }

    input ThoughtInput{
        reactionId : ID
        reactionBody : String
        username : String
        createdAt : String
        
    }

    type User {
        _id: ID
        username: String
        email: String

    }

    input ThoughtInput{
        reactionId : ID
        reactionBody : String
        username : String
        createdAt : String
    }

    type Auth {
        token: ID
        user: User
    }
`

module.exports = typeDefs;