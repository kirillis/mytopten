ReactListView.actions = {
  updateItem: function(item, newTitle) {
    this.dispatch(ReactListView.constants.ITEM_UPDATE, {
      item: item,
      newTitle: newTitle
    });
  },

  addItem: function(itemTitle) {
    this.dispatch(ReactListView.constants.ITEM_ADD, {
      itemTitle: itemTitle
    });
  }
};