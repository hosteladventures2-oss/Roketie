module.exports = function startCountdown(io, count_down, countdownInterval, arra_names, startIndex = 0) {
  let index = startIndex;

  function runCountdown() {
    clearInterval(countdownInterval);
    let countdownValue = count_down;

    // Emit initial countdown value
    io.emit("countdown_update", countdownValue);

    countdownInterval = setInterval(() => {
      countdownValue--;

      if (countdownValue > 0) {
        io.emit("countdown_update", countdownValue);
      } else {
        io.emit("countdown_update", 0);
        clearInterval(countdownInterval);

        // ✅ Display the *current* name after countdown ends
        if (index < arra_names.length) {
          const currentName = arra_names[index];
          io.emit("display_name", currentName);
        }

        // ✅ Only continue automatically if it was from Start button
        // (the restart button manually triggers the next)
      }
    }, 1000);
  }

  runCountdown();
};
