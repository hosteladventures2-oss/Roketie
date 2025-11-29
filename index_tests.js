// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const chatHandler = require("./Sockets_code/Handler"); // import handler
const name_hamndler = require("./Sockets_code/Names")
const count_down = require("./Sockets_code/Count_down")
const hello_world = require("./Sockets_code/Hello_world"); // import handler


const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // frontend
    methods: ["GET", "POST"],
  },
});

let messages = [];
let names = [];
let arra_names = ['joe', 'ken', 'peter', 'amanda', 'Keith'];
let countdownInterval;
let count_downs = 7;

// 👇 make index global to keep track of which name we’re on
let currentIndex = 0;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("chat_history", messages);

  socket.on("start_countdown", () => {
    console.log("Countdown started");

    currentIndex = 0; // reset to the first name
    count_down(io, count_downs, countdownInterval, arra_names, currentIndex);
  });

  socket.on("restart_countdown", () => {
    console.log("Restart requested");

    // move to the next name
    currentIndex++;

    if (currentIndex >= arra_names.length) {
      io.emit("countdown_end");
      console.log("No more names left.");
      return;
    }

    // restart countdown for next name
    count_down(io, count_downs, countdownInterval, arra_names, currentIndex);
  });

  name_hamndler(socket, io, names);
  chatHandler(socket, io, messages);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
