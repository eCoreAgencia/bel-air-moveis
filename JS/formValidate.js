function validEmail( mail ){
    if ( mail.match( /^([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+$/ ) == null ) {
        return false;
    }
    return true;
}

function validateForm(){

    var is_valid = true;

    $( 'p#email-invalido' ).remove();
    $( 'input[type="text"][validate], select[validate], textarea[validate], input[type="date"][validate]' ).removeClass( 'error-input' );
    $( 'input[type="text"][validate], select[validate], textarea[validate], input[type="date"][validate]' ).each(function(){

        if ( $( this ).val() ==  "" ) {
            $( this ).addClass( 'error-input' );
            is_valid = false;
        }
        else if ($(this).attr('name') == 'email'){

            if (!validEmail($(this).val())) {
                $( this ).addClass('error-input');
                is_valid = false;
            }
        }
    });
    return is_valid;
}

function ValidateField(field){

    field.removeClass('error-input');
    if (field.val() == "") {  
        field.addClass('error-input');
    }
    else if (field.attr( 'nome' ) == 'email'){
        if (!validEmail(field.val())) {
            field.addClass( 'error-input' );
            $('.holdErrorsContent' ).append( ' <p id="email-invalido" > Digite um email válido. </p> ' );
        }
        else {
            $('p#email-invalido').remove();
        }
    }
}
