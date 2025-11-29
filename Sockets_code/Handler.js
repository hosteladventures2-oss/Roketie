// chatHandler.js
module.exports = function chatHandler(socket, io, messages) {
  socket.on("send_message", (data) => {
    messages.push(data); // save to history

    // Broadcast to everyone
    io.emit("receive_message", data);
  });
};
