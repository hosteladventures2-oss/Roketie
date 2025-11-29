let countdownInterval = null; // single interval
const names = ['jade', 'frank', 'steve', 'joe', 'albert'];

module.exports = function New_name_loop(currentIndexRef, io, next = false, data, time_count) {
  const room = data?.room || null;

  if (!room) {
    console.error("❌ Room not provided in New_name_loop call");
    return;
  }

  // ✅ Function to start the countdown loop
  const startCountdown = () => {
    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
      currentIndexRef.value++;
      if (currentIndexRef.value >= names.length) {
        currentIndexRef.value = 0;
      }
      const currentName = names[currentIndexRef.value];
      io.to(room).emit("current_index", currentName);
    }, time_count.value);
  };

  // ✅ If "Next" button was clicked
  if (next) {
    // Move to next name
    currentIndexRef.value++;
    if (currentIndexRef.value >= names.length) {
      currentIndexRef.value = 0;
    }

    // Reset timer duration
    time_count.value = 8000;

    // Emit new name immediately
    const currentName = names[currentIndexRef.value];
    io.to(room).emit("current_index", currentName);

    // Restart countdown cleanly
    startCountdown();
    return;
  }

  // ✅ If this is a countdown start (from Restart)
  if (countdownInterval) clearInterval(countdownInterval);

  // Start from first name
  currentIndexRef.value = 0;
  io.to(room).emit("current_index", names[currentIndexRef.value]);

  // Begin countdown
  startCountdown();
};
