/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var _bgTheme;
var _bgThemeUrl = "/android_asset/www/sounds/bgTheme.mp3";
var _goodPassTheme;
var _goodPassThemeUrl = "/android_asset/www/sounds/buenpase.mp3";
var _goalTheme;
var _goalThemeUrl = "/android_asset/www/sounds/gol-corto.mp3";
var _ohhTheme;
var _ohhThemeUrl = "/android_asset/www/sounds/ohh-corto.mp3";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
        _bgTheme = new Media( _bgThemeUrl, function(err){console.log(JSON.stringify(err));}, function(err){ console.log("Audio Error: " + JSON.stringify(err) );});
        _goodPassTheme = new Media( _goodPassThemeUrl, function(err){console.log(JSON.stringify(err));}, function(err){console.log("Audio Error: " + JSON.stringify(err) );});
        _goalTheme = new Media( _goalThemeUrl, function(err){console.log(JSON.stringify(err));}, function(err){console.log("Audio Error: " + JSON.stringify(err) );});
        _ohhTheme = new Media( _ohhThemeUrl, function(err){console.log(JSON.stringify(err));}, function(err){console.log("Audio Error: " + JSON.stringify(err) );});
        app.deviceBackBtn();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    deviceBackBtn: function (){
        document.addEventListener("backbutton", function(e){
            e.preventDefault();
            navigator.notification.confirm(
                'Seguro deseas salir?', // message
                app.onConfirm, // callback to invoke with index of button pressed
                'Acciones Prode Gol', // title
                ['Ir al inicio','Salir'] // buttonLabels
            );
        });
    },
    onConfirm: function(buttonIndex)  {
        if(buttonIndex == 1) {
            localStorage.removeItem('userID');
            _bgTheme.stop();
            _goalTheme.stop();
            _ohhTheme.stop();
            _goodPassTheme.stop();
            $.mobile.changePage("index.html");
        }else{
            localStorage.removeItem('userID');
            app.someFiles();
        }
    },
    someFiles: function(){

        var _usersList = 'Nombre;Apellido;DNI;Email;Telefono;Fin ' + "\n";

        var _usersVar = localStorage.getItem('prodeGolUsers');
        if( _usersVar ){
            var _usersObj = $.parseJSON(localStorage.getItem('prodeGolUsers'));
            $.each(_usersObj, function(){
                _usersList += this.nombre + ';' + this.apellido + ';' + this.dni + ';' + this. email + ';' + this.telefono + ';' + this.fin + "\n";
            });
        }

        $.ajax({
            url: 'http://projectsunderdev.com/laburing/prode/guardar.php',
            type: 'POST',
            data: {users: _usersList},
            success: function (result) {
                _bgTheme.stop();
                _goalTheme.stop();
                _ohhTheme.stop();
                _goodPassTheme.stop();
                navigator.app.exitApp();
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });



    }

};

app.initialize();