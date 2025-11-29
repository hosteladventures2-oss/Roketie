// server.js
const express = require('express');
const http = require('http');
const app = express();
const {Server} = require('socket.io');
const cors = require('cors');
const send = require('./Sendphp')
const path = require('path');
const PORT = process.env.PORT | 3001;

app.use(cors())

app.use(express.static(path.join(__dirname+'/public')))

let user_names = [];
let Rooms = [];

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'], // Specify allowed origins
    methods: ["GET", "POST"]
  }
});

  
const axios = require('axios');

const data = {
  name: 'Kevin Mukoya',
  email: 'kevin@example.com',
};

axios.post('http://myviews.atwebpages.com/Node_php/Fetch.php', data)
  .then(response => {
    console.log('Response from PHP backend:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
  
  
  server.listen(PORT, () => {
    console.log("SERVER IS RUNNING");
  });