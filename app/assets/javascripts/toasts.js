toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "3000",
  "hideDuration": "500",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

$(function() {
  var messages = $('.flash-messages').data('messages');

  for (var i = messages.length - 1; i >= 0; i--) {
    var messageType = messages[i][0];
    var messageText = messages[i][1];

    console.log(messageType, messageText);

    toastr[messageType](messageText);
  }
});