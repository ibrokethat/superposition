var forEach = require('super-iter').forEach;

function onClick (e) {

  if (e.target.href) {

    e.preventDefault();

    var href = e.target.getAttribute('href');
    var panels = document.querySelector('[data-sp-route="' + href + '"]').parentNode.children;

    forEach(panels, function (panel) {

      if (panel.getAttribute('data-sp-route') === href) {
        panel.classList.remove("inactive");
      }
      else {
        panel.classList.add("inactive");
      }

    });
  }

}


document.addEventListener('click', onClick, false);


module.exports = function stack () {};
