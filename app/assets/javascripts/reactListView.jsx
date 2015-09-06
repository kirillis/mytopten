ReactListView.saveItem = function(itemData, success, failure) {
  var stringData = JSON.stringify(itemData)
  $.ajax({
    url: '/list_items.json',
    method: 'post',
    data: stringData,
    dataType: 'json',
    contentType: 'application/json',
    error: function(jqXHR, textStatus, errorThrown) {
      failure("Failed to save item in ReactListView.saveItem().");
    },
    success: function(data, textStatus, jqXHR) {
      success(itemData);
    }
  });
};

ReactListView.submit = function(item, success, failure) {

};

ReactListView.init = function(listId) {
  var list;
  $.getJSON('/lists/' + listId + '.json', function(data) {
    list = data;
    console.log('list:', list);
    ReactListView.makeFluxStore(list);
  });
}

ReactListView.makeFluxStore = function (list) {
  var tempStore = {
    ListStore: new ReactListView.listStore({ list: list })
  };
  ReactListView.flux = new Fluxxor.Flux(tempStore, ReactListView.actions);
  ReactListView.flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
      console.log("[Dispatch]", type, payload);
    }
  });
  ReactListView.renderApp();
}

ReactListView.renderApp = function() {
  React.render(
    <List flux={ ReactListView.flux } />,
    document.getElementById('js-react-listContainer')
  );
}

ReactListView.makeId = function() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

window.loadListView = function(listId) {
  ReactListView.init(listId);
}