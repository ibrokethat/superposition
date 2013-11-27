var core = require('../core');

var promise = core.async.promise;
var whenAll = core.async.whenAll;
var map = core.iter.map;
var registry = core.registry;


module.exports = function render (componentType, io) {

  var p = promise();
  var resolve = p.resolve.bind(p, io);


  function renderChild (child) {

    var componentType = registry.get(child.dataset.spComponent);

    return render(componentType, {
      req: io.req,
      container: child
    });

  }


  if (componentType.children) {

    whenAll(map(componentType.children, renderchild)).then(resolve, resolve);
  }
  else {

    resolve();
  }


  var html = componentType.template.cloneNode(true);

  if (io.container) {
    io.container.appendChild(html);
  }
  else {
    io.container = html;
  }

  return p;

};
