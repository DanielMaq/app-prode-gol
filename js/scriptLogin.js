$('#loginPage').on( 'pagecreate',function(event){

    is_logged();

    clearFields();

    $('#loginPage #loginForm').on('submit', function(e){
        $('#loginPage .btn.ingreso').trigger('click');
        e.preventDefault();
        return false;
    });

    $('.campo.dni').on('keyup touchend', function () {
        if (this.value.length > 4)
            this.value = this.value.slice(0,8);
    });


    $('#loginPage .btn.ingreso').on('click', function(e){ //LOGIN

        e.preventDefault();
        showError('vaciar');

        var _name = $('.campo.nombre').val();
        var _surname = $('.campo.apellido').val();
        var _dni = parseInt($.trim($('.campo.dni').val()));
        var _email = $('.campo.email').val();
        var _phone = parseInt($.trim($('.campo.telefono').val()));

        var sendOk = 0;

        if($.trim(_name).length === 0 ){
            showError('El nombre es requerido.');
            $('input.nombre').focus();
            return;
        }else{
            sendOk = 1;
        }
        if($.trim(_surname).length === 0 ){
            showError('El apellido es requerido.');
            $('input.apellido').focus();
            return;
        }else{
            sendOk = 1;
        }

        if($.trim(_dni).length === 0 ){
            showError('El DNI no puede ser vacío.');
            $('input.dni').focus();
            return;
        }else{
            sendOk = 1;
        }

        if(!validateEmail(_email)){
            showError('El Email ingresado no es válido');
            $('input.email').focus();
            return;
        }

        if($.trim(_phone).length === 0 ){
            showError('El Telefono no puede ser vacío.');
            $('input.telefono').focus();
            return;
        }else{
            sendOk = 1;
        }

        saveUser(_name, _surname, _dni, _email, _phone);
    });
});

function clearFields(){
    $('.campo.nombre').val('');
    $('.campo.apellido').val('');
    $('.campo.dni').val('');
    $('.campo.email').val('');
    $('.campo.telefono').val('');
}

function saveUser(name, surname, dni, email, phone){

    showError('vaciar');

    var _newUser = {'nombre': name,'apellido': surname,'dni': dni,'email': email,'telefono': phone, 'fin': 0 };

    var _usersVar = localStorage.getItem('prodeGolUsers');
    var _saveUser = 1;

    if( ! _usersVar ){ // No hay usuarios
        var newU = [_newUser];
        localStorage.setItem('prodeGolUsers', JSON.stringify(newU));
        _usersVar = localStorage.getItem('prodeGolUsers');
    }else{ // Hay usuarios
        _usersVar = $.parseJSON(localStorage.getItem('prodeGolUsers'));
        if( ! userExists( _newUser.dni, _usersVar ) ){
            _usersVar.push(_newUser);
            _usersVar = JSON.stringify(_usersVar);
        }else{
            _saveUser = 0;
        }

    }
    if( _saveUser ){
        localStorage.setItem('prodeGolUsers', _usersVar);
        sessionStorage.setItem('userId', dni);
        $.mobile.changePage("game.html");
    }else{
        showError('El usuario ya se encuentra registrado.');
    }

}

function userExists(dni, users){

    return false;

    var _exists = 0;
    $.each(users, function(){
        var $this = this;
        var _dni = $this.dni;
        if(_dni == dni){
            _exists = 1;
            return;
        }
    });

    return _exists;
}