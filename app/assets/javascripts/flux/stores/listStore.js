ReactListView.listStore = Fluxxor.createStore({
  initialize: function(options) {
    this.list = options.list || [];
    this.bindActions(
      ReactListView.constants.ITEM_ADD, this.onAddItem,
      ReactListView.constants.ITEM_UPDATE, this.onUpdateItem
    );
  },

  getState: function() {
    return {
      list: this.list,
    };
  },

  onAddItem: function(payload) {
    console.log('ReactListView.listStore.list', this.list);
    var _this = this;
    var newListItem = {
      title: payload.itemTitle,
      description: 'new item',
      list_id: this.list.id
    }
    var stringData = JSON.stringify(newListItem)
    $.ajax({
      url: '/list_items.json',
      method: 'post',
      data: stringData,
      dataType: 'json',
      contentType: 'application/json',
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('error', errorThrown);
      },
      success: function(data, textStatus, jqXHR) {
        console.log('_this', _this, this);
        _this.list.list_items.push(newListItem);
        _this.emit('change');
      }
    });
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