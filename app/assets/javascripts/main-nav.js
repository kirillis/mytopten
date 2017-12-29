$(function () {
    const menu = $('.js-menu');
    const menuButton = $('.js-menu-toggle', menu);

    menuButton.on('click', function(e) {
        menu.toggleClass('is-open');
    })
});