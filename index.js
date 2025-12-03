const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const random = require("./Sockets_code/Ranom_function");
const port = process.env.PORT||3001;

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


const arr_alt = Math.floor(Math.random() * (80000 - 1000 + 1)) + 1000;

const arr = Math.floor(Math.random() * (80000 - 1000 + 1)) + 1000;

const arr_2 = Math.floor(Math.random() * (40000 - 500 + 1)) + 500;

const arr_3 = Math.floor(Math.random() * (30000 - 500 + 1)) + 500;;

const arr_4 = Math.floor(Math.random() * (20000 - 500 + 1)) + 500;;

const arr_5 = Math.floor(Math.random() * (10000 - 500 + 1)) + 500;

const arr_6 = Math.floor(Math.random() * (8000 - 500 + 1)) + 500;

const arr_7 = Math.floor(Math.random() * (7000 - 500 + 1)) + 500;

//const arr_6 = [500, 1000, 2000, 3000, 4000];

let currentRandom = null;  // store latest random number
let randElelment_counted = null;
let take_off = null;
let currentCountdown = 14; //
let level = 1
let current_array = []



const set_level = () =>{

   if(level == 2)
   {
    current_array = arr_2
   }
  
    if(level == 3)
   {
    current_array = arr_3
   }

    if(level == 4)
   {
    current_array = arr_4
   }
   
    if(level == 5)
   {
    current_array = arr_5
   }

      if(level == 6)
   {
    current_array = arr_6
   }


      if(level == 7)
   {
    current_array = arr_7
   }

//console.log(current_array)
}

// Recursive timed loop

  const count_num = (randomElement) =>{
    randElelment_counted = randomElement
     const interval = setInterval(() => {
    randElelment_counted -= 1000;

   // console.log('time', randElelment_counted)

    io.emit("send_number_count", randElelment_counted);

    if (randElelment_counted <= 0) {
      clearInterval(interval);
    }

  }, 1000); // emit every second
  }


function startRandomLoop() {

  const randomElement = current_array;
  currentRandom = randomElement;   // store it
  current_array = arr
  set_level()
  
 io.emit("receive_random_number", currentRandom);

 count_num(randomElement)

 setTimeout(() => {

   
  
  currentCountdown = 15;

  
    
  const interval = setInterval(() => { // it keeps saying this setInterval is not a function
      io.emit("count_down", currentCountdown);
      take_off = 'not yet'
      currentCountdown--;

      if (currentCountdown <= 0) {

        currentCountdown = 0;
        take_off = 'in action'
         
       // console.log(currentCountdown)
        clearInterval(interval);
       
         level ++;
        if(level >= 7) level = 1;
        startRandomLoop();
      }

    }, 1000);
 
  }, randomElement);
}

// Start loop
startRandomLoop();

io.on("connection", (socket) => {
//let num = 2
  // 👉 SEND CURRENT VALUES IMMEDIATELY TO NEW CLIENT
  if (currentRandom !== null) {
    socket.emit("receive_random_number", currentRandom);
    socket.emit("count_down", currentCountdown);
  }

  socket.on("button_pressed", (data) => {
    console.log("Button pressed:", data);

    // reply to the client if needed
    socket.emit("take_off", take_off);
    socket.emit("receive_random_number", currentRandom);
  });

 // setInterval(()=>{},1000)

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
