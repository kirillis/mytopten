App.updateList = function(payload, success, error) {
  $.ajax({
    url: '/lists/' + payload.listId,
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