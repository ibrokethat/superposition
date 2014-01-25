module.exports = function responseJSON (io) {
  io.res.json(io.json);
}
