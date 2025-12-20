const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("Nice to meet you. (shake hand)");
    socket.emit("welcome", "Welcome to my app");

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

})

const PORT = 3000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
});