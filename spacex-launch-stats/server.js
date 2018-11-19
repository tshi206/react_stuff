const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const schema = require("./schema");
const path = require("path");

const app = express();

// Allow cross-origin request
app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.use(express.static("public"));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"))
});

const PORT = process.env.POST || 5000;

app.listen(PORT, () => console.log(`GraphQL Server started on port ${PORT}`));