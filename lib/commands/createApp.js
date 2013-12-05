var func = require('func');
var partial = func.partial;

var iter = require('iter');
var some = iter.some;


var routes = [];

function dispatchRoute (state) {

  some(routes, function (route) {

    if (state.uri === route.uri) {
      route.controller({}, {});
      return true;
    }
    return false;

  });

}


function add (type, uri, controller) {
  routes.push({
    controller: controller,
    type: type,
    uri: uri
  });
}


module.exports = function createClient () {

  return {
    add: add,
    get: partial(add, 'get'),
    post: partial(add, 'post'),
    put: partial(add, 'put'),
    del: partial(add, 'del'),
    dispatchRoute: dispatchRoute
  };
};
