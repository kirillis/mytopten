var App = App || {};

App.init = function(listAuthor, listId, currentUser) {
  App.currentUser = currentUser;
  App.isAuthor = currentUser === listAuthor;

  $.getJSON('/' + listAuthor + '/' + listId + '.json', function(data) {
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
  var isAuthor = App.currentUser ===
  React.render(
    <List
      flux={ App.flux }
      currentUser={ App.currentUser }
      isAuthor={ App.isAuthor }
    />,
    document.getElementById('js-react-listContainer')
  );
};

window.loadListView = function(listAuthor, listId, currentUser) {
  App.init(listAuthor, listId, currentUser);
};

