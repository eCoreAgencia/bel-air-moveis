var entidadeMarterdata  = "HH"; //sigla da entidade de dados criada no MASTERDATA (CRM)
var ambienteLoja        = "belairmoveis";
var senderForm          = new OmSendMessage(ambienteLoja,entidadeMarterdata);//Inicialização da LIB de envio de dados.

//acao do click do submit
function SubmitHeader(){

    //define o assunto
    //senderForm.setSubject($('#itemSelect').val());

    //define remetente
    senderForm.setSender($('#newsletterBlackFriday [name="email"]').val());

    //define remetente
    senderForm.setName($('#newsletterBlackFriday [name="nome"]').val());


    //adiciona um titulo a mensagem (HTML livre)
    //senderForm.messageAppend($('[name="mensagem"]').val());


    senderForm.messageAppend("<p>Nome: " + senderForm.getData().name + "</p>");
    senderForm.messageAppend("<p>E-mail: " + senderForm.getData().email + " </p>");
    //ENVIANDO OS DADOS ===========================================================================================
    var request = senderForm.sendMessageVTEX(ambienteLoja,entidadeMarterdata)//retorna uma request ajax (masterdata)
    //caso aja sucesso na requisicao
    request.done(function(data){
        $('#newsletterBlackFriday .formContent').hide();
        $('#newsletterBlackFriday #messageBF').addClass('success');
        $('#newsletterBlackFriday #messageBF').html($('<div><h4>Seu email foi cadastrado com sucesso.</h4></p></div>').fadeIn())
        $('#newsletterBlackFriday .newsNome, #newsletterBlackFriday .newsEmail').val('');
        senderForm = new OmSendMessage(ambienteLoja,entidadeMarterdata);//reset da LIB de envio de dados.
    });
    //caso aja erro na requisicao
    request.error(function(err){
        $('#newsletterBlackFriday #messageBF').addClass('error');
        $('#newsletterBlackFriday #messageBF').html($('<div><label>Encontramos um erro no cadastro de suas informações.<br />Por favor, tente novamente!</label><br /><br /><!-- <input type="button" value="voltar" class="bt-voltar newsletter-button-back">--></div>').fadeIn())

    });

}


$(function(){
    //validando os campos
    $( '#newsletterBlackFriday input[type="text"][validate]' ).focusout(function(){
        ValidateField( $(this) );
    });

    //validando o campo de email
    $( '#newsletterBlackFriday input[name=email]' ).focusout(function(){
        if(validEmail($(this).val())){
            $(this).removeClass('error-input')
            $('#newsletterBlackFriday  #messageBF').html('')
        }else{
            $(this).addClass('error-input')
            $('#newsletterBlackFriday #messageBF').html($('<div>',{'class':'messageContent messageContentError','text':'Email inválido.'}).fadeIn())
        }

    })

    // Chama a função de validacao do formulario no submit do formulario
    $( '#newsletterBlackFriday #btnEnviarNewsBF' ).click(function(e){

        e.preventDefault;
        if (validateForm()) {
            SubmitHeader() //apos validado o formulario a mensagem e enviada

        }else{
            $('#newsletterBlackFriday #messageBF').html($('<div>',{'class':'messageContent messageContentError','text':'Os campos com asterisco são obrigatórios'}).fadeIn())
        }

    });


});
