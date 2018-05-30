window.onload = function(){
$(document).ready(function(){

  // Arrow Thumbs Next //
    $('.next-arrow').click(function(){

      var papai = $(this).parent();
      var vovo = papai.parent();
      var encontraCores = vovo.find('.produto-cor');
      var primeiro = encontraCores.find('.quadrado').first();
      var ultimo = encontraCores.find('.quadrado').last();
      primeiro.insertAfter(ultimo);

    });
  // Arrow Thumbs Next //

  // Arrow Thumbs Prev //
    $('.prev-arrow').click(function(){
      var papai = $(this).parent();
      var vovo = papai.parent();
      var encontraCores = vovo.find('.produto-cor');
      var primeiro = encontraCores.find('.quadrado').first();
      var ultimo = encontraCores.find('.quadrado').last();
      ultimo.insertBefore(primeiro);
    });
  // Arrow Thumbs Prev //

  $(".produto-cor").each(function(index) {
      var storeName = "belairmoveis.vtexcommercestable.com.br";
      var base_url = "http://" + storeName + "/api/catalog_system/pub/products/variations/";

      var id = $(this).attr("id_produto");
      var url = base_url + id;
      $.getJSON(url, function(data) {
        $.each(data.dimensionsMap.Cor, function(key, val) {
          var url_img;
          $.each(data.skus,function(key1,val1){
            if(val1.dimensions.Cor == val){
              url_img = val1.image;
              return false;
            }
          });
        $('[id_produto="' + id + '"]').append("<div class='quadrado "+val+"' data-url='"+url_img+"'><img src='"+url_img+"' /></div>");
        });
    });
  });
});

$(document).on("mouseenter",".quadrado",function(){
    var loader = $("<div style='background:rgba(255,255,255,0.6) url(http://belairmoveis.vtexcommercestable.com.br/arquivos/zoom-loader.gif) center no-repeat;top:0;bottom:0;left:0;right:0;position:absolute;'></div>");
    $(this).closest("li").find(".productImage > a").css("position","relative").append(loader).find("img").attr("src",$(this).data("url"));

    if($(this).hasClass("hovered")){
    	loader.remove();
    } else {
    	$(this).closest("li").find(".productImage > a > img").load(function(){loader.remove()});
    	$('.prateleira li').removeClass("hovered");
    	$(this).addClass("hovered");
    }
});

$(document).ajaxComplete(function(){
  $('.productList .quadrado').each(function(){
      var currentURL = $(this).attr('class');
      var parametroatrocar = currentURL.split(/\//)[0];
      var parametroacrescentar = currentURL.split(/\//)[1];
      $(this).removeClass();
      $(this).addClass(parametroatrocar + ' ' + '-' + parametroacrescentar);
  });

  // Remove Arrows Without Colors //
    $('.prateleira li.acessorios .produto-cor').each(function(){
      var encontraQuadrado = $(this).find('div');
      if($(encontraQuadrado).length > 0){
        $(this).parent().addClass('active');
      }
    });
  // Remove Arrows Without Colors //

  // Arrow Thumbs Next //
    $('.next-arrow').click(function(){
      var papai = $(this).parent();
      var vovo = papai.parent();
      var encontraCores = vovo.find('.produto-cor');
      var primeiro = encontraCores.find('.quadrado').first();
      var ultimo = encontraCores.find('.quadrado').last();
      primeiro.insertAfter(ultimo);
    });
  // Arrow Thumbs Next //

  // Arrow Thumbs Prev //
    $('.prev-arrow').click(function(){
      var papai = $(this).parent();
      var vovo = papai.parent();
      var encontraCores = vovo.find('.produto-cor');
      var primeiro = encontraCores.find('.quadrado').first();
      var ultimo = encontraCores.find('.quadrado').last();
      ultimo.insertBefore(primeiro);
    });
  // Arrow Thumbs Prev //

  setTimeout(function(){
    if($(".helperComplement").length){
      $(".helperComplement").remove()
    }
  },3500)

  console.log('chamou versão sku-test 1.4 - 18:14');

});
}
