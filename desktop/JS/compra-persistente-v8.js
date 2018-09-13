$(document).ready(function(){
    // Compra Persistente //
        $(window).scroll(function() {
        var scroll = $(window).scrollTop();
            if (scroll >= 450) {
                $('.buyProduct').addClass('compra-persistente');
                $('#jivo-iframe-container').remove();
                $('.globalClass_ET').remove();
                if(!$('.compra-persistente-2 .productName .trustvox-rate')[0]){
                    $('.trustvox-rate').clone().appendTo('.compra-persistente-2 .buyProduct.compra-persistente .priceProduct .productName');
                }
                
            } else {
                $('.buyProduct').removeClass('compra-persistente');
                $('.compra-persistente-2 .productName .trustvox-rate').remove();
            }
        });
    // Compra Persistente //
});