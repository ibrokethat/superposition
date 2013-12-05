var baseApi = {

    uri: '/apis',
    componentType: {
      name: 'apis',
      method: 'get',
      params: {}
    }
};

var router = cmd.createRouter();

function createApi (api) {


}

// create our apis
function createRoute (route, api) {

  var apiPipeline = [
    cmds.getContainer,
    api,
    cmds.appendComponent
  ];

  router.get(route, partial(cmds.controller, [], apiPipeline));

}

function init (apiConfig) {

  forEach(apiConfig, function (conf) {

    var uri = conf.uri;
    var componentType = conf.componentType;

    var api = createApi(conf);

    if (componentType.route) {

      createRoute(componentType.route, api);

      if (componentType.defaultRoute) {

        createRoute(componentType.defaultRoute, api);
      }
    }


  });

}

exports.setup = function (conf) {

  //  load component level pre rendered html fragments
  //  or load data apis and render on client
  baseApi.headers['X-Render-Mode'] = conf.renderMode;

  createApi(baseApi).get().then(init);

}