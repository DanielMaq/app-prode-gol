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
            $.mobile.changePage("index.html");
        }else{
            localStorage.removeItem('userID');
            app.someFiles();
        }
    },
    someFiles: function(){
        var requestedBytes = 1024*1024*10; // 10MB

        window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

        alert(JSON.stringify(window.requestFileSystem));


        //window.requestFileSystem(PERSISTENT, 123123, function(e){ alert(JSON.stringify(e)) }, function(e){ alert(JSON.stringify(e)) });

        //navigator.webkitPersistentStorage.requestQuota (
        //    requestedBytes,
        //    function(grantedBytes) {
        //        alert('---> '+grantedBytes);
        //        //window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
        //    },
        //    function(e) { alert(e); /*alert('Error', e);*/ }
        //);

        function onInitFs(fs) {
            alert('Opened file system: ' + fs.name);
            fs.root.getFile('proode-log.csv', {create: true, exclusive: false}, function(fileEntry) {

                // Create a FileWriter object for our FileEntry (log.txt).
                fileEntry.createWriter(function(fileWriter) {

                    fileWriter.onwriteend = function(e) {
                        alert('Write completed.');
                    };

                    fileWriter.onerror = function(e) {
                        alert('Write failed: ' + e.toString());
                    };

                    var _usersList = 'Nombre;Apellido;DNI;Email;Telefono;Fin ' + "\n";

                    var _usersVar = localStorage.getItem('prodeGolUsers');
                    if( _usersVar ){
                        var _usersObj = $.parseJSON(localStorage.getItem('prodeGolUsers'));
                        $.each(_usersObj, function(){
                            _usersList += this.nombre + ';' + this.apellido + ';' + this.dni + ';' + this. email + ';' + this.telefono + ';' + this.fin + "\n";
                        });
                    }

                    // Create a new Blob and write it to log.txt.
                    var blob = new Blob([_usersList], {type: 'text/plain'});
                    fileWriter.write(blob);

                    navigator.app.exitApp();

                }, errorHandler);
            }, errorHandler);

        }

        function errorHandler(e) {
            var msg = '';

            switch (e.code) {
                case FileError.QUOTA_EXCEEDED_ERR:
                    msg = 'QUOTA_EXCEEDED_ERR';
                    break;
                case FileError.NOT_FOUND_ERR:
                    msg = 'NOT_FOUND_ERR';
                    break;
                case FileError.SECURITY_ERR:
                    msg = 'SECURITY_ERR';
                    break;
                case FileError.INVALID_MODIFICATION_ERR:
                    msg = 'INVALID_MODIFICATION_ERR';
                    break;
                case FileError.INVALID_STATE_ERR:
                    msg = 'INVALID_STATE_ERR';
                    break;
                default:
                    msg = 'Unknown Error';
                    break;
            }

            alert('Error: ' + msg);
        }
    }

};

app.initialize();