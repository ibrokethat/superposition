var forEach = require('super-iter').forEach;

var classes = {
  active: 'sp-active',
  inactive: 'sp-inactive'
};


function createEvent (type, detail) {
  return new CustomEvent(type, {
    detail: detail,
    bubbles: true,
    cancelable: true
  });
}


function afterActive (e) {

  var node = e.target;
  node.removeEventListener('webkitAnimationEnd', afterActive);
  node.dispatchEvent(createEvent('after:activation'));
}


function afterInactive (e) {

  var node = e.target;
  node.removeEventListener('webkitAnimationEnd', afterInactive);
  node.dispatchEvent(createEvent('after:deactivation'));
}


function stack (state) {

  var incoming = document.querySelector('[data-sp-controller="stack"] > [data-sp-route="' + state.uri + '"]');
  var outgoing = document.querySelector('[data-sp-controller="stack"] > [data-sp-active-panel]');

  if (incoming && outgoing) {

    var e = createEvent('before:activation');
    incoming.dispatchEvent(e);

    if (e.defaultPrevented) return;

    incoming.addEventListener('webkitAnimationEnd', afterActive);
    incoming.setAttribute('data-sp-active-panel', true);
    incoming.classList.add(classes.active);
    incoming.classList.remove(classes.inactive);

    outgoing.dispatchEvent(createEvent('before:deactivation'));
    outgoing.removeAttribute('data-sp-active-panel');
    outgoing.addEventListener('webkitAnimationEnd', afterInactive);
    outgoing.classList.remove(classes.active);
    outgoing.classList.add(classes.inactive);

  }

}

document.body.addEventListener('app:state:change', function (e) {

  stack(e.detail.state);

}, true);


module.exports = stack;
