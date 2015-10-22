App.listStore = Fluxxor.createStore({
  initialize: function(options) {
    this.list = options.list || [];
    this.itemsToSave = [];
    this.bindActions(
      App.constants.ITEM_UPDATE, this.onUpdateItem,
      App.constants.ITEM_UPDATE_SUCCESS, this.onUpdateItemSuccess,
      App.constants.ITEM_UPDATE_FAILURE, this.onUpdateItemFailure,
      App.constants.ITEM_ADD, this.onItemAdd,
      App.constants.ITEM_ADD_SUCCESS, this.onItemAddSuccess,
      App.constants.ITEM_ADD_FAILURE, this.onItemAddFailure,
      App.constants.ITEM_DELETE, this.onItemDelete,
      App.constants.ITEM_DELETE_SUCCESS, this.onItemDeleteSuccess,
      App.constants.ITEM_DELETE_FAILURE, this.onItemDeleteFailure,
      App.constants.LIST_UPDATE, this.onListUpdate,
      App.constants.LIST_UPDATE_SUCCESS, this.onListUpdateSuccess,
      App.constants.LIST_UPDATE_FAILURE, this.onListUpdateFailure
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

  onListUpdate: function(data) {
    console.log('storeList: onListUpdate', data);
  },

  onListUpdateSuccess: function(data) {
    this.list = data.list;
    this.emit('change');
  },

  onListUpdateFailure: function(data) {
    console.log('storeList: onListUpdateFailure', data);
    this.list.title = data.oldData.title;
    this.list.description = data.oldData.description;
    this.emit('change');
  },

  onUpdateItem: function(payload) {
    var list_items = this.list.list_items;
    for(var i = 0; i < list_items.length; i++) {
      var listItem = list_items[i];
      if(listItem.id === payload.itemData.id) {
        list_items[i] = payload.newItemData;
        list_items[i].isSaving = true;
        break;
      }
    }
    this.emit('change');
  },

  onUpdateItemSuccess: function(payload) {
    var list_items = this.list.list_items;
    for(var i = 0; i < list_items.length; i++) {
      var listItem = list_items[i];
      if(listItem.id === payload.list_item.id) {
        list_items[i].isSaving = false;
        break;
      }
    }
    this.emit('change');
  },

  onUpdateItemFailure: function(payload) {
    console.log(payload);
    var list_items = this.list.list_items;
    for(var i = 0; i < list_items.length; i++) {
      var listItem = list_items[i];
      if(listItem.id === payload.itemData.id) {
        list_items[i] = payload.itemData;
        list_items[i].isSaving = false;
        alert("Error saving changes. Error message: " + payload.error);
        break;
      }
    }
    this.emit('change');
  },

  onItemAdd: function(payload) {
    this.list.list_items.push(payload);
    this.itemsToSave.push(payload.listItemID);
    this.emit('change');
  },

  onItemAddSuccess: function(savedItemData) {
    var list_items = this.list.list_items;
    for(var i = 0; i < list_items.length; i++) {
      var listItem = list_items[i];
      if(listItem.listItemID === savedItemData.listItemID) {
        list_items[i] = savedItemData;
        break;
      }
    }
    this.itemsToSave.splice( $.inArray(savedItemData.listItemID, this.itemsToSave), 1 );
    this.emit('change');
  },

  onItemAddFailure: function(payload) {
    var _this = this;
    this.itemsToSave.splice( $.inArray(payload.listItemID, this.itemsToSave), 1 );
    this.list.list_items.forEach(function(listItem, index) {
      if(listItem.listItemID !== undefined && listItem.listItemID == payload.listItemID) {
        _this.list.list_items.splice(index, 1);
        alert("Error adding new list item. Error message: " + payload.error);
        return false;
      }
    });
    this.emit('change');
  },

  onItemDelete: function(itemId) {
    for(var i = 0; i < this.list.list_items.length; i++) {
      var listItem = this.list.list_items[i];
      if(listItem.id === itemId) {
        this.list.list_items.splice(i, 1);
        break;
      }
    }

    this.emit('change');
  },

  onItemDeleteSuccess: function(payload) {
    console.log('Implement ListStore::onItemDeleteSuccess()', payload);
  },

  onItemDeleteFailure: function(payload) {
    console.log('Implement ListStore::onItemDeleteFailure()', payload);
  },
});