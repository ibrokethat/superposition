var getDocument = require('./getDocument');

var async = require('async');
var iter = require('iter');
var registry = require('registry');

var promise = async.promise;
var whenAll = async.whenAll;
var reduce = iter.reduce;


function render (element, route, componentType, io) {

  function renderChild (acc, child) {

    var componentType = registry.get(child.getAttribute('data-sp-component'));

    if (!componentType.route || componentType.route === route) {

      acc.push(render(element, route, componentType, {
        req: io.req,
        container: child
      }));
    }

    return acc;
  }

  var p = promise();
  var resolve = p.resolve.bind(p, io);

  element.innerHTML = componentType.html;

  var template = element.querySelector('[data-sp-component-type]');
  var children = template.querySelectorAll('[data-sp-component]');

  if (children.length) {

    whenAll(reduce(children, renderChild, [])).then(resolve, resolve);
  }
  else {

    resolve();
  }

  io.container.appendChild(template);

  return p;
}


module.exports = function renderPage (body, route, io) {

  var p = promise();
  var resolve = p.resolve.bind(p, io);

  io.container = getDocument();

  body = registry.get(body);

  render(io.container.createElement('div'), route, body, {
    req: io.req,
    container: io.container.body
  }).then(resolve, resolve);

  return p;
};
