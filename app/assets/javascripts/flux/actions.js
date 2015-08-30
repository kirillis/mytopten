ReactListView.actions = {
  updateItem: function(item, newTitle) {
    this.dispatch(
      ReactListView.constants.ITEM_UPDATE,
      {item: item, newTitle: newTitle}
    );
  },

  addNewItem: function(itemTitle) {
    var listItemID = ReactListView.makeId();
    // Optimistically add item to UI.
    this.dispatch(
      ReactListView.constants.ITEM_ADD,
      {listItemID: listItemID, itemTitle: itemTitle}
    );

    ReactListView.addItem(
      itemTitle,
      function() {
        this.dispatch(
          ReactListView.constants.ITEM_ADD_SUCCESS,
          {listItemID: listItemID}
        )
      }.bind(this),
      function(error) {
        this.dispatch(
          ReactListView.constants.ITEM_ADD_FAILURE,
          {listItemID: listItemID, error: 'Fehler beim Speichern von: ' + itemTitle + '('+ error + ')'}
        )
      }.bind(this)
    );
  }
};