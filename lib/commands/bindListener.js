var typeOf = require('super-is').typeOf;

module.exports = function bindListener (node, event, func, action) {

  var listener = typeOf("undefined", action) ? func : function (e) {

    var node = e.target;
    while (node !== e.currentTarget) {
      if (node.dataset.spAction === action) {
        e.delegateTarget = node;
        return func.call(node, e);
      }
      node = node.parentNode;
    }

  };

  node.addEventListener(event, listener, false);

  return listener;

}
