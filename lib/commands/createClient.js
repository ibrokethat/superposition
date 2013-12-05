

var routes = [];

function match (state) {

  some(routes, go);

}


function updateState (href) {

  var state = {
    uri: href
  };

  window.pushState(state, null, href);

  return state;
}


var listener = compose(match, updateState);

function onClick (e) {

  if (e.target.href) {

    e.preventDefault();
    listener(e.target);

  }

}


function route (type, uri, controller) {

}

window.addEventListener('popstate', match);
document.addEventListener('click', onClick);


exports.get = partial(route, 'get');
exports.post = partial(route, 'post');
exports.put = partial(route, 'put');
exports.del = partial(route, 'del');
