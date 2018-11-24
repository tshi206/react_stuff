const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const { mongoURI, mongoURI_DEV } = require("./config");
const users = require('./routes/users');

(async () => {
    try {
        const app = express();

        // Allow cross-origin request
        app.use(cors());

        // Body Parser Middleware
        app.use(bodyParser.json());

        // Passport Middleware
        app.use(passport.initialize({ userProperty: "user" })); // add a "user" property to each request object. it will be used as a placeholder for whatever object later on get signed by jwt.sign when the token is issued
        app.use(passport.session({ pauseStream: false }));
        require("./passport")(passport);

        // DB connection
        const URI = process.env.NODE_ENV === "production" ? mongoURI : mongoURI_DEV;
        await mongoose.connect(URI, { useNewUrlParser: true });
        console.log(`MongoDB connected to URI ${URI}`);

        // Middleware and routes
        app.use('/users', users);

        // Serve static assets if in production
        if (process.env.NODE_ENV === "production") {
            // Set static folder
            app.use(express.static("public"));
            // If the route does not hit apis pattern above, return the index.html from 'public' folder
            app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, "public", "index.html"))
            });
        }

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
})();