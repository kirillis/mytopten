var fluxListStore = {};

fluxListStore.constants = {
  ITEM_ADD: "ITEM_ADD",
  ITEM_UPDATE: "ITEM_UPDATE",
};

fluxListStore.store = Fluxxor.createStore({
  initialize: function(options) {
    this.list = options.list || [];
    this.bindActions(
      fluxListStore.constants.ITEM_ADD, this.onAddItem,
      fluxListStore.constants.ITEM_UPDATE, this.onUpdateItem
    );
  },

  getState: function() {
    return {
      list: this.list,
    };
  },

  onAddItem: function(payload) {
    console.log('Implmenet "onAddItem()"');
  },

  onUpdateItem: function(payload) {
    console.log('onUpdateItem', payload);
    var item = payload.item;
    item.title = payload.newTitle;
    var stringData = JSON.stringify(item);
    var path = '/list_items/' + item.id;
    $.ajax({
      url: path,
      method: 'put',
      data: stringData,
      dataType: 'json',
      contentType: 'application/json',
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('error', errorThrown);
      },
      success: function(data, textStatus, jqXHR) {
        console.log('success', data);
      }
    });
    console.log(this);
    this.emit('change');
  }
});

fluxListStore.actions = {
  updateItem: function(item, newTitle) {
    this.dispatch(fluxListStore.constants.ITEM_UPDATE, {
      item: item,
      newTitle: newTitle
    });
  },

  addItem: function(item, new_name) {
    this.dispatch(fluxListStore.constants.ITEM_ADD, {
      item: item,
      new_name: new_name
    });
    console.log('make ajax call to ITEM_ADD here.');
    // $.ajax({
    //   type: "PUT",
    //   url: "/item_suggestions/" + item.id,
    //   data: {
    //     item: new_name
    //   },
    //   success: function() {
    //     console.log('success.');
    //   },
    //   failure: function() {
    //     console.log('failure.');
    //   }
    // });
  }
};

fluxListStore.init = function(list) {
  var tempStore = {
    ListStore: new fluxListStore.store({
      list: list
    })
  };
  fluxListStore.flux = new Fluxxor.Flux(tempStore, fluxListStore.actions);
  fluxListStore.flux.on("dispatch", function(type, payload) {
    if (console && console.log) {
      console.log("[Dispatch]", type, payload);
    }
  });

  console.log(this);
}