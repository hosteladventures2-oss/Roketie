// server.js
const bodyParser = require("body-parser");
const express = require('express');
const http = require('http');
const app = express();
const {Server} = require('socket.io');
const cors = require('cors');
const send = require('./Sendphp')
const path = require('path');
const math = require('./Requires/Math')
const FC = require('./Requires/fetchcomponent1')
const PORT = process.env.PORT | 3001;

app.use(cors())



let user_names = [];
let Rooms = [];



const server = http.createServer(app)

app.use(bodyParser.json());

// Routes
app.post("/api/component1", FC);

server.listen(PORT, () => {
    console.log("SERVER IS RUNNING");
});