var registry = require('super-registry');
var requestComponent = require('./requestComponent');

module.exports = function requestRouteComponent (componentType, io) {

  componentType = registry.get(componentType);

  return requestComponent(componentType, io);
}
