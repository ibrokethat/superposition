var forEach = require('super-iter').forEach;

var classes = {
  active: 'sp-active',
  inactive: 'sp-inactive',
  transition_active: 'sp-transition-to-active',
  transition_inactive: 'sp-transition-to-inactive'
};


module.exports = function stack (state) {

  var container = document.querySelector('[data-sp-controller="stack"] > [data-sp-route="' + state.uri + '"]');

  if (!container) return;

  forEach(container.parentNode.children, function (node) {

    if (node.getAttribute('data-sp-route') === state.uri) {

      node.classList.remove(classes.inactive);
      node.classList.add(classes.active);
      node.classList.add(classes.transition_active);
    }
    else {

      node.classList.remove(classes.active);
      node.classList.add(classes.inactive);
      node.classList.add(classes.transition_inactive);
    }

  });

};
