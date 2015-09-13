ReactListView.actions = {
  updateItem: function(itemData, newItemData) {
    var payload = { itemData: itemData, newItemData: newItemData };
    console.log('updateItem action: ', payload.itemData.title);
    this.dispatch(ReactListView.constants.ITEM_UPDATE, payload);

    ReactListView.updateItem(
      payload,
      function(data) {
        this.dispatch(ReactListView.constants.ITEM_UPDATE_SUCCESS, data);
      }.bind(this),
      function(error) {
        this.dispatch(ReactListView.constants.ITEM_UPDATE_FAILURE, error);
      }.bind(this)
    );
  },

  addNewItem: function(newItemData) {
    var listID = this.flux.store("ListStore").getID();
    var listItemID = ReactListView.makeId();
    var itemData = {
      title: newItemData.title,
      link: newItemData.amazon_url,
      image_url: newItemData.thumbnail_url,
      list_id: listID,
      rank: 0,
      listItemID: listItemID
    };

    // Optimistically add item to UI.
    this.dispatch(ReactListView.constants.ITEM_ADD, itemData);

    ReactListView.saveItem(
      itemData,
      function(savedItem) {
        savedItem.listItemID = itemData.listItemID;
        this.dispatch(ReactListView.constants.ITEM_ADD_SUCCESS, savedItem);
      }.bind(this),
      function(error) {
        var payload = {
          listItemID: listItemID,
          error: 'Error saving: ' + itemTitle + '('+ error + ')'
        };
        this.dispatch(ReactListView.constants.ITEM_ADD_FAILURE, payload);
      }.bind(this)
    );
  },

  deleteItem: function(itemId) {
    // Optimistically add item to UI.
    this.dispatch(ReactListView.constants.ITEM_DELETE, itemId);
  },
};