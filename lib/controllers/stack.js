var forEach = require('super-iter').forEach;

module.exports = function stack (state) {

  var container = document.querySelector('[data-sp-controller="stack"] > [data-sp-route="' + state.uri + '"]');

  if (!container) return;

  forEach(container.parentNode.children, function (node) {

    if (node.getAttribute('data-sp-route') === state.uri) {
      node.classList.remove("inactive");
    }
    else {
      node.classList.add("inactive");
    }

  });

};
