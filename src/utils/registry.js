/**

  @module       registry
  @description  object registry

*/

var cache = Object.create(null);

function add (key, item) {

  if (cache[key]) {
    throw new ReferenceError('item key (' + key + ') already in registry');
  }
  cache[key] = item;
}

function get (key) {

  if (!cache[key]) {
    throw new ReferenceError('item with key (' + key + ') not found in registry');
  }
  return cache[key];
}

function getAll (match) {

}

function findAll (fn) {

}

export {add, get, getAll, findAll};
