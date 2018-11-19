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

// Heroku dynamically assigns your app a port, so you can't set the port to a fixed number. Heroku adds the port to the env, so you can pull it from there. Switch the hardcoded port number to this. That way it'll still listen to port 5000 when you test locally (i.e., process.env.PORT is undefined), but it will also work on Heroku.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`GraphQL Server started on port ${PORT}`));