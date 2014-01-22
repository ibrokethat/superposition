var registry = require('super-registry');
var map = require('super-iter').map;


function getRoutes (template) {

  var nodes = template.querySelectorAll('[data-sp-route]');

  if (nodes.length) {
    return map(nodes, function (node) {
      return {
        path: node.getAttribute('data-sp-route'),
        defaultRoute: node.getAttribute('data-sp-default-route')
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
console.log(componentType)
  registry.add(componentType);

  return componentType;

};
