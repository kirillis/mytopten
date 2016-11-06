var MTT = MTT || {};
MTT.toaster = {
  duration: 4000,
  success: 'success',
  error: 'error',
  warning: 'warning',
  messages: [],

  getFlashMessages: function() {
    this.messages = $('.flash-messages').data('messages');
  },

  showMessages: function() {
    if(this.messages.length > 0) {
      for (var i = 0; i < this.messages.length; i++) {
        var messageObject = this.messages[i];
        var messageType = messageObject[0];
        var messageText = messageObject[1];
        this.showSingleMessage(messageText, this.duration, messageType);
      }
    }
  },

  showSingleMessage: function(text, duration, type) {
    Materialize.toast(text, duration, type);
  },

  start: function() {
    this.getFlashMessages();
    this.showMessages();
  }
};

$(function() {
  MTT.toaster.start();
});