module.exports = function responseHTML (io) {
  io.res.send(io.container.innerHTML);
}
