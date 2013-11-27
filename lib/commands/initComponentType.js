
var registry = require('./core').registry;


module.exports = function initComponentType (element, html) {

  element.innerHTML = html;

  var template = element.querySelector('[data-sp-component-type]');
  var children = template.querySelectorAll('[data-sp-component]');

  var componentType = {
    children: children.length ? children : false,
    html: html,
    name: template.dataset.spComponentType,
    id: template.dataset.spComponentType,
    params: template.dataset.spParams,
    route:  template.dataset.spRoute,
    template: template
  };

  registry.add(componentType);

  return componentType;

};
