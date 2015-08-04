$('#endPage').on( 'pagecreate',function(event){

    var _endType = sessionStorage.getItem("endType");
    sessionStorage.removeItem("endType");

    if( _endType == 1 ){
        $('img.txt1').show();
    }else{
        $('img.txt2').show();
    }

    _bgTheme.stop();
    _goalTheme.stop();
    _ohhTheme.stop();
    _goodPassTheme.stop();

    setTimeout(function(){
        $.mobile.changePage("index.html");
    }, 3000);

});