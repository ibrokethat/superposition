var CONF = require('config');

var async = require('super-async');
var func = require('super-func');
var iter = require('super-iter');
var registry = require('super-registry');

var promise = async.promise;
var partial = func.partial;
var whenAll = async.whenAll;
var reduce = iter.reduce;
var some = iter.some;


var getDocument = require('./getDocument');



function render (element, route, componentType, io) {

  function renderChild (acc, componentContainer) {

    var componentType = registry.get(componentContainer.getAttribute('data-sp-component'));
    var containerRoute = componentContainer.getAttribute('data-sp-route') || componentContainer.getAttribute('data-sp-default-route');

    if (!containerRoute || containerRoute === route) {
      componentContainer.setAttribute('data-sp-active-panel', true);
      acc.push(render(element, route, componentType, {
        req: io.req,
        container: componentContainer
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


module.exports = function renderPage (route, io) {

  var p = promise();
  var resolve = p.resolve.bind(p, io);

  io.container = getDocument();

  body = registry.get(io.container.body.getAttribute('data-sp-component'));

  render(io.container.createElement('div'), route, body, {
    req: io.req,
    container: io.container.body
  }).then(resolve, resolve);

  return p;
};
