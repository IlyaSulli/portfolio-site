jQuery(function ($) {

    // Cycle plugin
    $('.porfolioSlides').cycle({
        fx: 'none',
        speed: 150,
        timeout: 5
    }).cycle("pause");

    // Pause &amp; play on hover
    $('.portfolioImage').hover(function () {
        $(this).find('.porfolioSlides').addClass('active').cycle('resume');
    }, function () {
        $(this).find('.porfolioSlides').removeClass('active').cycle('pause');
    });

});