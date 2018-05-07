$(document).ready(function(){


        var headerPersistente = (function() {
            var executou = false;
            return function() {
                if (!executou) {
                    executou = true;
                    $(".headerPersistente").addClass('hp-noHome').removeClass('hp-isHome');

                    if($('body').hasClass('home')){
                      $(".headerPersistente").addClass('hp-isHome').removeClass('hp-noHome');
                    }
                    var menuAtual = $("#mainMenu").clone()
                    $(".headerPersistente .pageHeaderMob").after(menuAtual);

                    // var miniCartClone = $(".miniCart").clone();
                    // $(".specMiniClone").html(miniCartClone);
                    //
                    // var searchBox = $(".searchBoxO").clone();
                    // $('.searchBoxPersistente').html(searchBox);
                }
            };
        })();

        $(window).on('scroll', function(){
            if( $(window).scrollTop() > 60 ){

                $(".headerNormal").hide();
                headerPersistente();
                $(".headerPersistente").show();

            }else{

                $(".headerNormal").show();
                $(".headerPersistente").hide();

            }
        })
});
