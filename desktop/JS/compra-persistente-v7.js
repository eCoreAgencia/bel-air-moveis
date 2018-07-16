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
    // Compra Persistente //
});