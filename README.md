Executing code in more than one env at a time.

todo list:

move event creation into own cmd

create layout controllers

accordian, menu, stack, tab

move panel display into own controller

have stack use panel display

create component controllers
show, hide,
expand, collapse, render
update, teardown






<div data-sp-cmp="body" data-sp-cmp-def='{"controllers", ["std"]}'>

  <div data-sp-has-one-cmp="overview" data-sp-route="/overview/:period?/:from?" data-sp-default-route="/"></div>
  <div data-sp-has-one-cmp="usage" data-sp-route="/overview/:period?/:from?"></div>
  <div data-sp-has-one-cmp="advice" data-sp-route="/advice"></div>

</div>


<div data-sp-cmp="overview" data-sp-cmp-def='{"model": "Overview", "controllers", ["std", "overview"]}'>

  <div data-sp-has-one-cmp="date-nav" data-sp-options='{"baseClass": "overview-base", "defaultClass": "cmp-default"}'></div>
  <div data-sp-has-one-cmp="calendar" data-sp-options='{"baseClass": "cmp-base", "defaultClass": "cmp-default"}'></div>
  <div data-sp-has-one-cmp="maxSpendRange" data-sp-options='{"baseClass": "cmp-base", "defaultClass": "cmp-default"}'></div>
  <div data-sp-has-one-cmp="maxSpendRange" data-sp-options='{"baseClass": "cmp-base", "defaultClass": "cmp-default"}'></div>

</div>


<div data-sp-cmp="usage" data-sp-cmp-def='{"model": "Usage", "controllers", ["std", "usage"]}'>

  <div data-sp-has-one-cmp="date-nav" data-sp-options='{"baseClass": "cmp-base", "defaultClass": "cmp-default"}'></div>
  <div data-sp-has-one-cmp="graph" data-sp-options='{"baseClass": "cmp-base", "defaultClass": "cmp-default"}'></div>
  <div data-sp-has-one-cmp="caveat" data-sp-options='{"baseClass": "cmp-base", "defaultClass": "cmp-default"}'></div>

</div>


Usage {

  properties: {
    apiKey: {
      value: 'usage'
    }
  },
  hasOne: {
    graph {}
  }

}


Graph: {

  properties: {
    apiKey: {
      value: 'consumption-data'
    }
  },
  hasMany: {
    series: Series
  }
}


Series: {

  hasMany: {
    Point: Point
  }
}




adapter registries

componentRegistry
modelRegistry
apiRegistry
transformRegistry

rendering a component
get the model specified by the component
call the api named in the model
walk the tree and convert all the hasOne hasMany relations by grabbing the corrct transformers from the transform registry

var component = componentRegistry.find({componentType: 'usage'});
var Model = modelRegistry({model: component.model});
var api = apiRegistry({api: Model.apiKey});

var data = yield api({params: params, query: query, headers: headers});

model = new Model(data);

forEach(chain(model.hasOne, model.hasMany), function (Relation, name) {
  var transform = transformRegistry.find({model: model, name: name});
  model[name] = new Relation(transform(data));
});


render(root, component, il18, model);


componentRegistry = new Registry({
  find: function (component, params) {

    return component.componentType === params.componentType;

  }
});

modelRegistry = new Registry({
  find: function (Model, params) {

    return Model === require('./models' + params.model);
  }
});

apiRegistry = new Registry({
  find: function (api, params) {

    return api.id === params.apiKey;

  };
});

transformRegistry = new Registry({
  find: function (transform, params) {

    return transform.Model === params.model;
  };
});



