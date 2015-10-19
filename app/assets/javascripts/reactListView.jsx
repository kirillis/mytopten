ReactListView.saveItem = function(payload, success, failure) {
  var stringData = JSON.stringify(payload);
  $.ajax({
    url: '/list_items.json',
    method: 'post',
    data: stringData,
    dataType: 'json',
    contentType: 'application/json',
    success: function(data, textStatus, jqXHR) {
      success(data.list_item);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      payload.error = errorThrown;
      failure(payload);
    },
  });
};

ReactListView.updateItem = function(payload, success, failure) {
  console.log('updateItem:', payload.itemData.title);
  var stringData = JSON.stringify(payload.newItemData);
  var path = '/list_items/' + payload.itemData.id;
  $.ajax({
    url: path,
    method: 'PUT',
    data: stringData,
    dataType: 'json',
    contentType: 'application/json',
    success: function(data, textStatus, jqXHR) {
      success(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('updateItem() error ajax func:', payload.itemData.title);
      payload.error = errorThrown;
      failure(payload);
    },
  });
};

ReactListView.init = function(userName, listId) {
  var list;
  $.getJSON('/' + userName + '/' + listId + '.json', function(data) {
    list = data;
    ReactListView.makeFluxStore(list);
  });
};

ReactListView.makeFluxStore = function (list) {
  var tempStore = {
    ListStore: new ReactListView.listStore({ list: list })
  };
  ReactListView.flux = new Fluxxor.Flux(tempStore, ReactListView.actions);
  ReactListView.renderApp();
};

ReactListView.renderApp = function() {
  React.render(
    <List flux={ ReactListView.flux } />,
    document.getElementById('js-react-listContainer')
  );
};

ReactListView.makeId = function() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

window.loadListView = function(userName, listId) {
  ReactListView.init(userName, listId);
};