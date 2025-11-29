const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: "http://localhost:3000" })); // React client

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Polling interval (e.g., every 5 seconds)
const POLLING_INTERVAL = 30000;
let previousData = null;

// Function to fetch data from PHP backend
const fetchDataFromPHP = async () => {
  
  try {
    const response = await axios.post("http://myviews.atwebpages.com/Node_php/Socket.php");
    const data_URL = response.data;
   
    if (JSON.stringify(data_URL) !== JSON.stringify(previousData)) {
      // Emit only if data has changed
      io.emit("message_URL", data_URL);
      previousData = data_URL; // Update previous data
    }
  } catch (error) {
    console.error("Error fetching data from PHP backend:", error.message);
  }
};

// Start polling for updates
setInterval(fetchDataFromPHP, POLLING_INTERVAL);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("messages", (data) => {
    console.log("Message from client:", data);
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
