App.saveItem = function(payload, success, error) {
  var stringData = JSON.stringify(payload);

  $.ajax({
    url: '/list_items',
    method: 'POST',
    data: stringData,
    dataType: 'json',
    contentType: 'application/json',

    success: function(data, textStatus, jqXHR) {
      var savedItem = data.list_item;
      savedItem.listItemID = payload.listItemID;
      success(savedItem);
    },

    error: function(jqXHR, textStatus, errorThrown) {
      var newPayload = {
        listItemID: payload.listItemID,
        error: 'AJAX saving error: ' + payload.title + ' ('+ errorThrown + ')'
      };
      error(newPayload);
    }
  });
};

App.updateItem = function(payload, success, error) {
  $.ajax({
    url: '/list_items/' + payload.itemData.id,
    method: 'PUT',
    data: JSON.stringify(payload.newItemData),
    dataType: 'json',
    contentType: 'application/json',

    success: function(data, textStatus, jqXHR) {
      success(data);
    },

    error: function(jqXHR, textStatus, errorThrown) {
      payload.error = errorThrown;
      error(payload);
    },
  });
};

App.updateMultipleItems = function(payload, success, error) {
  $.ajax({
    url: '/list_items/' + payload.itemData.id,
    method: 'PUT',
    data: JSON.stringify(payload.newItemData),
    dataType: 'json',
    contentType: 'application/json',

    success: function(data, textStatus, jqXHR) {
      success(data);
    },

    error: function(jqXHR, textStatus, errorThrown) {
      payload.error = errorThrown;
      error(payload);
    },
  });
};

App.deleteItem = function(itemId, success) {
  $.ajax({
    url: '/list_items/' + itemId,
    method: 'DELETE',
    dataType: 'json',
    contentType: 'application/json',
    error: function(jqXHR, textStatus, errorThrown) {
      alert('Error deleting item: ' + errorThrown);
    },
    success: function() {
      success(itemId);
    }
  });
};
