$('#gamePage').on( 'pagecreate',function(event){

    _bgTheme.stop();

    loadOptions();

    $('.playField li').on('click', function(){
        var $this = $(this);
        var _thisChildNumber = $this.index();
        var $thisParent = $this.parent();
        var _thisParentRow = $thisParent.attr('data-row');
        var _thisParentNextRow = parseInt(_thisParentRow) + 1;
        var _hasWon = 1;

        if($thisParent.hasClass('blocked'))
            return;

        _ohhTheme.stop();
        _goodPassTheme.stop();

        if( isCorrect($this, _thisParentRow) ){
            _goodPassTheme.play();
            $('.line.pos'+ _thisParentNextRow).removeClass('blocked');
            $this.addClass('selected');

            // Mostrar carteles
            switch (_thisParentRow){
                case '1':
                    showMessage('comienzo');
                    break;
                case '2':
                    if( _thisChildNumber == 0 || _thisChildNumber == 3 )
                        showMessage('lateral');
                    else
                        showMessage('sigue');
                    break;
                case '3':
                    showMessage('sigue');
                    break;
                default:
                    break;
            }
        }else{
            _ohhTheme.play();
            $this.addClass('selected wrong');
            sessionStorage.setItem('endType', 1);
            _hasWon = 0;
            showMessage('bloqueado');
            endGame();
        }
        $('.line.pos'+ _thisParentRow).addClass('blocked');

        if( _thisParentRow == 7 && _hasWon ){
            _goodPassTheme.stop();
            _goalTheme.play();
            sessionStorage.setItem('endType', 0);
            endGame();
        }

    });


});

function endGame(){

    setTimeout(function(){
        updateUserScore();
        $.mobile.changePage( "end.html" );
    }, _dialogTime);

}

function showMessage(key){
    var $imgs = $('.msgOverlay img');
    $imgs.hide();
    switch(key){
        case 'bloqueado':
            $('.msgOverlay .msg-bloqueado').show();
            break;
        case 'comienzo':
            $('.msgOverlay .msg-comienzo').show();
            break;
        case 'elegi':
            $('.msgOverlay .msg-elegi').show();
            break;
        case 'lateral':
            $('.msgOverlay .msg-lateral').show();
            break;
        case 'sigue':
            $('.msgOverlay .msg-sigue').show();
            break;
    }
    $('.msgOverlay').fadeIn('fast', function(){
        setTimeout(function(){
            $('.msgOverlay').fadeOut();
        }, _dialogTime);
    });

}

function isCorrect(item, row){
    if(row > 3 || row != 5)
        return item.hasClass('correct');
    else
        return 1;
}

function loadOptions(){ //Random de opciones en las pelotas

    var _r4 = [0,1,2,3];
    _r4.shuffle();
    $('.pos4 li').eq(_r4[0]).addClass('correct');
    $('.pos4 li').eq(_r4[1]).addClass('correct');
    $('.pos4 li').eq(_r4[2]).addClass('correct');

    var _r6 = [0,1,2,3];
    _r6.shuffle();
    $('.pos6 li').eq(_r6[0]).addClass('correct');
    $('.pos6 li').eq(_r6[1]).addClass('correct');
    $('.pos6 li').eq(_r6[2]).addClass('correct');

    var _r7 = [0,1];
    _r7.shuffle();
    $('.pos7 li').eq(_r7[0]).addClass('correct')

}

Array.prototype.shuffle = function() {
    var input = this;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
};

function updateUserScore(){

    var _usersVar = $.parseJSON( localStorage.getItem('prodeGolUsers') );
    var _userId = sessionStorage.userId;

    $.each(_usersVar, function(){
        var $this = this;
        var _dni = $this.dni;
        if(_dni == _userId){
            $this.fin = 1;
        }
    });

    _usersVar = JSON.stringify(_usersVar);
    localStorage.setItem('prodeGolUsers', _usersVar);

}