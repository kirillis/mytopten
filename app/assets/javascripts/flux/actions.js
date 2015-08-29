ReactListView.actions = {
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