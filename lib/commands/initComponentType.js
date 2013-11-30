
var registry = require('../core').registry;


module.exports = function initComponentType (element, html) {

  element.innerHTML = html;

  var template = element.querySelector('[data-sp-component-type]');
  var name = template.getAttribute('data-sp-component-type');

  var componentType = {
    html: html,
    name: name,
    id: name,
    params: template.getAttribute('data-sp-params'),
    route: template.getAttribute('data-sp-route'),
    defaultRoute: template.getAttribute('data-sp-default-route')
  };

  registry.add(componentType);

  return componentType;

};
