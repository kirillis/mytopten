class LikeButton {
  constructor(index, element) {
    this.id = index;
    this.element = $(element);
    this.listId = this.element.data('list-id');    
    this.element.on('click', (event) => {  this.clickHandler(event) });
  }

  clickHandler() {
    if($('body').hasClass('is-guest')) {
      return;
    }

    this.element.addClass('is-disabled');
    $.ajax({
      url: `/lists/${this.listId}/toggle_like`,
      dataType: 'json',
    }).success((data) => {
      if(data.liked) {
        this.element.addClass('likebutton--has-liked');
      } else {
        this.element.removeClass('likebutton--has-liked');
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