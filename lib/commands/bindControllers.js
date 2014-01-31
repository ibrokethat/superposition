var forEach = require('super-iter').forEach;
var bindListener = require('./bindListener');

function eventMap (e) {
  return e;
}

module.exports = function bindControllers (controllers, io) {

  var containers = io.container.querySelectorAll('[data-sp-controller]');

  if (containers) {

    forEach(containers, function(container) {

      var controller = controllers[container.getAttribute('data-sp-controller')];

      if (controller) {

        forEach(controller, function (listener, bindings) {

          var bindings = bindings.split(":");

          var event = eventMap(bindings[0]);
          var action = bindings[1];

          bindListener(container, event, listener, action);
          // cacheControllers(container, event, bindListener(container, event, listener, action));

        });

      }

    });

  }

  return io;

};
