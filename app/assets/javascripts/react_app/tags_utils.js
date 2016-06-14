App.updateTags = function(payload, success, error) {
  console.log('updateTags()', payload);
  $.ajax({
    url: '/lists/' + payload.listId + '/tags',
    method: 'PUT',
    data: JSON.stringify(payload),
    dataType: 'json',
    contentType: 'application/json',

    success: function(data, textStatus, jqXHR) {
      success(data);
    },

    error: function(jqXHR, textStatus, errorThrown) {
      alert('Error updating list: ' + errorThrown);
      error(errorThrown);
    },
  });
};

App.removeTag = function(payload, success, error) {
  $.ajax({
    url: '/lists/' + payload.listId + '/tag',
    method: 'DELETE',
    data: JSON.stringify(payload),
    dataType: 'json',
    contentType: 'application/json',

    success: function(data, textStatus, jqXHR) {
      success(data);
    },

    error: function(jqXHR, textStatus, errorThrown) {
      alert('Error updating list: ' + errorThrown);
      error(errorThrown);
    },
  });
};