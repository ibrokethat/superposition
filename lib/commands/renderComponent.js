var jsdom = require('jsdom').jsdom;
var core = require('../core');

var promise = core.async.promise;
var whenAll = core.async.whenAll;
var map = core.iter.map;
var registry = core.registry;


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


module.exports = function renderComponent (index, componentType, io) {

  var p = promise();
  var resolve = p.resolve.bind(p, io);
  var document = jsdom(index);

  io.container = document.createElement('div');

  render(document.createElement('div'), componentType, {
    req: io.req,
    container: io.container
  }).then(resolve, resolve);

  return p;
};
