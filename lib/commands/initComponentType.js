
var registry = require('../core').registry;


module.exports = function initComponentType (element, html) {

  element.innerHTML = html;
  var template = element.querySelector('[data-sp-component-type]');
  var children = template.querySelectorAll('[data-sp-component]');

  var componentType = {
    children: children.length ? children : false,
    html: html,
    name: template.getAttribute('data-sp-component-type'),
    id: template.getAttribute('data-sp-component-type'),
    params: template.getAttribute('data-sp-params'),
    route:  template.getAttribute('data-sp-route'),
    template: template
  };

  registry.add(componentType);

  return componentType;

};
