var registry = require('super-registry');
var map = require('super-iter').map;


function getRoutes (template) {

  var nodes = template.querySelectorAll('[data-sp-route]');

  if (nodes.length) {
    return map(nodes, function (node) {
      return {
        componentType: node.getAttribute('data-sp-component'),
        path: node.getAttribute('data-sp-route'),
        defaultPath: node.getAttribute('data-sp-default-route')
      }
    });
  }
  else {
    return [];
  }

}

module.exports = function initComponentType (element, html) {

  element.innerHTML = html;

  var template = element.querySelector('[data-sp-component-type]');
  var name = template.getAttribute('data-sp-component-type');

  var componentType = {
    html: html,
    name: name,
    id: name,
    params: template.getAttribute('data-sp-params'),
    routes: getRoutes(template)
  };

  registry.add(componentType);

  return componentType;

};
