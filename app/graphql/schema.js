const {buildSchema} = require("graphql");
const rootValue = require("./resolver");

const schema = buildSchema(`
    type User {
        id: Int!
        name: String!
        imageUrl: String
        password: String!
        phoneNumber: String!
    }

    type Query {
        users(id: Int): [User]
    }

    type Mutation {
        updateUser(id: Int!, name: String, password: String, phoneNumber: String, imageUrl: String): User
        createUser(name: String!, password: String!, phoneNumber: String!, imageUrl: String): User
        deleteUser(id: Int!): Boolean
    }
`);

/**
 * Exports settings for graphql middleware
 * @type {{schema: GraphQLSchema, rootValue: {user: function({id?: *}): Promise<any[]>|Promise<any|null>, users: function(): Promise<any[]>|Promise<any|null>}, graphiql: boolean}}
 */
module.exports = {
    schema,
    rootValue,
    graphiql: true,
};