var App = App || {};

App.init = function(userName, listId) {
  var list;
  $.getJSON('/' + userName + '/' + listId + '.json', function(data) {
    list = data;
    App.makeFluxStore(list);
  });
};

App.makeFluxStore = function (list) {
  var tempStore = {
    ListStore: new App.listStore({ list: list })
  };
  App.flux = new Fluxxor.Flux(tempStore, App.actions);
  App.renderApp();
};

App.renderApp = function() {
  React.render(
    <List flux={ App.flux } />,
    document.getElementById('js-react-listContainer')
  );
};

window.loadListView = function(userName, listId) {
  App.init(userName, listId);
};

