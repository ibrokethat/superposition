var Registry = require('super-registry');
var version = require('../utils/getVersion')(module);

// find: function (params) {

//   return find(this.cache, partial(this.match, params));

// }


module.exports = new Registry({
  match: function (params, Model) {
    return Model === require(path.resolve(process.cwd() + '/src/' + version + '/models/' + params.model));
  }
});
