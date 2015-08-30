ReactListView.addItem = function(itemTitle, success, failure) {
  // var stringData = JSON.stringify(newListItem)
  // $.ajax({
  //   url: '/list_items.json',
  //   method: 'post',
  //   data: stringData,
  //   dataType: 'json',
  //   contentType: 'application/json',
  //   error: function(jqXHR, textStatus, errorThrown) {
  //     console.log('error', errorThrown);
  //   },
  //   success: function(data, textStatus, jqXHR) {
  //     console.log('_this', _this, this);
  //     _this.list.list_items.push(newListItem);
  //     _this.emit('change');
  //   }
  // });

  setTimeout(function() {
    if (Math.random() > 0.5) {
      success(itemTitle);
    } else {
      failure("Failed to save item in ReactListView.addItem().");
    }
  }, Math.random() * 1000 + 500);
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