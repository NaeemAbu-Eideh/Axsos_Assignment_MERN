require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT || 3000;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const app = express();
app.use(cors({ origin: clientOrigin }));
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: clientOrigin,
        methods: ["GET", "POST"],
    },
});

let messages = []; // Sensei bonus: history

io.on("connection", (socket) => {
    socket.emit("chat_history", messages);

    socket.on("join", ({ name, room }) => {
        socket.data.name = name;
        socket.data.room = room || "general";
        socket.join(socket.data.room);

        io.to(socket.data.room).emit("system_message", {
            text: `${name} joined the chat`,
            time: Date.now(),
        });
    });

    socket.on("send_message", (msg) => {
        const payload = {
            name: socket.data.name || "Anonymous",
            text: msg.text,
            room: socket.data.room || "general",
            time: Date.now(),
        };

        messages.push(payload);
        if (messages.length > 200) messages.shift();

        io.to(payload.room).emit("new_message", payload);
    });

    socket.on("disconnect", () => {
        const name = socket.data.name;
        const room = socket.data.room || "general";
        if (name) {
            io.to(room).emit("system_message", {
                text: `${name} left the chat`,
                time: Date.now(),
            });
        }
    });
});

server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
