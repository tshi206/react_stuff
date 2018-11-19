const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema");

const app = express();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql:true
}));

app.listen("4000", () => {
    console.log("GraphQL Server is running on port 4000")
});