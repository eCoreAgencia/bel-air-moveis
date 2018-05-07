	var OmSendMessage = function(storename,entity){

		var _name 	= null; //EMAIL DO CLIENTE
		var _sender 	= null; //EMAIL DO CLIENTE
		var _subject	= null; //ASSUNTO
		var _message	= ""; //MENSAGEM
		var _file		= ""; //file
		var _storename	= storename;
		var _entity		= entity;

		//FORMATA O CORPO DA MENSAGEM AUTOMATICAMENTE A PARTIR DE UM ARRAY COM OS ATRIBUTO "name"
		//PARAMETROS : {idForm,['valorDoAtributoName','valorDoAtributoName']}
		this.autoMessage = function(formId,vectorName){

			for (var i = 0; i < vectorName.length; i++) {
				var key = vectorName[i]
				var val = $("#" + formId + " [name='" + vectorName[i] +"']").val();			
				_message += "<p>" + vectorName[i] + ":" + val + "</p>";
			};

		}
		
		//FORMATA O CORPO DA MENSAGEM AUTOMATICAMENTE A PARTIR DE UM ARRAY DE ELEMENTOS QUERY
		this.autoMessageByQuery = function(queryElement){
			queryElement.each(function(){
				var key = $(this).attr('name');
				var val = $(this).val();			
				_message += "<p>" + key + ":" + val + "</p>";
			})

			console.log(_message);
		}

		//SET DO EMAIL DO CLIENTE
		this.setName = function(v){
			_name = v;
		}

		//SET DO EMAIL DO CLIENTE
		this.setSender = function(v){
			_sender = v;
		}

		//SET DO ASSUNTO DA MENSAGEM
		this.setSubject = function(v){
			_subject = v;
		}

		//SET DO CORPO DA MENSAGEM
		this.setMessage = function(v){
			_message = v;
		}

		//SET ARQUIVO EM BASE64
		this.setFile = function(v){
			_file = v;
		}

		//ADICIONA CONTEUDO NO FIM DA MENSAGEM
		this.messageAppend = function(v){
			_message = _message + v;
		}

		this.getData = function(){
			return  {'name' : _name, 'email' : _sender}
		}

		this.sendMessageVTEX = function(){

		    return $.ajax({
		        headers: {"Accept": "application/vnd.vtex.ds.v10+json","Content-Type": "application/json"},
		        type: 'PATCH',
		        url: "//api.vtexcrm.com.br/"+_storename+"/dataentities/"+_entity+"/documents/",
		        data: JSON.stringify(senderForm.getData())
		            
		    })

		}

	}
