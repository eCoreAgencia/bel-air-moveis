$(document).ready(function() {
    $.cookie("newsletter", "ok", { path: '/', expires: 10 });
});

var fns = {
	lightboxOverlay:    $('<div class="lightboxOverlay"></div>'),

    lightboxBlock:      $('<div class="lightboxOverlayInner"></div><div class="lightboxBlock"><a href="#" class="lightboxClose"></a><div class="lightboxInner"></div></div>'),

    lightbox: function(content) {
        $(content).appendTo(".lightboxInner");

        var pageHeight = $(window).height();
        var pageWidth = $(window).width();
        var contentWidth = $(content).outerWidth();
        var contentHeight = $(content).outerHeight();
        var maxWidthContent = pageWidth * 0.8;
        var maxHeightContent = pageHeight * 0.8;

        if (contentWidth > maxWidthContent) {
            var contentWidthFinal = maxWidthContent;
        } else {
            var contentWidthFinal = contentWidth;
        }

        if (contentHeight > maxHeightContent) {
            var contentHeightFinal = maxHeightContent;
        } else {
            var contentHeightFinal = contentHeight;
        }

        $('.lightboxOverlay').css({
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'background-color': 'rgba(0,0,0,0.6)',
            'height': '100%',
            'width': '100%',
            'z-index': '5005'
        });

        $('.lightboxOverlay').addClass("open");

        console.log(contentHeightFinal);
        console.log(contentWidthFinal);

        $('.lightboxBlock').css("position", "fixed");
        $('.lightboxBlock').css("top", Math.max(0, ((pageHeight - contentHeightFinal) / 2)) + "px");
        $('.lightboxBlock').css("left", Math.max(0, ((pageWidth - contentWidthFinal) / 2) + $(window).scrollLeft()) + "px");

        $(".lightboxInner").css({
            'max-height': contentHeightFinal,
            'max-width': contentWidthFinal
        });
        // $(".lightboxInner " + content).css({'max-height': contentHeightFinal});

        $('.lightboxClose').click(function() {
            $('.lightboxOverlay').removeClass("open");
            $(".lightboxInner").empty();
        });

        $('.lightboxOverlayInner').click(function() {
            $('.lightboxOverlay').removeClass("open");
            $(".lightboxInner").empty();
        });
    },

	tabs: function(){
		$(".tabNav").on("click", ".tabLink", function() {
	        var ref = $(this).attr("data-ref");
	        $(".tabLink, .tabContent").removeClass("active");
	        $(this).addClass("active");
	        $(".tabsItems").find("."+ref).addClass("active");
	    });
	},

	isMobile: function(){
		var userAgent = navigator.userAgent.toLowerCase();
		if( userAgent.search(/(android|avantgo|blackberry|iemobile|nokia|lumia|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i)!= -1 ){
			$('.lightboxOverlay').remove();
		};
	},

	shareWindow: function(urlProduct, urlMediaProduct){
		var facebook = "https://www.facebook.com/sharer/sharer.php?u=" + urlProduct,
		twitter = "https://twitter.com/home?status=" + urlProduct,
		pinterest = "https://pinterest.com/pin/create/button/?url=" + urlProduct + "&media=" + urlMediaProduct,
		gplus = "https://plus.google.com/share?url=" + urlProduct;

		$(".shareProduct .facebook").attr("href", facebook);
		$(".shareProduct .twitter").attr("href", twitter);
		$(".shareProduct .pinterest").attr("href", pinterest);
		$(".shareProduct .gplus").attr("href", gplus);

		$(".shareProduct a").on("click", function(){
        	newwindow=window.open($(this).attr('href'),'','height=400,width=400');
        	if (window.focus) {newwindow.focus()}
        	return false;
		});
	},

	toggleBox: function(){
		$(".boxToggle p").on("click", function(){
			$(this).next(".boxContent").slideToggle();
			$(this).toggleClass("active");
		})
	},

	imageFull: function(){
		$(".mainGallery.fullGallery .box-banner").each(function() {
           var bImg = $(this).find("img").attr("src");
           $(this).wrap("<div class='bannerImg' style='background:url("+bImg+") no-repeat center;'></div>");
           $(this).find("img").remove();
        });
	},

	numberWithCommas: function(x) {
	    var parts = x.toString().split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	    return parts.join(".");
	},
}

var global = {
    floatHeader: function(){
    	var floatingBar=$(".floatHeader"),
    	logo = $(".pageHeader .logo .logoImg");
    	search = $(".pageHeader .searchBox .busca");
    	smartCart = $(".pageHeader .miniCart");

	    $(window).bind("scroll",function(){
	        if($(this).scrollTop()>100){
	            floatingBar.fadeIn(100);
	            logo.addClass("floatElement");
	            search.addClass("floatElement");
	            smartCart.addClass("floatElement");
	        }
	        else{
	            logo.removeClass("floatElement");
	            search.removeClass("floatElement");
	            smartCart.removeClass("floatElement");
	            floatingBar.fadeOut(100);
	        }
	    });
    },

    menu: function(){
    	var menuOutObject;
		var menuOutTimer;

		$(".menu-departamento ul").each(function(){
			if(!$(this).find("li").length){
				$(this).remove();
			}
		});

		$(function() {
			$('.pageNav .menu-departamento h3').hover(
				function() {
					menuOutObject = $(this).next('ul');
					y = $(this).position().left;
					menuOutObject.css('left', y);

					if (!menuOutObject.is(':visible')) {
						hideMenuSubItems($('.pageNav .menu-departamento ul:visible'));
					}
					clearTimeout(menuOutTimer);
					menuOutObject.fadeIn();
				},

				function() {
					menuOutTimer = setTimeout(function() {
					hideMenuSubItems(menuOutObject);
				}, 10);
			});

			$('.pageNav .menu-departamento ul').hover(
				function() {
					menuOutObject = $(this);
					clearTimeout(menuOutTimer);
				},
				function() {
					menuOutTimer = setTimeout(function() {
					hideMenuSubItems(menuOutObject);
				}, 10);
			});

			$(".pageNav .menu-departamento ul").mouseover(function(){
			    $(this).prev('h3').addClass("active");
			});
			$(".pageNav .menu-departamento ul").mouseout(function(){
			    $(this).prev('h3').removeClass("active");
			});
		});

		function hideMenuSubItems(o) {
			o.fadeOut(10);
		}
    },

    newsCad: function() {
    	 function closeNews() {
            $('.lightboxOverlay').fadeOut(500, function(){
                $(this).remove();
            });

            $.cookie("newsletter", "ok", { path: '/', expires: 10 });
        }

        if(!$.cookie("newsletter")){
            newsLightbox = $(".newsLightbox2");

            fns.lightboxOverlay.appendTo('body');
            fns.lightboxBlock.appendTo('.lightboxOverlay');

            fns.lightbox(newsLightbox);

            $('.lightboxClose').click(function(e){
                e.preventDefault();
                closeNews();
            });
        }

        if($.cookie("newsletter") == "ok"){
            $('.newsLightbox2').remove();
        }

        $(document).ajaxStop(function(){
       		$.cookie("newsletter", "ok", { path: '/', expires: 10 });
       	});

    },

    newsletter: function(){
        function closeNews() {
            $('.lightboxOverlay').fadeOut(500, function(){
                $(this).remove();
            });

            $.cookie("newsletter", "ok", { path: '/', expires: 10 });
        }

        if(!$.cookie("newsletter")){
            newsLightbox = $(".newsLightbox");

            fns.lightboxOverlay.appendTo('body');
            fns.lightboxBlock.appendTo('.lightboxOverlay');

            fns.lightbox(newsLightbox);

            $('.lightboxClose').click(function(e){
                e.preventDefault();
                closeNews();
            });
        }

        if($.cookie("newsletter") == "ok"){
            $('.newsLightbox').remove();
        }


        $(document).ajaxStop(function(){

        	var textResposta = '<h4>Seu email foi cadastrado com sucesso</h4>\
        						<p>Salve o cÃƒÂ³digo abaixo. Ele serÃƒÂ¡ necessÃƒÂ¡rio para a aplicaÃƒÂ§ÃƒÂ£o do desconto.</p>\
        						<strong class="cupom">Desc52015</strong></h3> <p>Na pÃƒÂ¡gina de pagamento, digite o cÃƒÂ³digo no campo Ã¢â‚¬Å“cupom de descontoÃ¢â‚¬Â\
								para receber 5% de desconto na sua primeira compra.</p> <p><em>VÃƒÂ¡lida atÃƒÂ© 31/12/2015</em></p>'

        	$.cookie("newsletter", "ok", { path: '/', expires: 10 });
        	if ($(".newsLightbox fieldset").hasClass('success')) {
        		$(this).find('label').html(textResposta);
        	};
        });

        fns.isMobile();
    },

    cartFns:function() {
    	$(".vtexsc-wrap").mCustomScrollbar({
            axis: "y"
        });
    },

    searchWord: function () {
		var word = decodeURI(window.location.search);
		word = word.replace("?ft=","");
		$(".box-emptySearch p span em").text(word);
	},

	shelf:function() {
		$(".shelf li").each(function() {
			var _this = $(this);
			if(_this.find(".sizes").length>=1) {
				_this.find(".sizes > div").each(function() {
					if($(this).find("li").text()=="") {
						$(this).remove();
					}
				});

			}

			// PreÃƒÂ§o a vista
			if ($(this).find(".bestPrice span").length > 0) {
		        var pClub = $(this).find(".bestPrice span").text();
		        var pClubrNum = pClub.replace('R$ ', '').replace('.', '');
		        var pClubrNumReal = parseFloat(pClubrNum.replace(",", "."));
		        var pClubrNumReal = pClubrNumReal - (pClubrNumReal * 5) / 100;
		        var pClubrNumReal = pClubrNumReal.toFixed(2);

		        var pClubrNumString = pClubrNumReal.toString();
		        pClubrNumString = pClubrNumString.split(".");
		        var p = fns.numberWithCommas(pClubrNumString[0]);

		        $(this).find(".bestPrice").html('<span>R$ ' + p + ',' + pClubrNumString[1] + '</span> Ãƒ  vista</b>');
		    }
		});
	},

	loveShelf:function () {
		$(".loveShelf  li").each(function() {

			if ($(this).find(".bestPrice span").length > 0) {
		        var pClub = $(this).find(".bestPrice span").text();
		        var pClubrNum = pClub.replace('R$ ', '').replace('.', '');
		        var pClubrNumReal = parseFloat(pClubrNum.replace(",", "."));
		        var pClubrNumReal = pClubrNumReal - (pClubrNumReal * 5) / 100;
		        var pClubrNumReal = pClubrNumReal.toFixed(2);

		        var pClubrNumString = pClubrNumReal.toString();
		        pClubrNumString = pClubrNumString.split(".");
		        var p = fns.numberWithCommas(pClubrNumString[0]);

		        $(this).find(".bestPrice").html('<span>R$ ' + p + ',' + pClubrNumString[1] + '</span> Ãƒ  vista</b>');
		    }
		});
	},

    init: function () {
    	global.floatHeader();
    	global.menu();
    	//global.newsletter();
    	global.cartFns();
    	global.searchWord();
    	global.shelf();
    	global.newsCad();
    }
}

var slider = {
	singleSlider: function (element, dots, arrows) {
		element.slick({
			dots: dots,
			arrows: arrows,
			pauseOnHover: false,
			autoplay: true,
  			autoplaySpeed: 4000
		});
	},

	shelfSlider: function (dots, arrows, slidesToShow, slidesToScroll) { // carrossel de produtos
        $(".shelfCarousel").each(function() {
            $(this).find("ul").slick({
                dots: dots,
                arrows: arrows,
                slidesToShow: slidesToShow,
                slidesToScroll: slidesToScroll,
                pauseOnHover: false,
                autoplay: false,
                autoplaySpeed: 4000
            });
        });
    },

	multipleSlider: function (slidesToShow, slidesToScroll, vertical) {
		$(".carouselGallery").slick({
		    infinite: true,
		    slidesToShow: slidesToShow,
			slidesToScroll: slidesToScroll,
		    speed: 500,
		    vertical: vertical
		});
	},
}

var catalog = {
    /*
	smartResearch: function(){
		$(".navSidebar input[type='checkbox']").vtexSmartResearch({
            ajaxCallback: function() {
                $("li.helperComplement").remove();
            }
        });
	},*/

	textItemDepartament: function() {
        var regexpItens = /\({1}([0-9])*?\){1}/g;
        var depString = $('.navSidebar h4 a');
        for (var i = 0; i < depString.length; i++) {
            var newText = $(depString[i]).text().replace(regexpItens, "");
            $(depString[i]).text(newText);
        };
    },

    categoryResult: function () {
    	var t = $('.search-multiple-navigator h3').attr('class');

    	$('.categoryOptions').children().each(function () {
    		if (!$(this).hasClass('menu-departamento')) {
    			$(this).remove()
    		};
    	});


    	$('.categoryOptions .menu-departamento').children().each(function () {
    		if (t === "armazem-b") {
    			var catg = $(".search-single-navigator h4").next("ul").attr("class").split(' ')[0];

	    		if (!$(this).hasClass(catg)) {
	    			$(this).hide()
	    		}
	    	} else if (!$(this).hasClass(t)) {
    			$(this).hide()
    		}
		})
    	$('.categoryOptions').show();
    },

	searchWord: function () {
		var numItens = $('.resultado-busca-numero:eq(0) .value').text()
        var word = $(".resultado-busca-termo:eq(0)").find("strong").text();
        $(".topName .titulo-sessao").html('"'+ word +'"');
        $(".categoryOptions").html ('Foram encontrados  <em>' + numItens + '</em> resultados para a sua busca na(s) categoria(s) abaixo:');
	},

	emptySearch: function () {
		var word = decodeURI(window.location.search);
		word = word.replace("?ft=","");
		$(".box-emptySearch p span em").text(word);
	},

	infinityScroll: function() {
		$(".productList[id*=ResultItems]").QD_infinityScroll({
			callback: function() {
				global.shelf();
			}
		});
	},

	init: function  () {
		if (!$("body").hasClass("department")) {
			//catalog.smartResearch();
			catalog.categoryResult();
		};

		if ($('body').hasClass('searchResult')) {
			catalog.searchWord();
		};

		if ($("body").hasClass("corporativo")) {
			catalog.infinityScroll();
		};
		catalog.textItemDepartament();
	}
}

var product = {
    share: function(){
		var urlProduct = window.location.href;
		var urlMediaProduct = $("#image img").attr("src");

		fns.shareWindow(urlProduct, urlMediaProduct);
	},

	superZoom: function (width, height) {
		window.LoadZoom = function (pi) {
			if($(".image-zoom").length<=0) return false;
			var optionsZoom = {
				zoomWidth: width,
				zoomHeight: height,
				preloadText: ''
			};
	    	$(".image-zoom").jqzoom(optionsZoom);
		}
	    LoadZoom(0);
	},

	specification: function(){
		if($("#caracteristicas .Especificacoes").length){
			var content = $("#caracteristicas .Especificacoes").next("table").wrap("<div>").html();

			$(".productRef").after("<div class='productSpec'><p>Medidas</p></div>");
			$(".productSpec").append("<table>" + content + "</table>");
		}
	},

	qtdBuy: function(){
		$(".buyProduct .prodQtd .addItem").on("click", function() {
			var quant = $(".buyProductButton .qtdValue").val();

			if(quant < 10) {
				var total = parseInt(quant)+1;
				$(".buyProductButton").find(".qtdValue").val(total);

				var idSku = $(".buy-button").attr("href").split("=")[1].split("&")[0];
				$(".buyProductButton .buy-button").attr("href","/checkout/cart/add?sku="+idSku+"&qty="+total+"&seller=1&redirect=true&sc=1");
			}
		});

		$(".buyProduct .prodQtd .removeItem").on("click", function() {
			var quant = $(".buyProductButton .qtdValue").val();

			if(quant > 1) {
				var total = parseInt(quant)-1;
				$(".buyProductButton").find(".qtdValue").val(total);

				var idSku = $(".buy-button").attr("href").split("=")[1].split("&")[0];
				$(".buyProductButton .buy-button").attr("href","/checkout/cart/add?sku="+idSku+"&qty="+total+"&seller=1&redirect=true&sc=1");
			}
		});

		// $(".buyProduct .buy-button").bind("click", function(event) {
	 // 		event.preventDefault();

	 // 		if($(".buyProductButton .buy-button").attr("href").indexOf("checkout")>0) {
		// 		var quant = $(".buyProductButton .qtdValue").val();
		// 		var idSku = $(".buy-button").attr("href").split("=")[1].split("&")[0];
		// 		var url= "/checkout/cart/add?sku="+idSku+"&qty="+quant+"&seller=1&redirect=false&sc=1";
		// 		console.log(url);
		// 		var jqxhr = $.ajax({
		//         	type:'POST',
		//         	async:false,
		//         	url:url
		//         })
		//         .done(function() {
		//         })
		//         .fail(function() {
		//         })
		//         .always(function() {
		//         	//$(".popup.prodAddMsg").fadeIn();
		//         	vtexjs.checkout.getOrderForm();
		//         });
	 //    	} else {
	 //    		alert("Selecione a variaÃƒÂ§ÃƒÂ£o do produto");
	 //    	}
		// });
	},

	buyTogether:function() {

		var btHtml = $("#divCompreJunto").html();
		$("#BuyTogether").html(btHtml);

		var prodsDetails = [];

		$("#BuyTogether table tr").each(function() {

			var thisTr = $(this);

			var u = $(this).find("a#lnkComprar").attr("href");
			u = u.substring(u.indexOf("?"));

			var urlParams;
			(window.onpopstate = function () {
			    var match,
			        pl     = /\+/g,  // Regex for replacing addition symbol with a space
			        search = /([^&=]+)=?([^&]*)/g,
			        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
			        query  = u;

			    urlParams = {};
			    while (match = search.exec(query))
			       urlParams[decode(match[1])] = decode(match[2]);
			})();

			//console.log(urlParams);

			var idProds = [];
			var skusProds = [];

			var tdTable,
			object;
			$.when(


				$.ajax({
				 	url:"/produto/sku/"+urlParams["?sku"],
				 	async:false
				 })
				 .done(function(data) {
				    //console.log(data)
				    idProds.push(data[0].IdProduct);
				    thisTr.find(".itemA").attr("data-idprod",data[0].IdProduct);

				 }),
				 $.ajax({
				 	url:"/produto/sku/"+urlParams["sku"],
				 	async:false
				 })
				 .done(function(data) {
				    //console.log(data)
				    idProds.push(data[0].IdProduct);
				    thisTr.find(".itemB").attr("data-idprod",data[0].IdProduct);

				 })

			).then(function() {

			    //console.log(idProds);
			  	$.getScript( "//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js" )
				 .done(function( script, textStatus ) {

				 	  $.each(idProds, function(i) {

				 	  	vtexjs.catalog.getProductWithVariations(idProds[i]).done(function(product){
				 	  		if(thisTr.find(".itemA").attr("data-idprod")==product.productId) {
					 	  		tdTable = thisTr.find(".itemA");
					 	  	} else {
					 	  		tdTable = thisTr.find(".itemB");
					 	  	}


				    		//skusProds.push(data[0].IdProduct);

					 	    console.log(product);

					 	    var html= "";


					 	    $.each(product.skus, function(i) {
						 	 	if(product.skus[i].available) {
						 	 		x=i;
						 	 		return false;
						 	 	}
						 	});

					 	    price = '<div class="price">';
					 	    if(product.skus[x].listPrice > product.skus[x].bestPrice) {
					 	    	price += '<span class="old-price">'+product.skus[x].listPriceFormated+'</span><span class="best-price">'+product.skus[x].bestPriceFormated+'</span>'
					 	    } else {
					 	    	price += '<span class="best-price">'+product.skus[x].bestPriceFormated+'</span>'
					 	    }
					 	    price += "</div>"

					 	    tdTable.find("h3").wrap("<div class='contSide'></div>").find("a").text(product.name);
					 	    //tdTable.append("<div class='contSide'></div>");

					 	    var $title = tdTable.find("h3").clone();
					 	    //.find("a").text(product.name)
					 	    html += "<h3>"+$title.html()+"</h3>";
					 	    html += price;

					 	    //tdTable.find("h3").after(price);



					 	    tdTable.find("img").attr("src",product.skus[x].image);

					 	    /*verifica se hÃƒÂ¡ variaÃƒÂ§ÃƒÂ£o*/
					 	    if(product.dimensions.length>0) {
					 	    	$.each( product.dimensions, function(i) {

					 	    		html +='<select id="'+product.dimensions[i]+'">';
					 	    			html +='<option value=""  selected="true" disabled="disabled">'+product.dimensions[i]+'</option>';

					 	    			$.each( product.dimensionsMap[product.dimensions[i]] , function(x) {
					 	    				html +='<option value="'+product.dimensionsMap[product.dimensions[i]][x]+'">'+product.dimensionsMap[product.dimensions[i]][x]+'</option>';
					 	    			});

					 	    		html +='</select>';


								});

								tdTable.find(".contSide").html(html);

					 	    } else {
					 	    	tdTable.attr("data-sku",product.skus[0].sku );
					 	    }

					 	    prodsDetails.push(product);

					 	});
					  });
					  //console.log(prodsDetails)
				 })
				 .fail(function( jqxhr, settings, exception ) {
					console.log( "Triggered ajaxError handler." );
				})

			});





		});


		$("#BuyTogether td").on("change", "select", function() {

			$("td.itemA #ESTAMPA, td.itemB #ESTAMPA").val("UNICA");



			var skuSelect = "{";

			var thisElem = $(this);

			$.each(prodsDetails, function(i) {
				if(prodsDetails[i].productId==thisElem.closest("td").attr("data-idprod")) {
					w = i;
				}
			});


			i = 0;
			$(this).closest("td").find("select").each(function() {
				if($(this).find("option:selected").val()=="") {
					return false;
				} else {
					tId = $(this).attr("id");
					tVal = $(this).find("option:selected").val();
					skuSelect += '"'+tId+'": "'+tVal+'",';
					i++;
				}
			});
			skuSelect += "}";
			console.log(skuSelect);
			if($(this).closest("td").find("select").length==i) {
				//console.log(skuSelect);
				skuSelect = skuSelect.replace(",}","}");
				var obj = jQuery.parseJSON( skuSelect );
				//console.log( obj );

				$.each(prodsDetails[w].skus, function(i) {
					//console.log(prodsDetails[w]);
					console.log(prodsDetails[w]);

					if(JSON.stringify(obj)==JSON.stringify(prodsDetails[w].skus[i].dimensions)) {
						console.log(prodsDetails[w].skus[i]);

						thisElem.closest("td").attr("data-sku", prodsDetails[w].skus[i].sku);
						thisElem.removeClass("inactive");
						return false;
					} else {
						thisElem.closest("td").attr("data-sku", "");
						thisElem.addClass("inactive");
					}
				});
			}
		});




		$("#BuyTogether td.buy .comprar-junto a").on("click" ,function(event) {
			event.preventDefault();
			var url = $(this).attr("href");

			var sku1 = $(this).closest("tr").find(".itemA").attr("data-sku");
			var sku2 = $(this).closest("tr").find(".itemB").attr("data-sku");
			if(sku1==""||sku2==""||typeof sku1=="undefined"||typeof sku2=="undefined") {
				alert("EstÃƒÂ¡ faltando vocÃƒÂª especificar algum produto");
			} else {
			    window.location = "/checkout/cart/add?sku="+sku1+"&sku="+sku2+"&qty=1&qty=1&seller=1&seller=1&sc=1";

			}
		});
	},

	descPrice:function() {
        if ($(this).find(".bestPrice span").length > 0) {
	        var pClub = $(this).find(".bestPrice span").text();
	        var pClubrNum = pClub.replace('R$ ', '').replace('.', '');
	        var pClubrNumReal = parseFloat(pClubrNum.replace(",", "."));
	        var pClubrNumReal = pClubrNumReal - (pClubrNumReal * 10) / 100;
	        var pClubrNumReal = pClubrNumReal.toFixed(2);

	        var pClubrNumString = pClubrNumReal.toString();
	        pClubrNumString = pClubrNumString.split(".");
	        var p = fns.numberWithCommas(pClubrNumString[0]);

	        $(this).find(".bestPrice").html('<span>R$ ' + p + ',' + pClubrNumString[1] + '</span> Ãƒ  vista</b>');
	    }
    },

    inCashPrice: function () {
    	$('.inCashPrice').remove();
    	$(".priceProduct").append("<div class='inCashPrice'></div>");
		var _this = $('.preco-a-vista');
        var pClub = _this.find(".skuPrice").text();
		console.log(pClub);
        var pClubrNum = pClub.replace('R$ ', '').replace('.', '');
        var pClubrNumReal = parseFloat(pClubrNum.replace(",", "."));
        var pClubrNumReal = pClubrNumReal - (pClubrNumReal * 5) / 100;
        var pClubrNumReal = pClubrNumReal.toFixed(2);

        var pClubrNumString = pClubrNumReal.toString();
        pClubrNumString = pClubrNumString.split(".");
        var p = fns.numberWithCommas(pClubrNumString[0]);

       	$(".inCashPrice").html('ou R$ ' + p + ',' + pClubrNumString[1] + ' de 1x a 6x no cartÃƒÂ£o</b>');
    },

    applyDiscount: function () {
    	// 1x a 4x no cartÃƒÂ£o = 5% de desconto
		// 5 a 6x no cartao = 4% de desconto
		// 7x a 10x = preÃƒÂ§o do comum
		function calc (v) {
	    	for (var i = 1; i <= 10; i++) {
	    		if (v >= 1 && v < 7) {
    				return 0.95;
	    		} else {
	    			return 1;
	    		};
	    	};
		}

    	$('.other-payment-method-ul .vista').attr('class','other-payment-method-Visa-1');

    	$('[class^="other-payment-method-Visa-"]').each(function () {
    		var numParcela = $(this).attr('class').split('-');
    		numParcela = numParcela[numParcela.length -1];

	        var pClubrNumReal = $('.skuBestPrice').text();
	        pClubrNumReal = pClubrNumReal.replace('R$ ', '').replace('.', '');
	        pClubrNumReal = parseFloat(pClubrNumReal.replace(",", "."));
	        pClubrNumReal = (pClubrNumReal * calc(numParcela)) / numParcela;
	        pClubrNumReal = pClubrNumReal.toFixed(2);

	        var pClubrNumString = pClubrNumReal.toString();
	        pClubrNumString = pClubrNumString.split(".");
	        var p = fns.numberWithCommas(pClubrNumString[0]);

	        $(this).html('<span>'+numParcela+'X de</span> <strong>R$ ' + p + ',' + pClubrNumString[1] + '</strong> <span class="complement">sem juros</span>');
    	})
    },

	init: function(){
		product.share();
		product.superZoom(575,575)
		product.specification();
		product.qtdBuy();
		ShippingValue();
		fns.toggleBox();
		$(document).ajaxStop(function () {
			product.inCashPrice();
			product.applyDiscount();
		})
	}
}

var institutional = {
	linkSidebar: function (){
        $(".institutionalLinks li a").each(function(){
            var link = $(this).attr('href');
            var url = window.location.pathname;
            if(link == url){
                $(this).addClass("current");
            }
        });
    },

    init: function(){
    	institutional.linkSidebar();
    }
}

$(document).ajaxStop(function () {
	var el = $('.freight-values td:contains("Frete PrÃƒÂ³pria,")')
	el.text(el.text().replace('Frete PrÃƒÂ³pria,',''))

});


$(document).ready(function () {
	$("body").prepend('<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=801185559934326";fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script>');
	$(".helperComplement").remove();

	global.init();



	setTimeout( function(){
      $(".portal-minicart-ref").show();
	}, 5000);


	if ($('body').hasClass("home")) {
		fns.imageFull();
		slider.singleSlider($('.fullGallery'), true, true);

		global.loveShelf();
		$('.loveProducts__bannertv .loveShelf ul').slick({
			arrows: true,
			slidesToShow: 1,
			pauseOnHover: false,
			autoplay: true,
  			autoplaySpeed: 4000
		});


        $(".ourCollectionsNew").slick({
            dots: false,
            arrows: false,
            slidesToShow: 5,
			slidesToScroll: 1,
			autoplay: true,
			pauseOnHover: false,
			autoplaySpeed: 2000,
			infinite: true,
        });

	}

	if ($('body').hasClass("planejados")) {
		fns.imageFull();
		slider.shelfSlider(false, true, 4, 4);
		slider.singleSlider($('.mainGallery'), true, true);
		slider.singleSlider($('.loveProducts__bannertv '), false, true);
	}


	if ($('body').hasClass("product")) {
		product.init();

		$.each(skuJson_0.skus, function(i) {
			sku = this.sku;
			//console.log(sku);
			var i = 0;
			$.ajax({
				type:"GET",
				url:"/comprejuntosku/"+sku,
				dataType:"html",
				async:false

			})
			.done(function(n) {
				if(n!="") {
					$(".buy-together-content").html(n);
					product.buyTogether();
				}

				//console.log(n);
			})
			.fail(function() {
				$(".buy-together-content").html("erro ao buscar os dados do compre junto.")
			});
		});
	};

	if ( $('body').hasClass("catalog")) {
		slider.shelfSlider(false, true, 3, 3);
		$(".orderBy:eq(0)").appendTo(".topName");
		catalog.init();
	};

	if ($('body').hasClass('emptySearch')) {
		catalog.emptySearch();
		slider.shelfSlider(false, true, 4, 4);
	};

	if ($('body').hasClass("institutional")) {
		institutional.init();
	};
});


//plugins
$.fn.countSlider = function () {
    var slidesToShow = $(this).attr("data-slidesToShow");
	slidesToShow = parseInt(slidesToShow);

	$(this).slick({
	    slidesToShow: slidesToShow,
	    slidesToScroll: slidesToShow,
	    speed: 500,
	    infinite:false,
	    dots: true,
	    dotsClass: 'custom_paging',
	    customPaging: function (slider, i) {
	 		//FYI just have a look at the object to find aviable information
	 		//press f12 to access the console
	 		//you could also debug or look in the source
	 		return (i + 1);
		}
	});
	var totalSlide = $(this).slick('getSlick');
	totalSlide = totalSlide.slideCount;
	totalSlideMath = totalSlide/slidesToShow;
	totalSlideMath = Math.ceil(totalSlideMath);

	$(this).append('<div class="slideNumbers"><div class="numbers"><span class="slideNumbersItem current">'+1+ ' </span><span class="slideNumbersItem sep"> de</span> <span class="slideNumbersItem total">'+totalSlideMath+'</span></div></div>');

	$(this).on('afterChange', function(event, slick, currentSlide, nextSlide){
		var slidesToShow = $(this).find(".custom_paging .slick-active").text();
		$(this).find(".slideNumbersItem.current").text(slidesToShow);
	});

	var slideNum = $(this).find(".slideNumbers");
	$(this).find("button").appendTo(slideNum);


};
