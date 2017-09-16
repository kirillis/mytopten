var App = App || {};

App.init = function(listAuthor, listId) {
  $.getJSON('/' + listAuthor + '/lists/' + listId + '/edit.json', function(data) {
    App.makeFluxStore(data);
  });
};

App.initTagFilter = function() {
  $.getJSON('/' + listAuthor + '/lists/' + listId + '/edit.json', function(data) {
    App.makeFluxStore(data);
  });
};

App.makeFluxStore = function (data) {
  var tempStore = {
    ListStore: new App.listStore({ list: data })
  };
  App.flux = new Fluxxor.Flux(tempStore, App.actions);
  App.renderApp();
};


App.renderApp = function() {
  ReactDOM.render(
    <List flux={ App.flux } />,
    document.getElementById('js-react-listContainer')
  );
};

App.renderTagFilter = function() {
  $.getJSON('/tags.json', function(data) {

    ReactDOM.render(
      <TagFilter tags={data} />,
      document.getElementById('js-react-tagFilterContainer')
    );
  });
};

window.loadListView = function(listAuthor, listId, currentUser) {
  App.init(listAuthor, listId, currentUser);
};

window.loadTagFilterView = function() {
  App.renderTagFilter();
};

