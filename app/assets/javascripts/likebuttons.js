class LikeButton {
  constructor(index, element) {
    this.id = index;
    this.element = $(element);
    this.listId = this.element.data('list-id');    
    this.element.on('click', (event) => {  this.clickHandler(event) });
  }

  clickHandler() {
    if($('body').hasClass('is-guest')) {
      MTT.toaster.showSingleMessage('You need to login to favorite this.', MTT.toaster.duration, MTT.toaster.success);
      return;
    }

    this.element.addClass('is-disabled');
    $.ajax({
      url: `/lists/${this.listId}/toggle_like`,
      dataType: 'json',
    }).success((data) => {
      if(data.liked) {
        this.element.addClass('likebutton--has-liked');
        MTT.toaster.showSingleMessage('Item was added to your favorites.', MTT.toaster.duration, MTT.toaster.success);
      } else {
        this.element.removeClass('likebutton--has-liked');
        MTT.toaster.showSingleMessage('Item was removed to your favorites.', MTT.toaster.duration, MTT.toaster.success);
      }
    }).error((jqXHR, textStatus, errorThrown) => {
      console.log('textStatus, errorThrown', textStatus, errorThrown);
    }).always(() => {
      this.element.removeClass('is-disabled');
    });
  }
}

$(function() {
  $('.js-likebutton').each( (index, element) => {
    console.log('index, element', index, element);
    new LikeButton(index, element);
  })
});