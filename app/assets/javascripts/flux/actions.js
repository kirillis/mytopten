ReactListView.actions = {
  updateItem: function(item, newTitle) {
    this.dispatch(
      ReactListView.constants.ITEM_UPDATE,
      {item: item, newTitle: newTitle}
    );
  },

  addNewItem: function(itemTitle) {
    var reactId = ReactListView.makeId();
    // Optimistically add item to UI.
    this.dispatch(
      ReactListView.constants.ITEM_ADD,
      {reactId: reactId, itemTitle: itemTitle}
    );

    ReactListView.addItem(
      itemTitle,
      function() {
        this.dispatch(
          ReactListView.constants.ITEM_ADD_SUCCESS,
          {reactId: reactId}
        )
      }.bind(this),
      function(error) {
        this.dispatch(
          ReactListView.constants.ITEM_ADD_FAILURE,
          {reactId: reactId, error: error}
        )
      }.bind(this)
    );
  }
};