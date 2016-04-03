var MTT = {};
var Toaster = function() {
  var duration = 4000;
  var getMessages = function() {
    messages = $('.flash-messages').data('messages');
  };

  var showMessages = function(message, time = 4000, type = '') {
    if(messages.length > 0) {
      for (var i = 0; i < messages.length; i++) {
        var messageObject = messages[i];
        var messageType = messageObject[0];
        var messageText = messageObject[1];
        Materialize.toast(messageText, duration, messageType);
      }
    }
  };

  return {
    start: function() {
      getMessages();
      showMessages();
    }
  }
}

$(function() {
  //MTT.toaster.start();
});