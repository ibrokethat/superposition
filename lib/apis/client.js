var registry = require('super-registry');
var func = require('super-func');
var partial = func.partial;

var iter = require('super-iter');
var forEach = iter.forEach;


var cmds = {
  requestComponent: require('../commands/requestComponent'),
  requestRouteComponent: require('../commands/requestRouteComponent'),
  createApp: require('../commands/createApp'),
  controller: require('../commands/controller'),
  getContainer: require('../commands/getContainer'),
  insertHTML: require('../commands/insertHTML')
};

var controllers = {
  stack: require('../controllers/stack')
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

    var state = updateState(e.target.getAttribute('href'));

    app.dispatchRoute(state);
    controllers.stack(state);
  }
}


function onPopstate (e) {

  app.dispatchRoute(e.state);
  controllers.stack(e.state);
}



function init (io) {

  forEach(io.data, function (componentType) {

    var componentPipeline = [
      partial(cmds.requestComponent, componentType)
    ];
    var componentController = partial(cmds.controller, [], componentPipeline);

    app.get(componentType.uri, componentController);

    //  if this component contains routes that map to a URI endpoint, do so
    if (componentType.routes.length) {

      forEach(componentType.routes, function (route) {

        var routePipeline = [
          partial(cmds.getContainer, route.path),
          partial(cmds.requestRouteComponent, route.componentType),
          cmds.insertHTML
        ];
        var routeController = partial(cmds.controller, [], routePipeline);

        app.get(route.path, routeController);

        if (route.defaultPath) {

          app.get(route.defaultPath, routeController);
        }
      });

    }

    registry.add(componentType);

  });

  window.addEventListener('popstate', onPopstate);
  document.addEventListener('click', onClick);

}

var baseApi = {
  uri: '/apis',
  headers: {},
  name: 'apis',
  method: 'get',
  params: {},
  response: 'json'
};


exports.setup = function (conf) {

  //  load component level pre rendered html fragments
  //  or load data apis and render on client
  baseApi.headers['X-Render-Mode'] = conf.renderMode;

  var apiPipeline = [
    partial(cmds.requestComponent, baseApi),
    init
  ];

  app.get(baseApi.uri, partial(cmds.controller, [], apiPipeline));
  app.dispatchRoute({
    uri: baseApi.uri
  });
}


