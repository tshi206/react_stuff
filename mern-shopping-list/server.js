const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { mongoURI } = require("./config");
const items = require("./routes/api/items");

(async () => {
    try {
        const app = express();

        // Allow cross-origin request
        app.use(cors());

        // Body Parser Middleware
        app.use(bodyParser.json());

        // DB connection
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("MongoDB connected...");

        // Middleware and routes
        app.use("/api/items", items);

        // Serve static assets if in production
        if (process.env.NODE_ENV === "production") {
            // Set static folder
            app.use(express.static("public"));
            // If the route does not hit apis pattern above, return the index.html from 'public' folder
            app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, "public", "index.html"))
            });
        }

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => console.log(`Express Server is running on port ${PORT}`));
    } catch (e) {
        console.log(e)
    }
})();