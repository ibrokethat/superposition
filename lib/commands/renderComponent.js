var getDocument = require('./getDocument');

var async = require('async');
var iter = require('iter');
var registry = require('registry');

var promise = async.promise;
var whenAll = async.whenAll;
var map = iter.map;


function render (element, componentType, io) {

  function renderChild (child) {

    var componentType = registry.get(child.getAttribute('data-sp-component'));

    return render(element, componentType, {
      req: io.req,
      container: child
    });
  }

  var p = promise();
  var resolve = p.resolve.bind(p, io);

  element.innerHTML = componentType.html;

  var template = element.querySelector('[data-sp-component-type]');
  var children = template.querySelectorAll('[data-sp-component]');

  if (children.length) {

    whenAll(map(children, renderChild)).then(resolve, resolve);
  }
  else {

    resolve();
  }

  io.container.appendChild(template);

  return p;

};


module.exports = function renderComponent (componentType, io) {

  var p = promise();
  var resolve = p.resolve.bind(p, io);
  var document = getDocument();

  io.container = document.createElement('div');

  render(document.createElement('div'), componentType, {
    req: io.req,
    container: io.container
  }).then(resolve, resolve);

  return p;
};
