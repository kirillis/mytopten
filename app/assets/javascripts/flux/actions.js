App.actions = {
  listItem: {
    update: function(itemData, newItemData) {
      var payload = {
        itemData: itemData,
        newItemData: newItemData
      };

      this.dispatch(App.constants.ITEM_UPDATE, payload);
      App.updateItem(
        payload,
        function(data) {
          this.dispatch(App.constants.ITEM_UPDATE_SUCCESS, data);
        }.bind(this),
        function(payload) {
          this.dispatch(App.constants.ITEM_UPDATE_FAILURE, payload);
        }.bind(this)
      );
    },

    add: function(newItemData) {
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

      this.dispatch(App.constants.ITEM_ADD, itemData);
      App.saveItem(
        itemData,
        function(savedItem) {
          this.dispatch(App.constants.ITEM_ADD_SUCCESS, savedItem);
        }.bind(this),
        function(error) {
          this.dispatch(App.constants.ITEM_ADD_FAILURE, error);
        }.bind(this)
      );
    },

    delete: function(itemId) {
      App.deleteItem(
        itemId,
        function(itemId) {
          this.dispatch(App.constants.ITEM_DELETE, itemId);
        }.bind(this)
      );
    }
  },
  list: {
    update: function(listData) {
      this.dispatch(App.constants.LIST_UPDATE, listData.newData);

      listData.newData.listId = this.flux.store("ListStore").getID();
      listData.newData.public = listData.newData.isPublic;
      App.updateList(
        listData.newData,
        function(data) {
          this.dispatch(App.constants.LIST_UPDATE_SUCCESS, data);
        }.bind(this),
        function(error) {
          listData.error = error;
          this.dispatch(App.constants.LIST_UPDATE_FAILURE, listData);
        }.bind(this)
      );
    },
  }
};