var forEach = require('super-iter').forEach;

module.exports = function stack (state) {

  var container = document.querySelector('[data-sp-controller="stack"] > [data-sp-route="' + state.uri + '"]');

  if (!container) return;

  forEach(container.parentNode.children, function (node) {

    if (node.getAttribute('data-sp-route') === state.uri) {

      node.classList.remove("inactive");
      node.classList.add('active');
      node.classList.add('transition-to-active');
    }
    else {

      node.classList.remove('active');
      node.classList.add("inactive");
      node.classList.add('transition-to-inactive');
    }

  });

};
