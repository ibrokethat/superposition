var request = require('./request');

module.exports = function requestComponent (componentType, io) {

  var type = componentType.method || 'get';
  var uri = componentType.uri;
  var response = componentType.response || 'html';

  return request(type, uri, response, io);
}
