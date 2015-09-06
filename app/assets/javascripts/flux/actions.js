ReactListView.actions = {
  updateItem: function(item, newTitle) {
    this.dispatch(
      ReactListView.constants.ITEM_UPDATE,
      {item: item, newTitle: newTitle}
    );
  },

  addNewItem: function(newItemData) {
    var listID = this.flux.store("ListStore").getID();
    console.log('listID', listID);
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
      function() {
        this.dispatch(ReactListView.constants.ITEM_ADD_SUCCESS, itemData)
      }.bind(this),
      function(error) {
        this.dispatch(
          ReactListView.constants.ITEM_ADD_FAILURE,
          {listItemID: listItemID, error: 'Error saving: ' + itemTitle + '('+ error + ')'}
        )
      }.bind(this)
    );
  }
};