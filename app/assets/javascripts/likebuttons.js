'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LikeButton = function () {
  function LikeButton(index, element) {
    var _this = this;

    _classCallCheck(this, LikeButton);

    this.id = index;
    this.element = $(element);
    this.listId = this.element.data('list-id');
    this.element.on('click', function (event) {
      _this.clickHandler(event);
    });
    this.countElement = this.element.find('.js-likebutton-count');
  }

  _createClass(LikeButton, [{
    key: 'updateCount',
    value: function updateCount(liked) {
      var direction = liked ? 1 : -1;
      this.countElement.html(parseInt(this.countElement.html()) + direction);
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler() {
      var _this2 = this;

      if ($('body').hasClass('is-guest')) {
        toastr['warning']('Please log-in to like a list.');
        return;
      }

      this.element.addClass('is-disabled');
      $.ajax({
        url: '/lists/' + this.listId + '/toggle_like',
        dataType: 'json'
      }).success(function (data) {
        if (data.liked) {
          toastr['success']('List added to your likes.');
          _this2.element.addClass('Likebutton--has-liked');
        } else {
          toastr['success']('List removed from your likes.');
          _this2.element.removeClass('Likebutton--has-liked');
        }

        _this2.updateCount(data.liked);
      }).error(function (jqXHR, textStatus, errorThrown) {
        // console.log('textStatus, errorThrown', textStatus, errorThrown);
      }).always(function () {
        _this2.element.removeClass('is-disabled');
      });
    }
  }]);

  return LikeButton;
}();

$(function () {
  $('.js-likebutton').each(function (index, element) {
    new LikeButton(index, element);
  });
});