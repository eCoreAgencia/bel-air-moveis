$(document).ready(function(){
	$('.bestPrice').each(function(){
		var pClub = $(this).text();
		console.log(pClub);
		var pClubrNum = pClub.replace('R$ ', '').replace('.', '');
		var pClubrNumReal = parseFloat(pClubrNum.replace(",", "."));
		var pClubrNumReal = pClubrNumReal - (pClubrNumReal * 5) / 100;
		var pClubrNumReal = pClubrNumReal.toFixed(2);

		var pClubrNumString = pClubrNumReal.toString();
		pClubrNumString = pClubrNumString.split(".");
		var p = fns.numberWithCommas(pClubrNumString[0]);

		$(this).html('ou <strong style="font-weight: bold !important;">R$ ' + p + ',' + pClubrNumString[1] + '</strong><b style="display: block; margin: 5px 0;">á vista ou em até 6x</b>');
	});
});