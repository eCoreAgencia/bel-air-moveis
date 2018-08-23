
//CRIA UMA INSTANCIA DO OMComponentsMobile
var OMComponents = new OMComponentsMobile();

var fns = {	
	numberWithCommas: function(x) {
	    var parts = x.toString().split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	    return parts.join(".");
	}
}

$(document).ready(function(){
	$(".helperComplement").remove();
	"function" !== typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function() {
		var b = {
			"\u00e7": "c","\u00e6": "ae","\u0153": "oe","\u00e1": "a","\u00e9": "e","\u00ed": "i","\u00f3": "o","\u00fa": "u","\u00e0": "a","\u00e8": "e","\u00ec": "i","\u00f2": "o","\u00f9": "u","\u00e4": "a","\u00eb": "e","\u00ef": "i","\u00f6": "o","\u00fc": "u","\u00ff": "y","\u00e2": "a","\u00ea": "e","\u00ee": "i","\u00f4": "o","\u00fb": "u","\u00e5": "a","\u00e3": "a","\u00f8": "o","\u00f5": "o","\u00c1": "A","\u00c9": "E","\u00cd": "I","\u00d3": "O","\u00da": "U","\u00ca": "E","\u00d4": "O","\u00dc": "U","\u00c3": "A","\u00d5": "O","\u00c0": "A","\u00c7": "C"
		};
		return this.replace(/[\u00e0-\u00fa]/g, function(a) {
			return "undefined" != typeof b[a] ? b[a] : a
		});
	});

	function om_getUrlParameter(name, url) {
		if (!url && !!window) url = window.location.href;
		name = (name || '').replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}


	
	//GLOBAL ===============================================
	//=======================================================



	// DESCONTO 5% A VISTA

	$(".shelf li, .loveShelf li").each(function() {	
		// Preço a vista
		if ($(this).find(".bestPrice span").length > 0) {
	        var pClub = $(this).find(".bestPrice span").text();
	        var pClubrNum = pClub.replace('R$ ', '').replace('.', '');
	        var pClubrNumReal = parseFloat(pClubrNum.replace(",", "."));
	        var pClubrNumReal = pClubrNumReal - (pClubrNumReal * 5) / 100;
	        var pClubrNumReal = pClubrNumReal.toFixed(2);

	        var pClubrNumString = pClubrNumReal.toString();
	        pClubrNumString = pClubrNumString.split(".");
	        var p = fns.numberWithCommas(pClubrNumString[0]);

<<<<<<< HEAD
	        $(this).find(".bestPrice").html('<span>R$ ' + p + ',' + pClubrNumString[1] + '</span> 1x no cartão</b>');
=======
	        $(this).find(".bestPrice").html('<span>R$ ' + p + ',' + pClubrNumString[1] + '</span> à vista</b>');
>>>>>>> 4be13b9ac57a78206d104560da1f902633f788de
	    }
	});


	//INICIA OS COMPONENTES DA LIB
	OMComponents.init();

	//APLICAS AS FUNCIONALIDADES DO MENU
	OMComponents.menu.init('#pageMenu');

	OMComponents.slider.singleSlider(true,false);
	OMComponents.slider.shelfSlider(true, false, 2, 2, false);
	$(".featuredBanners").each(function() {
		$(this).slick({
			dots: false,
			arrows: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 500,
			vertical: false
		});
	});
	$(".shelfBanner ul").slick({
		dots: false,
		arrows: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 500,
		vertical: false
	});


	OMComponents.account.showLinkMenu();

	//REMOVE O HELPER COMPLEMENT DAS VITRINES
	$(".helperComplement").remove();


	//APLICA FUNCIONALIDADE DE VOLTAR AO TOPO
	$('.backTop').on('click', OMComponents.scrollTo.header);	


	//PRODUTO ===============================================
	//=======================================================
	if($("body").hasClass("product")){

		function carouselApply(){
			$(".thumbs").stop(true, true).fadeOut('slow');
			$(".thumbs.slick-initialized").slick('unslick');
			setTimeout(function(){
				var thumbs = [];
				$('.thumbs li a').each(function() {
					var urlgrande = $(this).attr('rel');
					$(this).find('img').attr('src', urlgrande);
					thumbs.push($('<li>').append($(this).clone()).prop('outerHTML'));
				});
				$('.thumbs').html(thumbs.join(''));

				$(".thumbs").slick({
					dots: true,
					arrows: false,
				});
				
				$(".thumbs").stop(true, true).fadeIn('fast');
			});
		}

		function inCashPrice(){
	    	$('.inCashPrice').remove();
			$(".descricao-preco").append("<div class='inCashPrice'></div>");
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

<<<<<<< HEAD
			$(".inCashPrice").html('ou R$ ' + p + ',' + pClubrNumString[1] + ' 1x no cratão</b>');
=======
			$(".inCashPrice").html('ou R$ ' + p + ',' + pClubrNumString[1] + ' à vista 1x no CARTÃO DE CRÉDITO</b>');
>>>>>>> 4be13b9ac57a78206d104560da1f902633f788de
		}
		
	    inCashPrice();

	    function applyDiscount() {

			// 1x a 4x no cartÃƒÂ£o = 5% de desconto
			// 5 a 6x no cartao = 4% de desconto
			// 7x a 10x = preÃƒÂ§o do comum
			function calc (v) {
				/*for (var i = 1; i <= 10; i++) {
					//if (v >= 1 && v < 7) {
					// if (v >= 1 && v < 2) {
					// 	return 0.95;
					// } else {
						//return 1;
					//};
				};*/
				return 1;
			}

	    	// $('.other-payment-method-ul .vista').attr('class','other-payment-method-Visa-1');

            // $('[class^="other-payment-method-Visa-"]').each(function () {
            //     var numParcela = $(this).attr('class').split('-');
            //     numParcela = numParcela[numParcela.length -1];

            //     var pClubrNumReal = $('.skuPrice').text();
            //     pClubrNumReal = pClubrNumReal.replace('R$ ', '').replace('.', '');
            //     pClubrNumReal = parseFloat(pClubrNumReal.replace(",", "."));
            //     pClubrNumReal = (pClubrNumReal * calc(numParcela)) / numParcela;
            //     pClubrNumReal = pClubrNumReal.toFixed(2);

            //     var pClubrNumString = pClubrNumReal.toString();
            //     pClubrNumString = pClubrNumString.split(".");
            //     var p = fns.numberWithCommas(pClubrNumString[0]);

            //     $(this).html('<span>'+numParcela+'X de</span> <strong>R$ ' + p + ',' + pClubrNumString[1] + '</strong> <span class="complement">sem juros</span>');
            // })
		}

		$(".trustvox-rate2 .rating-click-here").on("click", function(event){
			$('html, body').animate({
				scrollTop: $($(this).attr("href")).offset().top
			}, 1000);
			event.preventDefault();
		});
		    
	    applyDiscount();
		
		//CHAMA O ZOOM
		OMComponents.product.zoom.init();

    	//TRANSFORMA A SELECAO DE SKU EM LIGHTBOX
		//OMComponents.product.selectorSkuLightBox.convert()

		//SELECAO DE COR COM THUMB
		$('.skuSelection .item-dimension-Cor').find('input[type="radio"]').each(function(i, e){
			var v = $(this).val().toLowerCase().replaceSpecialChars().replace(/\s/g,"-");
			$(this).next('label').addClass('checkbox-color sr_'+v);
		});

    	//GERA OPCAO DE COMPARTILHAR NAS REDES SOCIAIS
    	OMComponents.share.create($('.shareProduct a'), 'Confira nosso produto');
    	
		//APLICA O CARROUSEL NA SELCAO DE FOTOS DO PRODUTO
		//OMComponents.product.thumbnail.carouselApply();
		carouselApply();
		$(window).on("skuDimensionChanged.vtex", function(){
			//OMComponents.product.thumbnail.actionApply();
			carouselApply();
			$('.buyQuantity .quant-input').removeAttr('disabled');
			$('.buyQuantity .quant-plus').removeClass('disabled');
		});

		//OMComponents.showMore.init({_height: 150});

		/* INICIO: BOTÕES DE QUANTIDADE DE SKU */
		var $buyButton = $('.buyProductButton .buy-button'),
		$quantInput = $('.buyQuantity .quant-input'),
		$quantButtons = $('.buyQuantity .quant-button'),
		qmin = parseInt($quantInput.attr('min')),
		qmax = parseInt($quantInput.attr('max'));

		$quantButtons.click(quantChange);
		$quantInput.change(quantChange);
		function quantReset(){
			$quantButtons.addClass('disabled');
			$quantInput.attr('disabled', 'disabled');
		}

		function quantChange(e){
			e.preventDefault();
			var qurl = $('.buyProductButton .buy-button').attr('href');
			if(quantCheck(qurl)){
				quantUpdate(quantGetValue(this), qurl);
			}
			else{
				quantReset();
			}
			return false;
		}

		function quantCheck(url){
			return (url || '').search('checkout/cart') > -1;
		}

		function quantGetValue(el){
			if($(el).hasClass('disaled')){
				return $quantInput.val();
			}

			var qval = parseInt($(el).val() || $quantInput.val() || qmin);
			if($(el).hasClass('quant-plus')){
				qval++;
			}
			else if($(el).hasClass('quant-minus')){
				qval--;
			}
			//else é o input atualizando
			qval = Math.min(Math.max(qval, 1), 99);

			return qval;
		}

		function quantUpdate(qt, url){
			$quantButtons.removeClass('disabled');
			if(qt == qmin){
				$('.buyQuantity .quant-minus').addClass('disabled');
			}
			else if(qt == qmax){
				$('.buyQuantity .quant-plus').addClass('disabled');
			}

			$quantInput.val(qt);
			$buyButton.attr('href', url.replace(/(qty=).*?(&)/,'$1' + qt + '$2'));
		}
		quantReset();
		/* FIM: BOTÕES DE QUANTIDADE DE SKU */

		//toggle de pagamento e frete
		ShippingValue();
	}


	//CATALOGO ==============================================
	//=======================================================

	$(".orderBy:eq(0)").prependTo(".filterOptions");

	$('h5.Características:contains("Cor")').parent().addClass('filtro_cor').find('input[type="checkbox"]').each(function(i, e){
		var v = $(this).val().toLowerCase().replaceSpecialChars().replace(/\s/g,"-");
		$(this).parent().addClass('checkbox-color sr_'+v);
	});


	//CATEGORIA E BUSCA	
	if($("body").hasClass("category") || $("body").hasClass("search-result")){

		//VALIDA O RESULTADO DO FILTRO AO SELECIONAR
		OMComponents.filter.validateSearch()
		
		//LIB EXTERNA QD_infinityScroll
		try {
			$(".vitrine [id*=ResultItems]").QD_infinityScroll && $(".vitrine [id*=ResultItems]").QD_infinityScroll();
		}catch(e){
			console.error(e)
		}
		
		$(document).ajaxStop(function() {
			$('.featuredBanners').each(function() {
				$(this).slick('unslick');
			});
		});

	}

	if($("body").hasClass("catalog")){

		if($('body').hasClass('category')) {
			$(".navSidebar input[type='checkbox']").vtexSmartResearch();
		}

		var category = window.location.pathname.split('/')[1];
		category && $('.menu-departamento > h3.'+category.replaceSpecialChars().replace(/\s/g,'-')).addClass('current-dept');
	}

	//DEPARTAMENTO
	if($("body").hasClass("department")){
		OMComponents.slider.multipleSlider(true, false, 1, 1, false, true);
		//OMComponents.menuCategory.init();
		
		var categories = $('.menuDept .menu-departamento ul');
		if(categories.length){
			$('.titulo-sessao').addClass('js-menuCategory').append('<span class="icon-arrow"></span>');
			$('.menuDept').addClass('js-menuCategory');
		}
		$('.titulo-sessao.js-menuCategory').on('click', function(e){
			OMComponents.menuCategory.actionToggle();
			if($('.menuDept.js-menuCategory').hasClass('active')){
				$('#mainContent').addClass('filter-active');
				$('body').addClass('filter-active');
			}
			else{
				$('#mainContent').removeClass('filter-active');
				$('body').removeClass('filter-active');
			}
		});


		$(document).ajaxStop(function() {
			$('.featuredBanners').each(function() {
				$(this).slick('unslick');
			});
		});
	}


	//BUSCA
	if($('body').hasClass("search-result")) {

		$(".search-single-navigator").insertBefore(".search-multiple-navigator");

		//$(".resultado-busca-numero:eq(0), .resultado-busca-termo:eq(0)").prependTo(".topName");
		var numItens = $('.resultado-busca-numero:eq(0) .value').text();
		var word = $(".resultado-busca-termo:eq(0)").find("strong").text();
		$(".topName .titulo-sessao").html('"'+ word +'"');
		$('<span class="search-count">Foram encontrados  <em>' + numItens + '</em> resultados para a sua busca</span>').appendTo(".topName");
	}

	if(!$(".resultado-busca-termo .value").is(":empty")){
		$(".resultado-busca-termo").addClass("hasResult");
	}

	//BUSCA VAZIA
	if($('body').hasClass("search-empty")) {
		var word = om_getUrlParameter('ft');
		$(".emptySearch .searchTitle .searchTerm").text('"' + word + '"');
	}

	//LOJAS ===============================================
	//=======================================================
	if($('body').hasClass('stories')){
		//$('#mapAddress').geocomplete();
		OMComponents.stores.init();
	}

	$(".accordionList__title").on("click", function(e){
		if($(this).closest('.accordionList__item').hasClass('open')){
			$("html, body").stop().animate({
				scrollTop:$(this).offset().top - $('.pageHeader').outerHeight()
			},
			300,
			'swing');
		}
	});
	$('.boxToggle .boxHeader').click(function(e){
		$(this).closest('.boxToggle').toggleClass('active').find('.boxContent').slideToggle();
	});

});


$(document).ajaxStop(function () {
	//REMOVE O HELPER COMPLEMENT DAS VITRINES
	$(".helperComplement").remove();
});
