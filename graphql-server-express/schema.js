const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");
const axios = require("axios");

// Hardcoded data
// const customers = [
//     {
//         id: "1",
//         name: "Jane Doe",
//         email: "abc123@gmail.com",
//         age: 35
//     },
//     {
//         id: "2",
//         name: "John Smith",
//         email: "steve123@gmail.com",
//         age: 25
//     },
//     {
//         id: "3",
//         name: "Sarah Williams",
//         email: "sarahtet@gmail.com",
//         age: 32
//     }
// ];

const CustomerType = new GraphQLObjectType({
    name: "Customer",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: async (parentValue, args) => (
                // customers.filter(customer => customer.id === args.id)[0]
                (await axios["get"](`http://localhost:3000/customers/${args.id}`)).data
            )
        },
        customers: {
            type: GraphQLList(CustomerType),
            resolve: async () => ((await axios["get"](`http://localhost:3000/customers`)).data)
        }
    }
});

// Mutations Query
const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addCustomer: {
            type: CustomerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: async (parentValue, args) => ((await axios["post"]("http://localhost:3000/customers", {name: args.name, email: args.email, age: args.age})).data)
        },
        deleteCustomer: {
            type: CustomerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parentValue, args) => ((await axios["delete"](`http://localhost:3000/customers/${args.id}`)).data)
        },
        editCustomer: {
            type: CustomerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve: async (parentValue, args) => ((await axios["patch"](`http://localhost:3000/customers/${args.id}`, args)).data)
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});