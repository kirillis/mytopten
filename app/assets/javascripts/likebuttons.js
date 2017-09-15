// class LikeButton {
//   constructor(index, element) {
//     this.id = index;
//     this.element = $(element);
//     this.listId = this.element.data('list-id');
//     this.element.on('click', (event) => { this.clickHandler(event) });
//     this.countElement = this.element.find('.js-likebutton-count');
//   }

//   updateCount(liked) {
//     let direction = liked ? 1 : -1;
//     this.countElement.html(parseInt(this.countElement.html()) + direction);
//   }

//   clickHandler() {
//     if ($('body').hasClass('is-guest')) {
//       toastr['warning']('Please log-in to like a list.');
//       return;
//     }

//     this.element.addClass('is-disabled');
//     $.ajax({
//       url: `/lists/${this.listId}/toggle_like`,
//       dataType: 'json',
//     }).success((data) => {
//       if (data.liked) {
//         toastr['success']('List added to your likes.');
//         this.element.addClass('Likebutton--has-liked');
//       } else {
//         toastr['success']('List removed from your likes.');
//         this.element.removeClass('Likebutton--has-liked');
//       }

//       this.updateCount(data.liked);
//     }).error((jqXHR, textStatus, errorThrown) => {
//       console.log('textStatus, errorThrown', textStatus, errorThrown);
//     }).always(() => {
//       this.element.removeClass('is-disabled');
//     });
//   }
// }

// $(function () {
//   $('.js-likebutton').each((index, element) => {
//     new LikeButton(index, element);
//   })
// });