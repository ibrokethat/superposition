var forEach = require('super-iter').forEach;


module.exports = function stack (state) {

  var panels = document.querySelector('[data-sp-route="' + state.uri + '"]').parentNode.children;

  forEach(panels, function (panel) {

    if (panel.getAttribute('data-sp-route') === state.uri) {
      panel.classList.remove("inactive");
    }
    else {
      panel.classList.add("inactive");
    }

  });

};
