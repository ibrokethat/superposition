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

var nav;

exports['click:display'] = function display (e) {

  nav = nav || e.currentTarget.querySelector('[' + attributes.component + '="nav"]');

  if (!nav) return;

  if (nav.classList.contains(classes.active)) {

    nav.classList.remove(classes.active);
    nav.classList.remove(classes.transition_active);
    nav.classList.add(classes.inactive);
    nav.classList.add(classes.transition_inactive);
  }
  else {

    nav.classList.remove(classes.inactive);
    nav.classList.remove(classes.transition_inactive);
    nav.classList.add(classes.active);
    nav.classList.add(classes.transition_active);
  }

};
