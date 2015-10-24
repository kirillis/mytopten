var App = App || {};

App.init = function(listAuthor, listId) {
  $.getJSON('/' + listAuthor + '/' + listId + '/edit.json', function(data) {
    App.makeFluxStore(data);
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

window.loadListView = function(listAuthor, listId, currentUser) {
  App.init(listAuthor, listId, currentUser);
};

