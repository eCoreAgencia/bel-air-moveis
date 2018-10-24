// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.
/*var text = 'Não esqueça da nossa promoção! Impermeabilize seu Sofá acima de R$1790,00 e ganhe uma bandeja exclusiva.<br />*Promoção válida apenas para quem adicionar no carinho um sofá com valor mínimo especificado e adicionar o serviço de impermeabilização do dia 15/03/2018 até 31/03/2018.';
setTimeout(function(){
	$("#cart-title").after('<div>' + text + '</div><br />');
},2000);*/

$('.add-service').each(function(){
  var myTxt = $(this).text();
  $(this).addClass('myTxt');
});


// $( document ).ready(function() {
// 	$('.summary').append('<ul class="promocao span7 pull-left">' +
//   	'      <li>' +
//   	'          Impermeabilize seu Sofá acima de <span style="color: red;">R$ 2190,00</span> e ganhe uma linda<span style="color: #008016a3;">' +
//     '              bandeja</span> de brinde.' +
//     '          </span></li>' +
//     '      <li>' +
//     '          Impermeabilize seu Sofá acima de <span style="color: red;">R$ 2490,00</span> e ganhe um lindo<span >' +
//     '             <a href="http://www.belairmoveis.com.br/painel-para-tv-fox/p"> Painel Fox</a></span> de brinde.' +
//     '      </li>' +
//     '  </ul>' 
//   );
// });