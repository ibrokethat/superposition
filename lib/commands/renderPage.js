var core = require('../core');

var promise = core.async.promise;
var whenAll = core.async.whenAll;
var reduce = core.iter.reduce;
var registry = core.registry;


function render (route, componentType, io) {

  var p = promise();
  var resolve = p.resolve.bind(p, io);

  function renderChild (acc, child) {

    var componentType = registry.get(child.getAttribute('data-sp-component'));

    if (!componentType.route || componentType.route === route) {

      acc.push(render(route, componentType, {
        req: io.req,
        container: child
      }));
    }

    return acc;
  }


  if (componentType.children) {

    whenAll(reduce(componentType.children, renderChild, [])).then(resolve, resolve);
  }
  else {

    resolve();
  }


  var html = componentType.template.cloneNode(true);

  io.container.innerHTML = html.innerHTML;

  return p;
}


module.exports = function renderPage (document, body, route, io) {

  var p = promise();
  var resolve = p.resolve.bind(p, io);

  io.container = document;
  document.body.innerHTML = '';
  body = registry.get(body);

  render(route, body, {
    req: io.req,
    container: document.body
  }).then(resolve, resolve);

  return p;
};
