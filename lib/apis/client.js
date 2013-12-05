var func = require('func');
var partial = func.partial;

var iter = require('iter');
var forEach = iter.forEach;


var cmds = {
  createApi: require('../commands/createApi'),
  createApp: require('../commands/createApp'),
  controller: require('../commands/controller')
  // getContainer: require('../getContainer'),
  // insertComponent: require('../insertComponent')
};

var baseApi = {

    uri: '/apis',
    headers: {},
    componentType: {
      name: 'apis',
      method: 'get',
      params: {},
      response: 'json'
    }
};


var app = cmds.createApp();

function updateState (uri) {

  var state = {
    uri: uri
  };

  window.history.pushState(state, null, uri);

  return state;
}


function onClick (e) {

  if (e.target.href) {

    e.preventDefault();
    app.dispatchRoute(updateState(e.target.getAttribute('href')));
  }
}


function onPopstate (e) {

  app.dispatchRoute(e.state);
}


window.addEventListener('popstate', onPopstate);
document.addEventListener('click', onClick);


function init (io) {

  forEach(io.data, function (conf) {

    var componentType = conf.componentType;

    var apiPipeline = [
      // cmds.getContainer,
      cmds.createApi(conf),
      // cmds.appendComponent
    ];

    if (componentType.route) {

      app.get(componentType.route, partial(cmds.controller, [], apiPipeline));

      if (componentType.defaultRoute) {

        app.get(componentType.defaultRoute, partial(cmds.controller, [], apiPipeline));
      }
    }

  });

}

exports.setup = function (conf) {

  //  load component level pre rendered html fragments
  //  or load data apis and render on client
  baseApi.headers['X-Render-Mode'] = conf.renderMode;

  cmds.createApi(baseApi)({}).then(init);

}
