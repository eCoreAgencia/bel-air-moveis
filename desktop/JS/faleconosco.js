function ContactForm(){
	var _this = this;
	// var fields;
    
 //    this.setFields = function(objArr){
 //    	if (objArr instanceof jQuery) fields = $.makeArray(objArr);
 //    }

 //    this.getFields = function(){return fields;}
 	this.validateForm = function(fields, handlers){
 		var is_valid = true;
 		var data = new Object();
		$(fields).each(function(){
			if(this.type == 'email'){
				if(this.value.match( /^([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+$/ ) == null) {
					$(this).addClass('error-input');
					if (is_valid) is_valid = false;
				}else{
					data[this.name] = this.value;
				}
			}else if(this.name != 'celular'){
				if(this.value == '' || this.value == null){
					$(this).addClass('error-input');
					if (is_valid) is_valid = false;
				}else{
					data[this.name] = this.value;
				}
			}else{
				data[this.name] = this.value;
			}
		});

		(is_valid)? handlers.success(data) : handlers.error(data);
 	}
    this.send = function(data, dataUrl, handlers){
	    $.ajax({
	        headers: {
	            'Accept': 'application/vnd.vtex.ds.v10+json',
	            'Content-Type': 'application/json',
	        },
	        data: JSON.stringify(data),
	        type: 'PATCH',
	        url: dataUrl,
	        async: false,
	        success: function (data) {try{handlers.success(data)}catch(e){}},
	        error: function (data) {try{handlers.error(data)}catch(e){}}
	    });
    }
}
$('form#contact').replaceWith($('form#contact').clone());//linha teste
$('form#contact').each(function(){
	var	_this = this;
	var contato = new ContactForm();
	var campos = $(this).find('input:not([type="submit"],[name="errorMessage"]),select,textarea');
	// contato.setFields(campos);
	$(this).on('submit',function(e){
		e.preventDefault();
		contato.validateForm(campos, {
			success: function(data){
				$(_this).find('input[name="errorMessage"]').fadeOut();
				$(_this).find('.error-input').removeClass('error-input');
				contato.send(data,'/belairmoveis/dataentities/FL/documents/',{
					success: function(data){
						alert('Mensagem Enviada com Sucesso!');
						_this.reset();
					},
					error: function(data){
						alert('Occorreu um erro ao enviar sua mensagem! Por favor, tente novamente!');
					}
				});
			},
			error: function(){
				$(_this).find('input[name="errorMessage"]').each(function(){
					$(this).val('OS CAMPOS COM ASTERISCO SÃO OBRIGATÓRIOS');
					$(this).fadeIn();
				});
			}
		});
	})
});