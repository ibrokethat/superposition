

module.exports = function response (io) {
  io.res.send(io.container.innerHTML);
}
