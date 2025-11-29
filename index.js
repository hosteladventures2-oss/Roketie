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


const arr_alt = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 
14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000, 30000, 
31000, 32000, 33000, 34000, 35000, 36000, 37000, 38000, 39000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000];

const arr = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 
14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000, 30000, 
31000, 32000, 33000, 34000, 35000, 36000, 37000, 38000, 39000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000];

const arr_2 = [500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 70000];

const arr_3 = [500, 1000, 2000, 3000, 5000, 6000, 7000, 8000, 9000, 60000];

const arr_4 = [500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 50000];

const arr_5 = [500, 1000, 2000, 3000, 4000, 5000];

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

  const randomElement = current_array[Math.floor(Math.random() * current_array.length)];
  currentRandom = randomElement;   // store it
  current_array = arr
  set_level()
  
 io.emit("receive_random_number", currentRandom);

 count_num(randomElement)

 setTimeout(() => {

   
  
  currentCountdown = 10;

  
    
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
        if(level >= 6) level = 1;
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
