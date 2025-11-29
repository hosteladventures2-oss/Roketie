module.exports = function name_hamndler(socket, io, names) {
  //add names 
  socket.on("names", (data) => {
  if (!names.includes(data)) {  // prevent duplicates
    names.push(data);
  }
  io.emit("the_names", names);
});
};