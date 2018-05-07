$('<style type="text/css">#flag-pronta-entrega{position:absolute;bottom:0;margin-bottom:280px;width:141px;height:38px;z-index:40;margin-left:0;background-image:url(/arquivos/flag-pronta-entrega-1.png)}</style>').appendTo($('head'));

function elementoMudouDeAltura(elm, callback){
	var ultimaAltura = elm.clientHeight, novaAltura;
  (function run(){
		novaAltura = elm.clientHeight;
		if( ultimaAltura != novaAltura ){
			callback();
		  ultimaAltura = novaAltura;
    }
        if (elm.elementoMudouDeAlturaTimer){
          clearTimeout(elm.elementoMudouDeAlturaTimer);
        }

		elm.elementoMudouDeAlturaTimer = setTimeout(run, 200);
	})();
}


var loadProntaEntrega = (function(){
  var executou = false;
  var cache1 = "";
  var cache2 = "";
  var cache3 = "";
  return function(){
    if( !executou ){

      var base_url = "/api/catalog_system/pub/products/search/?fq=productClusterIds:288&_from=0&_to=49",
      base_url2 = "/api/catalog_system/pub/products/search/?fq=productClusterIds:288&_from=50&_to=99",
      base_url3 = "/api/catalog_system/pub/products/search/?fq=productClusterIds:288&_from=100&_to=149";

      function getURL(url){
        return $.getJSON(url).then(function(data){
          return data;
        })
      }

      if(!cache1){ cache1 = getURL(base_url); }
      if(!cache2){ cache2 = getURL(base_url2); }
      if(!cache3){ cache3 = getURL(base_url3); }


      $.when(cache1, cache2, cache3).done(function(data1, data2, data3){
        var ids = "";

        $.each(data1, function(key, val) {
          ids += val.productId + ",";
        });

        $.each(data2, function(key, val) {
          ids += val.productId + ",";
        });

        $.each(data3, function(key, val) {
          ids += val.productId + ",";
        });

        ids = ids.substring(0, ids.length - 1);

        if($("body").hasClass('home')){

                var n = $(".productList").length;
                var item = "";
                for(i = 0; i < n; i++){
                  $(".productList").eq(i).attr('data-flag', 'productList-'+i);

                }

                $(".productList[data-flag='productList-0'] li span").each(function(){
                  if( ids.search($(this).attr('data-id')) >= 1){
                    $(this).parent().find('.wrapFlag').after('<div id="flag-pronta-entrega"></div>');
                  }
                });

                $(".productList[data-flag='productList-1'] li span").each(function(){
                  if( ids.search($(this).attr('data-id')) >= 1){
                    $(this).parent().find('.wrapFlag').after('<div id="flag-pronta-entrega"></div>');
                  }
                });

                // $(".prateleira[data-flag='prateleira-2'] li span").each(function(){
                //   if( ids.search($(this).attr('data-id')) >= 1){
                //     $(this).parent().find('.wrapFlag').after('<div id="flag-pronta-entrega"></div>');
                //   }
                // });

                executou = true;

        }
        if($("body").hasClass('catalog')){
            $(".productList li span").each(function(){

              if( ids.search($(this).attr('data-id')) >= 1){
                $(this).parent().find('.wrapFlag').after('<div id="flag-pronta-entrega"></div>');
              }
             })

             elementoMudouDeAltura(document.body, function(){
               setTimeout(function(){
                 executou = false;
                 loadProntaEntrega()
                 console.log('mudou de altura1');
               },2500)
             });
            executou = true;


        }

        if($("body").hasClass('product')){

              if( ids.search($("#___rc-p-id").val()) >= 1){
                $('.flags').after('<div id="flag-pronta-entrega"></div>');
              }
            executou = true;
        }



    });



    }
  }
})();

loadProntaEntrega();
