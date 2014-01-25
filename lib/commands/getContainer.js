module.exports = function getContainer (uri, io) {

  io.container = document.querySelector('[data-sp-route="' + uri + '"]');

  return io;
}
