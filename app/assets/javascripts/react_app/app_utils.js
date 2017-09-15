App.makeId = function() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

App.setLoadingState = function(isLoading) {
  if(isLoading) {
    $('#LoadingIndicator').addClass('is-active');
  } else {
    $('#LoadingIndicator').removeClass('is-active');
  }
};