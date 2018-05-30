$(document).ready(function(){



        // data para countdown
        var countDownDate = new Date("Nov 24, 2017 00:00:00").getTime();

        // atualiza o countdown a cada 1s
        var x = setInterval(function() {

        // get dias data e horas
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));

        if(days >= 1 && days < 10){
            days = "0"+days;
        }

        if(days <= 0){
                days = "00";
        }

        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if(hours >= 1 && hours < 10){
                hours = "0"+hours;
        }

        if(hours <= 0){
                hours = "00";
        }
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(minutes >= 1 && minutes < 10){
                minutes = "0"+minutes;
        }

        if(minutes <= 0){
                minutes = "00";
        }

        if(seconds >= 0 && seconds < 10){
                seconds = "0"+seconds;
        }

        if(seconds <= 0){
                seconds = "00";
        }

        countd(days, hours, minutes, seconds);

        // Display the result in the element with id="demo"
        /*document.getElementById("demo").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";*/

        // If the count down is finished, write some text
        /*if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
        }*/
        }, 1000);

        var it = function(item){
            return { item1: item.toString().substring(0,1), item2: item.toString().substring(2,1) }
        }

        var countd = function(days, hours, minutes, seconds){

            var dias = it(days);

            $(".dias-1").text(dias.item1);
            $(".dias-2").text(dias.item2);

            var horas = it(hours);

            $(".horas-1").text(horas.item1);
            $(".horas-2").text(horas.item2);

            var min = it(minutes);

            $(".minutos-1").text(min.item1);
            $(".minutos-2").text(min.item2);

            var sec = it(seconds);

            $(".segundos-1").text(sec.item1);
            $(".segundos-2").text(sec.item2);
        }
});
