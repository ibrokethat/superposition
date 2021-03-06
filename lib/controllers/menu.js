var typeOf = require('super-is').typeOf;
// var CONF = require('config');
// var attributes = CONF.attributes;
// var classes = CONF.classes;

var attributes = {
  controller: 'data-sp-controller',
  componentType: 'data-sp-component-type'
};

var classes = {
  active: 'sp-active',
  inactive: 'sp-inactive',
};

var nav;

// function active () {

//   nav.classList.add(classes.active);
//   nav.removeEventListener('transitionend', active);
// }

// function inactive () {

//   document.body.style.overflow = 'auto';
//   nav.classList.remove(classes.active);
//   nav.removeEventListener('transitionend', inactive);
// }

function close (e) {
  if (e.target.hasAttribute('href')) {
    display(e);
  }
}


function display (e) {

  if (!nav) {

    nav = e.currentTarget.querySelector('[' + attributes.componentType + '="nav"]');
    nav.addEventListener('click', close);
  }

  if (nav.classList.contains(classes.active)) {

    nav.classList.remove(classes.active);
    nav.classList.add(classes.inactive);
    // nav.addEventListener('transitionend', inactive);
  }
  else {

    nav.classList.remove(classes.inactive);
    nav.classList.add(classes.active);
    // nav.addEventListener('transitionend', active);
    // document.body.style.overflow = 'hidden';
  }

}

exports['click:display'] = display;


// var typeOf = require('super-is').typeOf;
// // var CONF = require('config');
// // var attributes = CONF.attributes;
// // var classes = CONF.classes;

// var attributes = {
//   controller: 'data-sp-controller',
//   componentType: 'data-sp-component-type'
// };

// var classes = {
//   active: 'sp-active',
//   inactive: 'sp-inactive',
//   transition_active: 'sp-transition-to-active',
//   transition_inactive: 'sp-transition-to-inactive'
// };

// var nav;

// function active () {

//   nav.classList.add(classes.active);
//   nav.removeEventListener('transitionend', active);
// }

// function inactive () {

//   document.body.style.overflow = 'auto';
//   nav.classList.remove(classes.active);
//   nav.removeEventListener('transitionend', inactive);
// }

// function close (e) {
//   if (e.target.hasAttribute('href')) {
//     display(e);
//   }
// }


// function display (e) {

//   if (!nav) {

//     nav = e.currentTarget.querySelector('[' + attributes.componentType + '="nav"]');
//     nav.addEventListener('click', close);
//   }

//   if (nav.classList.contains(classes.active)) {

//     nav.classList.remove(classes.transition_active);
//     nav.classList.add(classes.transition_inactive);
//     nav.addEventListener('transitionend', inactive);
//   }
//   else {

//     nav.classList.remove(classes.transition_inactive);
//     nav.classList.add(classes.active);
//     nav.classList.add(classes.transition_active);
//     nav.addEventListener('transitionend', active);
//     document.body.style.overflow = 'hidden';
//   }

// }

// exports['click:display'] = display;
