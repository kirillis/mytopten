Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};

App.makeId = function () {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

App.setLoadingState = function (isLoading) {
  if (isLoading) {
    $('#LoadingIndicator').addClass('is-active');
  } else {
    $('#LoadingIndicator').removeClass('is-active');
  }
};

App.addTagToFilter = function(newTag) {
  var encodedNewTag = encodeURIComponent(newTag).replace('%20', '+');
  var currentSearchString = location.search;
  if(currentSearchString === '') return '?tags=' + encodedNewTag;
  var split = currentSearchString.split('=');
  var tags = split[1];
  var newTags = tags + ',' + encodedNewTag;
  return ('?tags=' + newTags);
}

App.removeTagFromFilter = function(oldTag) {
  var encodedOldTag = encodeURIComponent(oldTag);
  var tagsArray = App.getQueryArray(location.search);
  tagsArray = tagsArray.remove(oldTag);
  return tagsArray.length === 0 ? '' : '?tags=' + tagsArray.join(',');
}

App.getQueryArray = function(query) {
  if(query == '') return [];
  var split = query.split('=');
  var tags = split[1].replace('+', ' ');
  var tagsArray = decodeURIComponent(tags).split(',');
  return tagsArray;
}