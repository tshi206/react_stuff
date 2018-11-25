// Make socket connection
const socket = io.connect("{{hostname}}");

// Query DOM
const message = document.getElementById("message");
const handle = document.getElementById("handle");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

// Emit events
btn.addEventListener("click", () => {
    socket.emit("chat", {
        message: message.value,
        handle: handle.value
    })
});

message.addEventListener("keypress", () => {
    socket.emit("typing", {
        username: !handle.value ? `Unknown User at socket id ${socket.id}` : handle.value
    })
});

// Listen for events
socket.on("chat", data => {
    output.innerHTML += "<p><strong>" +
        data.handle +
        ": </strong>" +
        data.message +
        "</p>";
    feedback.innerHTML = "";
});

socket.on("typing", username => {
    feedback.innerHTML = "<p><em>" +
        username +
        " is typing a message...</em></p>"
});