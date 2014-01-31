var typeOf = require('super-is').typeOf;
// var CONF = require('config');
// var attributes = CONF.attributes;
// var classes = CONF.classes;

var attributes = {
  controller: 'data-sp-controller',
  component: 'data-sp-component'
};

var classes = {
  active: 'sp-active',
  inactive: 'sp-inactive',
  transition_active: 'sp-transition-to-active',
  transition_inactive: 'sp-transition-to-inactive'
};

exports.toggle = function toggle (component, e) {

  component = target.querySelector('[' + attributes.component + '="' + component + '"]');

  if (!component) return;

  if (component.classList.contains(classes.active)) {

    component.classList.remove(classes.active);
    component.classList.add(classes.inactive);
    component.classList.add(classes.transition_inactive);
  }
  else {

    component.classList.remove(classes.inactive);
    component.classList.add(classes.active);
    component.classList.add(classes.transition_active);
  }

};
