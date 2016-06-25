App.saveItem = function(payload, successCallback) {
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

App.normalizeItemData = function(data, provider) {
  newData = {};
  $.extend(newData, data);
  var normalizedData = {};
  switch (provider) {
    case 'AMAZON':
      newData.title = data.title;
      newData.link = data.amazon_url;
      newData.image_thumb_url = data.thumbnail_url;
      newData.image_large_url = data.large_url;
      console.log('normalizing data', newData, data);
      return newData;
    default:
      return newData;
  }
};

App.updateItem = function(payload, successCallback, errorCallback) {
  $.ajax({
    url: '/list_items/' + payload.itemData.id,
    method: 'PUT',
    data: JSON.stringify(payload.newItemData),
    dataType: 'json',
    contentType: 'application/json',

    success: function(data, textStatus, jqXHR) {
      successCallback(data);
    },

    error: function(jqXHR, textStatus, errorThrown) {
      payload.error = errorThrown;
      errorCallback(payload);
    },
  });
};

App.updateMultipleItems = function(payload, successCallback, errorCallback) {
  $.ajax({
    url: '/list_items/' + payload.itemData.id,
    method: 'PUT',
    data: JSON.stringify(payload.newItemData),
    dataType: 'json',
    contentType: 'application/json',

    success: function(data, textStatus, jqXHR) {
      successCallback(data);
    },

    error: function(jqXHR, textStatus, errorThrown) {
      payload.error = errorThrown;
      errorCallback(payload);
    },
  });
};

App.deleteItem = function(itemId) {
  $.ajax({
    url: '/list_items/' + itemId,
    method: 'DELETE',
    dataType: 'json',
    contentType: 'application/json',
    error: function() {
      console.error('Error deleting item: ', itemId);
    }
  });
};
