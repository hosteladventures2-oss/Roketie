const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const New_name_loop = require("./Sockets_code/New_name_loop");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// 👇 Use an object to hold currentIndex so it can be modified by reference
let currentIndexRef = { value: 0 };
let time_count = {value: 8000}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);


  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    console.log(`Socket ${socket.id} joined room ${roomName}`);
  });

  socket.on("restart_countdown", (data) => {
    const { room, message } = data;
    New_name_loop(currentIndexRef, io, false, data, time_count);
  });

  socket.on("next", (data) => {
    const { room, message } = data;
    New_name_loop(currentIndexRef, io, true, data, time_count);
  });

  socket.emit("current_index", currentIndexRef.value);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
