$(function(){
 setTimeout(function(){


   var toFixedDown = function(number, decimals) {
      decimals = decimals || 0;
      return ( Math.floor( number * Math.pow(10, decimals) ) / Math.pow(10, decimals) );
   }

   var calcularValor = function(item, parcela){

        var valor1 = item.replace('.', '');
        var valor2 = valor1.replace(',', '.');
        var total_geral = parseFloat(valor2 / parcela);

        //var total = toFixedDown(total_geral, 2)
        var total = total_geral.toFixed(2);

     var m = (total.toString().replace(/[^0-9]/g, ''));
      return formatReal(m)

}

   function getMoney( str )
{
       return parseInt( str.replace(/[\D]+/g,'') );
}
function formatReal( int )
{
       var tmp = int+'';
       tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
       if( tmp.length > 6 ){
               tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
       }

  if( tmp.length > 4 ){
               tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, "$1,$2");
       }
        console.log(tmp.length);
       return tmp;
}


 var liDesconto = function(i, valor){
   //<li class="other-payment-method-American Express-'+i+'">
    return '<span> '+i+'X de</span> <strong>'+valor+' </strong><span class="other-payment-method-intereset-no">sem juros</span>';
 }

 var ulLi = ".other-payment-method-ul li";
 $(ulLi).each(
     function(){

       var item = $(this).html().split('R$'), valor;

       var i = $(this).index();

       var itemValor = $(ulLi).eq(0).html().split('R$');

       var valor = itemValor[1].replace(/[^0-9\.,]/g, '')

       if(i == 1 || i == 2 || i == 3 || i == 4 || i == 5 ){

           $(ulLi).eq(i).html('');
           $(ulLi).eq(i).html(liDesconto(i+1, calcularValor(valor, i+1 )));

       }

     })
 },2500)

})
