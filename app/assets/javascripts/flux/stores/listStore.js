ReactListView.listStore = Fluxxor.createStore({
  initialize: function(options) {
    this.list = options.list || [];
    this.itemsToSave = [];
    this.bindActions(
      ReactListView.constants.ITEM_ADD, this.onItemAdd,
      ReactListView.constants.ITEM_ADD_SUCCESS, this.onItemAddSuccess,
      ReactListView.constants.ITEM_ADD_FAILURE, this.onItemAddFailure,
      ReactListView.constants.ITEM_UPDATE, this.onUpdateItem
    );
  },

  getID: function() {
    return this.list.id;
  },

  getState: function() {
    return {
      list: this.list,
      itemsToSave: this.itemsToSave
    };
  },

  onItemAddFailure: function(payload) {
    var _this = this;
    this.itemsToSave.splice( $.inArray(payload.listItemID, this.itemsToSave), 1 );
    this.list.list_items.forEach(function(listItem, index) {
      if(listItem.listItemID != undefined && listItem.listItemID == payload.listItemID) {
        _this.list.list_items.splice(index, 1);
        alert(payload.error);
        return false;
      }
    });
    this.emit('change');
  },

  onItemAddSuccess: function(payload) {
    this.itemsToSave.splice( $.inArray(payload.listItemID, this.itemsToSave), 1 );
    this.emit('change');
  },

  onItemAdd: function(payload) {
    this.list.list_items.push(payload);
    this.itemsToSave.push(payload.listItemID);
    this.emit('change');
  },

  onUpdateItem: function(payload) {
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
        // console.log('success', data);
      }
    });
    this.emit('change');
  }
});