console.log('v15.2.3233.6-2');
$('body.body-checkout-confirmation').each(function(){
	var orderId = $('#order-id').text();
	var tShirts = $('a[href^="/camiseta-personalizada-faraone"]').parents('.product-item');
	if(tShirts.length){
		var customIds = JSON.parse(localStorage.getItem("fo-cm-customId"));
		if(customIds.length == tShirts.length){
			$.each(customIds, function(i, customId){
				console.log('customId', customId);
				$.ajax({
		            type: 'PATCH',
		            data: JSON.stringify({id: customId, orderId: orderId}),
		            url: '/faraone/dataentities/CM/documents',
		            headers: {
		              'Content-Type': 'application/json',
		              'Accept': 'application/vnd.vtex.ds.v10+json',
		            },
		            success: function(data){
		              console.log('Updated', data);
		              if (customIds.length-1 == i) localStorage.removeItem("fo-cm-customId");
		              console.log(localStorage.getItem("fo-cm-customId"));
		            },
		            error: function(data){
		              alert('Ocorreu um erro. Por favor tente novamente!');
		              console.log('Error', data);//linha teste
		            }
		      	});
			});
		}
	}
});