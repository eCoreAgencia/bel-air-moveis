$(document).ready(function(){
    // Compra Persistente //
        $(window).scroll(function() {
        var scroll = $(window).scrollTop();
            if (scroll >= 450) {
                $('.buyProduct').addClass('compra-persistente');
                $('<span class="close-button-compra-persistente">x</span>').insertBefore('.buyProduct.compra-persistente .flagsClone');

                $('.close-button-compra-persistente').click(function(){
                    $('.buyProduct.compra-persistente').addClass('not');
                });

            } else {
                $('.buyProduct').removeClass('compra-persistente');
                $('.buyProduct').removeClass('not');
            }
        });
    // Compra Persistente //
});