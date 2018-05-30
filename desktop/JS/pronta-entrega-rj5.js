var loadProntaEntrega = (function(){
  var executou = false;
  return function(){
    if( !executou ){

      var base_url = "/api/catalog_system/pub/products/search/?fq=productClusterIds:288&_from=0&_to=49",
      base_url2 = "/api/catalog_system/pub/products/search/?fq=productClusterIds:288&_from=50&_to=99";

      function getURL(url){
        return $.getJSON(url).then(function(data){
          return data;
        })
      }

      $.when(getURL(base_url), getURL(base_url2)).done(function(data1, data2){
        var ids = "";

        $.each(data1, function(key, val) {
          ids += val.productId + ",";
        });

        $.each(data2, function(key, val) {
          ids += val.productId + ",";
        });

        ids = ids.substring(0, ids.length - 1);

        if($("body").hasClass('home')){
            $(".prateleira li span").each(function(){

              if( ids.search($(this).attr('data-id')) >= 0){
                $(this).parent().find('.wrapFlag').after('<div id="flag-pronta-entrega"></div>');
              }

             })
              executou = true;
        }
        if($("body").hasClass('catalog')){
            $(".productList li span").each(function(){

              if( ids.search($(this).attr('data-id')) >= 0){
                $(this).parent().find('.wrapFlag').after('<div id="flag-pronta-entrega"></div>');
              }
             })

            $(window).on('scroll', function(){
              if( $(this).scrollTop() === 7826 ){
                setTimeout(function(){
                  executou = false;
                  loadProntaEntrega();
                  console.log('executou')
                },2000)
              }else{

              }
            })
            executou = true;

        }

        if($("body").hasClass('product')){

              if( ids.search($("#___rc-p-id").val()) >= 0){
                $('.flags').after('<div id="flag-pronta-entrega"></div>');
              }
            executou = true;
        }



    });



    }
  }
})();

loadProntaEntrega();
