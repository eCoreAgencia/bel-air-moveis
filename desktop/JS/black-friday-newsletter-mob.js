$(document).ready(function(){

  var disableButton = function(type){
    $("#btnBF").prop('disabled', type);
  }

  var messages = function(message){
    $("#message").fadeIn().text(message);
      setTimeout(function(){
        $("#message").fadeOut('fast');
      },2500)
  }

  var validaEmail = function(email){

      var atpos = email.indexOf("@");
      var dotpos = email.lastIndexOf(".");

      if ( atpos < 1 || dotpos < atpos+2 || dotpos+2 >= email.length ) {
          return false;
      }

      return true;
  }

  var enviarBF = function(){

    disableButton(true);

    var email = $("#email").val();
    var nome = $("#nome").val();

    if(nome == "" || !nome){
      messages('Digite o seu nome.');
      disableButton(false);
      return;
    }

    if(!email && !telefone){
      messages("Digite o seu e-mail.");
      disableButton(false);
      return;
    }

    if(email.length > 0){
      if(!validaEmail(email)){

        messages("E-mail inválido.");

        disableButton(false);

        return;
      }
    }


    var userData = {
      "nome": nome,
      "email": email
    };

    var storename = 'belairmoveis';
    var dataEntity = 'HH';

    var apiURL = 'http://api.vtexcrm.com.br/'+storename+'/dataentities/'+dataEntity+'/documents/';

    $.ajax({
      headers: {
        'Accept': 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(userData),
      type: 'PATCH',
      url: apiURL,
      success: function (data) {
        $("#nome").val("");
        $("#email").val("");

        $("#message").html("Cadastro realizado com sucesso.");

        setTimeout(function(){
          $("#message").fadeOut();
          $(".newsletterBlackFriday").fadeOut();
        },5000)

        disableButton(false);
      },
      error: function (data) {
        console.log(data);
        messages("Houve um erro. Tente novamente mais tarde.");
        disableButton(false);
      }
    });
  }

    $("#btnBF").on('click', function(){
      enviarBF();
    })


});
