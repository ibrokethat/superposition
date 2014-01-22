module.exports = function response (io) {
  io.res.json(io.json);
}
