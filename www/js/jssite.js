/*
 * Variables
 **/
var webServicesUrl = 'http://projectsunderdev.com/app-pdg/';
var _dialogTime = 1000;

/*
* Boton Volver Cerrar app.
**/
deviceBackBtn();

/*! tocca v0.1.3 || Gianluca Guarini */
!function(a,b){"use strict";if("function"!=typeof a.createEvent)return!1;var c,d,e,f,g,h,i="undefined"!=typeof jQuery,j=!!navigator.pointerEnabled||navigator.msPointerEnabled,k=!!("ontouchstart"in b)&&navigator.userAgent.indexOf("PhantomJS")<0||j,l=function(a){var b=a.toLowerCase(),c="MS"+a;return navigator.msPointerEnabled?c:b},m={touchstart:l("PointerDown")+" touchstart",touchend:l("PointerUp")+" touchend",touchmove:l("PointerMove")+" touchmove"},n=function(a,b,c){for(var d=b.split(" "),e=d.length;e--;)a.addEventListener(d[e],c,!1)},o=function(a){return a.targetTouches?a.targetTouches[0]:a},p=function(){return(new Date).getTime()},q=function(b,e,f,g){var h=a.createEvent("Event");if(g=g||{},g.x=c,g.y=d,g.distance=g.distance,i)jQuery(b).trigger(e,g);else{h.originalEvent=f;for(var j in g)h[j]=g[j];h.initEvent(e,!0,!0),b.dispatchEvent(h)}},r=function(a){var b=o(a);e=c=b.pageX,f=d=b.pageY,h=p(),z++},s=function(a){var b=[],i=f-d,j=e-c;if(clearTimeout(g),-u>=j&&b.push("swiperight"),j>=u&&b.push("swipeleft"),-u>=i&&b.push("swipedown"),i>=u&&b.push("swipeup"),b.length)for(var k=0;k<b.length;k++){var l=b[k];q(a.target,l,a,{distance:{x:Math.abs(j),y:Math.abs(i)}})}else h+v-p()>=0&&e>=c-x&&c+x>=e&&f>=d-x&&d+x>=f&&q(a.target,2===z?"dbltap":"tap",a),g=setTimeout(function(){z=0},w)},t=function(a){var b=o(a);c=b.pageX,d=b.pageY},u=b.SWIPE_THRESHOLD||100,v=b.TAP_THRESHOLD||150,w=b.DBL_TAP_THRESHOLD||200,x=b.TAP_PRECISION/2||30,y=b.JUST_ON_TOUCH_DEVICES||k,z=0;n(a,m.touchstart+(y?"":" mousedown"),r),n(a,m.touchend+(y?"":" mouseup"),s),n(a,m.touchmove+(y?"":" mousemove"),t)}(document,window);

$(function(){
    $('#menu li a').on('touchend', function(e){
            window.location.href = $(this).attr('href');
    })
});

function is_logged(){
    var logged = $.isEmptyObject(localStorage.getItem("userID"));

    if( ($('#loginPage').length == 0) && logged ){
        window.location.href="login.html";
    }else{
        return 1;
    }
}

function showError(msg, er){ // 'vaciar' para resetear campo, 'er' para ocultar cruz de error.
    var error = er || 0;
    if(error){
        $('.errors img').hide();
    }else{
        $('.errors img').show();
    }

    if(msg == 'vaciar'){
        $('.errors').hide();
        $('.errors p').text('Usuario o contraseña incorrectos');
    }else{
        $('.errors').fadeIn();
        $('.errors p').text(msg);
    }
}

function deviceBackBtn(){

    document.addEventListener("backbutton", function(e){
        e.preventDefault();
        var exitApp = 0;
        if( $("#homePage.ui-page-active").length > 0 ){
            exitApp = 1;
        }else if( $("#loginPage.ui-page-active").length > 0 ){
            exitApp = 1;
        }

        if( exitApp ){
            navigator.notification.confirm(
                '¿Seguro deseas salir?', // message
                onConfirm, // callback to invoke with index of button pressed
                'Cerrar Aplicación', // title
                ['Cancelar','Salir'] // buttonLabels
            );
        }else{
            navigator.app.backHistory();
        }
    }, false);
}

function onConfirm(buttonIndex) {
    if(buttonIndex == 2){
        localStorage.removeItem('userID');
        sessionStorage.clear();
        //navigator.app.exitApp();
        window.location.href = "login.html"
    }
}

function validateEmail(email){
    var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var valid = emailReg.test(email);

    if(!valid) {
        return false;
    } else {
        return true;
    }
}

$('a.home').on('touchstart',function(){
    window.location.href = 'home.html';
});