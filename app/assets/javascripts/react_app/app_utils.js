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
    $('#loading-indicator').addClass('active');
  } else {
    $('#loading-indicator').removeClass('active');
  }
};