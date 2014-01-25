module.exports = function insertHTML (io) {
  io.container.innerHTML = io.data;
  return io;
}
