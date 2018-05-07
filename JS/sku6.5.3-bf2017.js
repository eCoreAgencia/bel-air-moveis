window.onload = function(){

  $(document).ready(function(){

      $('.next-arrow').click(function(){

        var parent = $(this).parent();
        var parentMaster = parent.parent();
        var encontraCores = parentMaster.find('.produto-cor');
        var primeiro = encontraCores.find('.quadrado').first();
        var ultimo = encontraCores.find('.quadrado').last();
        primeiro.insertAfter(ultimo);

      });


      $('.prev-arrow').click(function(){
        var parent = $(this).parent();
        var parentMaster = parent.parent();
        var encontraCores = parentMaster.find('.produto-cor');
        var primeiro = encontraCores.find('.quadrado').first();
        var ultimo = encontraCores.find('.quadrado').last();
        ultimo.insertBefore(primeiro);
      });

    var getSkuVariacao = function(){


      $(".produto-cor").each(function(index) {

          var base_url = "/api/catalog_system/pub/products/variations/";

          var id = $(this).attr("id_produto");
          var $this = $(this);
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
              $this.append("<div class='quadrado "+val+"' data-url='"+url_img+"'><img src='"+url_img+"' /></div>");
            });
            if($this.find('.quadrado').length < 3) $(this).siblings().remove();
          });
      });



      $(document).ajaxComplete(function(){
        $('.productList .quadrado').each(function(){
          var currentURL = $(this).attr('class');
          var parametroatrocar = currentURL.split(/\//)[0];
          var parametroacrescentar = currentURL.split(/\//)[1];
          $(this).removeClass();
          $(this).addClass(parametroatrocar + ' ' + '-' + parametroacrescentar);
        });
      });

      setTimeout(function(){
        var img_url = [],
            temp;
        $(".produto-cor > div > img").filter(function(){
            temp = $(this).attr("src");
            if($.inArray(temp, img_url) < 0){
                img_url.push(temp);
                return false;
            }
            $(this).parent().remove();
            return true;
        }).remove();
      },1500)


    }

    getSkuVariacao();



    $(document).on("mouseenter",".quadrado",function(){
      var Div = "<div style='background:rgba(255,255,255,0.6) center no-repeat;top:0;bottom:0;left:0;right:0;position:absolute;'></div>";

      var loader = $(Div);

      $(this).closest("li").find(".productImage > a")
        .css("position","relative")
        .append(loader)
        .find("img")
        .attr("src",$(this).data("url"));

      if($(this).hasClass("hovered")){
      	loader.remove();
      } else {

        	$(this).closest("li")
          .find(".productImage > a > img")
          .load(function(){
            loader.remove()
          });

      	  $('.prateleira li').removeClass("hovered");

      	  $(this).addClass("hovered");

      }

    });


      // Arrow Thumbs Next //
        $('.next-arrow').click(function(){
          var parent = $(this).parent();
          var parentMaster = parent.parent();
          var encontraCores = parentMaster.find('.produto-cor');
          var primeiro = encontraCores.find('.quadrado').first();
          var ultimo = encontraCores.find('.quadrado').last();
          primeiro.insertAfter(ultimo);
        });
      // Arrow Thumbs Next //

      // Arrow Thumbs Prev //

        $('.prev-arrow').click(function(){
          var parent = $(this).parent();
          var parentMaster = parent.parent();
          var encontraCores = parentMaster.find('.produto-cor');
          var primeiro = encontraCores.find('.quadrado').first();
          var ultimo = encontraCores.find('.quadrado').last();
          ultimo.insertBefore(primeiro);
        });

        // Arrow Thumbs Prev //

          setTimeout(function(){

              $("li.helperComplement").remove()

            clearSkuLessThanOne()
          },3000)

          var clearSkuLessThanOne = function(){
                  $(".produto-cor").each(function(){
                  	itens = $(this).children().length;
                    if(itens <= 1){
                    $(this).parent().html('').attr('style','height:0px');
                    }
                  })
          }

          $(document).delegate( ".pages", "click", function() {

            setTimeout(function(){
              console.log('Clicou');
              getSkuVariacao()
              $("li.helperComplement").remove()
              console.log('liRemoved')

            },3000)

            setTimeout(function(){

              clearSkuLessThanOne()

            },6000)

          })

  });

}
