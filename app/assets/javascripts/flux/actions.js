App.actions = {
  updateItem: function(itemData, newItemData) {
    var payload = {
      itemData: itemData,
      newItemData: newItemData
    };
    this.dispatch(App.constants.ITEM_UPDATE, payload);
    App.updateItem(payload, this);
  },

  addNewItem: function(newItemData) {
    var listID = this.flux.store("ListStore").getID();
    var listItemID = App.makeId();
    var itemData = {
      title: newItemData.title,
      link: newItemData.amazon_url,
      image_url: newItemData.thumbnail_url,
      list_id: listID,
      rank: 0,
      listItemID: listItemID
    };

    // Optimistically add item to UI.
    this.dispatch(App.constants.ITEM_ADD, itemData);
    App.saveItem(itemData, this);
  },

  deleteItem: function(itemId) {
    // Optimistically add item to UI.
    this.dispatch(App.constants.ITEM_DELETE, itemId);
  },
};