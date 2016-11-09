$(function() {
  var listId = $('.js-toggle-like').data('list-id');
  var listId = 123;
  $('.js-toggle-like').on('click', function(event) {
    $.ajax({
      url: '/lists/' + listId + '/toggle_like',
      dataType: 'json',
    }).success(function(data) {
      console.log('success, liked: ', data.liked);
    }).error(function(jqXHR, textStatus, errorThrown) {
      console.log('textStatus, errorThrown', textStatus, errorThrown);
    }).always(function() {
      console.log('done always().');
    });
  })
});