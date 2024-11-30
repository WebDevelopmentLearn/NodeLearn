import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const messagesOfRooms = [];

app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send("Hello World");
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);

        const targetRoom = messagesOfRooms.filter((el) => {
            return el.room === data;
        })
        console.log(targetRoom);
        socket.emit("load_history", targetRoom);
    });

    socket.on("leave_room", (data) => {
        socket.leave(data);
        console.log(`User with ID: ${socket.id} left room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        messagesOfRooms.push(data)
        console.log(messagesOfRooms);
    });
});

server.listen(PORT, () => {
    console.log(`Server starting on http://localhost:${PORT}`);
});