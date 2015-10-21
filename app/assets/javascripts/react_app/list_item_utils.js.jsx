App.saveItem = function(payload, fluxActions) {
  var stringData = JSON.stringify(payload);

  $.ajax({
    url: '/list_items.json',
    method: 'POST',
    data: stringData,
    dataType: 'json',
    contentType: 'application/json',

    success: function(data, textStatus, jqXHR) {
      var savedItem = data.list_item;
      savedItem.listItemID = payload.listItemID;
      fluxActions.dispatch(App.constants.ITEM_ADD_SUCCESS, savedItem);
    },

    error: function(jqXHR, textStatus, errorThrown) {
      var newPayload = {
        listItemID: payload.listItemID,
        error: 'AJAX saving error: ' + payload.title + ' ('+ errorThrown + ')'
      };
      fluxActions.dispatch(App.constants.ITEM_ADD_FAILURE, newPayload);
    }
  });
};

App.updateItem = function(payload, fluxActions) {
  var _this = this;
  console.log('updateItem:', payload.itemData.title);
  var stringData = JSON.stringify(payload.newItemData);
  var path = '/list_items/' + payload.itemData.id;

  $.ajax({
    url: path,
    method: 'PUT',
    data: stringData,
    dataType: 'json',
    contentType: 'application/json',

    success: function(data, textStatus, jqXHR) {
      fluxActions.dispatch(App.constants.ITEM_UPDATE_SUCCESS, data);
    },

    error: function(jqXHR, textStatus, errorThrown) {
      payload.error = errorThrown;
      fluxActions.dispatch(App.constants.ITEM_UPDATE_FAILURE, payload);
    },
  });
};