/*
  Fake ES6 module loader, assuming nodejs implements the es6 module spec there will eventually
  be A System.import('').then() to load modules

  We'd use a thunked version of that eg, var module = yield System.import('');

  As we are transpiling es6 modules to cjs all we currently need is a wrapper around require

*/

function * imports (path) {

  return require(path);
}

export {imports};
