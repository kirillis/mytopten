$(function () {
    const menu = $('.js-menu');
    const menuButton = $('.js-menu-toggle', menu);

    menuButton.on('click', (e) => {
        menu.toggleClass('is-open');
    })
});