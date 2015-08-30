ReactListView.listStore = Fluxxor.createStore({
  initialize: function(options) {
    this.list = options.list || [];
    this.bindActions(
      ReactListView.constants.ITEM_ADD, this.onItemAdd,
      ReactListView.constants.ITEM_ADD_SUCCESS, this.onItemAddSuccess,
      ReactListView.constants.ITEM_ADD_FAILURE, this.onItemAddFailure,
      ReactListView.constants.ITEM_UPDATE, this.onUpdateItem
    );
  },

  getState: function() {
    return {
      list: this.list,
    };
  },

  onItemAddFailure: function(payload) {
    console.log('Implement onItemAddFailure:', payload);
  },

  onItemAddSuccess: function(payload) {
    console.log('Implement onItemAddSuccess on ID:', payload.reactId);
  },

  onItemAdd: function(payload) {
    console.log('ReactListView.listStore.list', this.list);
    var _this = this;
    var newListItem = {
      reactId: payload.reactId,
      title: payload.itemTitle,
      description: 'new item',
      list_id: this.list.id,
      isSaving: true
    };
    this.list.list_items.push(newListItem);
    this.emit('change');
  },

  onUpdateItem: function(payload) {
    var item = payload.item;
    item.title = payload.newTitle;
    var stringData = JSON.stringify(item);
    var path = '/list_items/' + item.id;
    $.ajax({
      url: path,
      method: 'put',
      data: stringData,
      dataType: 'json',
      contentType: 'application/json',
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('error', errorThrown);
      },
      success: function(data, textStatus, jqXHR) {
        // console.log('success', data);
      }
    });
    this.emit('change');
  }
});