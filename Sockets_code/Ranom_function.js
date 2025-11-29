module.exports = function name_hamndler(currentCountdown, io, currentRandom, arr) {
 function startRandomLoop() {
  const randomElement = arr[Math.floor(Math.random() * arr.length)];
  currentRandom = randomElement;   // store it
  
  io.emit("receive_random_number", currentRandom);

  setTimeout(() => {
  currentCountdown = 6;
    const interval = setInterval(() => {
      io.emit("count_down", currentCountdown);
      currentCountdown--;

      if (currentCountdown <= 0) {

        currentCountdown = 0;
        clearInterval(interval);
        
        startRandomLoop();
      }
    }, 1000);

  }, randomElement);
}

// Start loop
startRandomLoop();
};