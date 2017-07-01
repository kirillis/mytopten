App.listStore = Fluxxor.createStore({
  initialize: function(options) {
    this.list = options.list || [];
    this.itemsToSave = [];
    this.bindActions(
      App.constants.ITEM_UPDATE, this.onUpdateItem,
      App.constants.ITEM_UPDATE_SUCCESS, this.onUpdateItemSuccess,
      App.constants.ITEM_UPDATE_FAILURE, this.onUpdateItemFailure,

      App.constants.ITEM_ADD, this.onItemAdd,
      App.constants.ITEM_DELETE, this.onItemDelete,

      App.constants.LIST_UPDATE, this.onListUpdate,
      App.constants.LIST_UPDATE_SUCCESS, this.onListUpdateSuccess,
      App.constants.LIST_UPDATE_FAILURE, this.onListUpdateFailure,

      App.constants.LIST_TAGS_UPDATE, this.onListTagsUpdate,
      App.constants.LIST_TAGS_UPDATE_SUCCESS, this.onListTagsUpdateSuccess,
      App.constants.LIST_TAGS_UPDATE_FAILURE, this.onListTagsUpdateFailure,

      App.constants.LIST_TAG_REMOVE, this.onListTagRemove,
      App.constants.LIST_TAG_REMOVE_SUCCESS, this.onListTagRemoveSuccess,
      App.constants.LIST_TAG_REMOVE_FAILURE, this.onListTagRemoveFailure
    );
  },

  getID: function() {
    return this.list.id;
  },

  getState: function() {
    return {
      list: this.list,
      listDetails: this.list,
      listTags: this.list.tags,
      listItems: this.list.list_items,
      itemsToSave: this.itemsToSave
    };
  },

  onListUpdate: function(data) {
    console.log('storeList: onListUpdate', data);
  },

  onListUpdateSuccess: function(data) {
    this.list = data;
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

  onUpdateMultipleItems: function(payload) {
    console.log('onUpdateMultipleItems');
    //
    // this.emit('change');
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
    MTT.toaster.showSingleMessage('Item added to list.', MTT.toaster.duration, MTT.toaster.success);
    this.list.list_items.push(payload);
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

  onListTagsUpdate: function() {
    // this.list.isSaving = true;
    this.emit('change');
  },

  onListTagsUpdateSuccess: function(newListData) {
    console.log('onListTagsUpdate', newListData);
    this.list = newListData;
    this.list.isSaving = false;
    this.emit('change');
  },

  onListTagsUpdateFailure: function() {
    console.warn('Error saving tags to list.');
    this.list.isSaving = false;
    this.emit('change');
  },

  onListTagRemove: function() {
    this.list.isSaving = true;
    this.emit('change');
  },

  onListTagRemoveSuccess: function(newListData) {
    console.log('onListTagRemoveSuccess', newListData);
    this.list = newListData;
    this.list.isSaving = false;
    this.emit('change');
  },

  onListTagRemoveFailure: function() {
    console.warn('Error removing tag to list.');
    this.list.isSaving = false;
    this.emit('change');
  }
});