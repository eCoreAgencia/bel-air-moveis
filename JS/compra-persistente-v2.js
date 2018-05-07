$(document).ready(function(){
    // Compra Persistente //
        $(window).scroll(function() {
        var scroll = $(window).scrollTop();
            if (scroll >= 450) {
                $('.buyProduct').addClass('compra-persistente');
                $('#jivo-iframe-container').remove();
                $('.globalClass_ET').remove();

            } else {
                $('.buyProduct').removeClass('compra-persistente');
            }
        });

        $(window).scroll(function() {
        var scrollFixed = $(window).scrollTop();
            if (scrollFixed >= 1650) {
                $('.buyProduct.compra-persistente').addClass('fixed');
            } else {
                $('.buyProduct.compra-persistente').removeClass('fixed');
            }
        });
    // Compra Persistente //
});