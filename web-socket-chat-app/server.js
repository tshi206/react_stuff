const express = require('express');
const path = require('path');
const socket = require('socket.io');
const fs = require('fs');
const promisfy = require('util').promisify;
const readFile = promisfy(fs.readFile);
const writeFile = promisfy(fs.writeFile);
// fs.readFile(someFile, 'utf8', function (err,data) {
//     if (err) {
//         return console.log(err);
//     }
//     var result = data.replace(/string to be replaced/g, 'replacement');
//
//     fs.writeFile(someFile, result, 'utf8', function (err) {
//         if (err) return console.log(err);
//     });
// });

(async () => {
    const app = express();

    const PORT = process.env.PORT || 4000;

    // see if in production
    const hostname = process.env.PORT ? `https://web-socket-chat-app.herokuapp.com/:${PORT}` : `http://localhost:${PORT}`;

    const server = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

    // Middleware and routes
    app.get("/app.js", async (req, res) => {
        // make this particular route having higher priority than static files since we need to pre-process the app.js before serving it
        const appJS = path.join(__dirname, 'public', 'app.js');
        const appJSTemplate = path.join(__dirname, 'templates', 'app.js');

        const str = await readFile(appJSTemplate, 'utf8');
        const parsedStr = str.replace(/{{hostname}}/g, hostname);
        await writeFile(appJS, parsedStr, 'utf8');
        res.sendFile(appJS)
    });

    app.use(express.static('public'));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'))
    });

    // Socket setup
    const io = socket(server);

    // Each client will have its own socket upon successfully established socket connection. Those individual 'socket' objects will get passed in to this event listener's callback whenever a new socket connection is established between the client and the server.
    io["on"]('connection', socket => {
        console.log('socket connection established', 'with the server at:', socket.handshake.headers.host, '; socket id:', socket.id);
        socket.on('chat', data => {
            io["sockets"].emit('chat', data)
        });
        socket.on('typing', data => {
            // emit to every other clients but not the sender who originates the message
            socket["broadcast"].emit('typing', data["username"]); // flatten the payload and send a string back instead of sending back the original payload object; client should expect a string back upon listening to the 'typing' events on the socket.
        })
    });
})();