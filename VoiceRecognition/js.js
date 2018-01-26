    window.onload=function(){
    
    $.ajax({
          type: 'POST',
          url: 'http://192.168.1.9:8080/jsonrpc?awxi',
          data: '{"jsonrpc": "2.0", "method": "PVR.GetChannels", "params": {"channelgroupid": "alltv" }, "id": 1}',
          success: function(result, textStatus, XMLHttpRequest) {canali = result.result.channels; console.log(canali); },
          contentType: 'application/json'
        });

    var canali;
        
    function switchchannels(channelid){
         var data = '{"jsonrpc": "2.0", "method": "Player.Open", "params": {"item":{"channelid":'+channelid+'} }, "id": 1}';
         var json = JSON.stringify(eval("(" + data + ")"));
         $.ajax({
          type: 'POST',
          url: 'http://192.168.1.9:8080/jsonrpc?awxi',
          data: data, //'{"jsonrpc": "2.0", "method": "Player.Open", "params": {"item":{"channelid":1865} }, "id": 1}'
          success: function(result, textStatus, XMLHttpRequest) {console.log(result); },
          contentType: 'application/json'
        });
    }
        
    function muto(){
         $.ajax({
          type: 'POST',
          url: 'http://192.168.1.9:8080/jsonrpc?awxi',
          data: '{"jsonrpc": "2.0", "method": "Application.SetMute", "params": {"mute":"toggle" }, "id": 1}',
          success: function(result, textStatus, XMLHttpRequest) { console.log(result) },
          dataType: 'json',
          contentType: 'application/json'
        });
    }
        
    function getvol(differenza){  
        $.ajax({ //prende il volume attuale
          type: 'POST',
          url: 'http://192.168.1.9:8080/jsonrpc?awxi',
          data: '{"jsonrpc": "2.0", "method": "Application.GetProperties", "params": {"properties": ["volume"]}, "id": 1}',
          success: function(result, textStatus, XMLHttpRequest) {if(differenza==0){changevol((result.result.volume)+20);} else if(differenza==1){changevol((result.result.volume)-20)}},
          dataType: 'json',
          contentType: 'application/json'
        });
    }
        
        function changevol(vol){
        var data = '{"jsonrpc": "2.0", "method": "Application.SetVolume", "params": {"volume":'+(vol)+' }, "id": 1}';
        var json = JSON.stringify(eval("(" + data + ")"));
        console.log(json);
        $.ajax({ //setta il volume al volume attuale + 10
          type: 'POST',
          url: 'http://192.168.1.9:8080/jsonrpc?awxi',
          data: json, // '{"jsonrpc": "2.0", "method": "Application.SetVolume", "params": {"volume":50 }, "id": 1}',
          success: function(result, textStatus, XMLHttpRequest) { console.log(result) },
          dataType: 'json',
          contentType: 'application/json'
        });
    }
        
    function play(){
         $.ajax({
          type: 'POST',
          url: 'http://192.168.1.9:8080/jsonrpc?awxi',
          data: '{"jsonrpc": "2.0", "method": "Player.PlayPause", "params": {"playerid": 1 }, "id": 1}',
          success: function(result, textStatus, XMLHttpRequest) { console.log(result) },
          dataType: 'json',
          contentType: 'application/json'
        });
    }
        
    function stop(){
         $.ajax({
          type: 'POST',
          url: 'http://192.168.1.9:8080/jsonrpc?awxi',
          data: '{"jsonrpc": "2.0", "method": "Player.Stop", "params": {"playerid": 1 }, "id": 1}',
          success: function(result, textStatus, XMLHttpRequest) { console.log(result) },
          dataType: 'json',
          contentType: 'application/json'
        });
    }
        
    function home(){
         $.ajax({
          type: 'POST',
          url: 'http://192.168.1.9:8080/jsonrpc?awxi',
          data: '{"jsonrpc": "2.0", "method": "Input.Home", "params": { }, "id": 1}',
          success: function(result, textStatus, XMLHttpRequest) { console.log(result) },
          dataType: 'json',
          contentType: 'application/json'
        });
    }
        
    function tastiera(testo){
         var data = '{"jsonrpc": "2.0", "method": "Input.SendText", "params": {"text":"'+testo+'", "done":false }, "id": 1}';
         var json = JSON.stringify(eval("(" + data + ")"));
         console.log(json);
         $.ajax({
          type: 'POST',
          url: 'http://192.168.1.9:8080/jsonrpc?awxi',
          data: json, //this is audio player
          success: function(result, textStatus, XMLHttpRequest) { console.log(result); console.log(testo);},
          dataType: 'json',
          contentType: 'application/json'
        });
    }


    const artyom = new Artyom();

        var myCommands = [

            {
                description:"Trascrivi quello che ho detto",
                smart:true, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
                // Ways to trigger the command with the voice
                indexes:["Scrivi *"],
                // Do something when the commands is triggered
                action: function(i,wildcard){/*console.log(wildcard);testo = wildcard; */tastiera(wildcard); /*testo="";*/}
            },
            
            
            {
                description:"Passa al canale",
                smart:true, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
                // Ways to trigger the command with the voice
                indexes:["Trasmetti *", "Riproduci *"],
                // Do something when the commands is triggered
                action: function(i,wildcard){
                    wildcard = wildcard.toUpperCase();
                    console.log(wildcard);
                    var provola = $.grep(canali, function(e){ return e.label == wildcard.toUpperCase(); console.log(e);});
                    console.log(provola);
                    switchchannels(provola[0].channelid);
                } 
            },
            
            {
                description:"Play/Pausa",
                smart:false, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
                // Ways to trigger the command with the voice
                indexes:["Play", "Pausa"],
                // Do something when the commands is triggered
                action: play
            },
            
            {
                description:"Stop",
                smart:false, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
                // Ways to trigger the command with the voice
                indexes:["Stop", "Interrompi"],
                // Do something when the commands is triggered
                action: stop
            },
            
            {
                description:"Muto/Volume",
                smart:false, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
                // Ways to trigger the command with the voice
                indexes:["Muto", "Abbassa tutto il volume", "Togli tutto il volume", "Togli il muto", "Rialza il volume"],
                // Do something when the commands is triggered
                action: muto
            },
            
            {
                description:"Alza il volume",
                smart:false, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
                // Ways to trigger the command with the voice
                indexes:["Alza il volume", "Volume su"],
                // Do something when the commands is triggered
                action: function(){getvol(0);}
            },
            
            {
                description:"Abbassa il volume",
                smart:false, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
                // Ways to trigger the command with the voice
                indexes:["Abbassa il volume", "Volume giù"],
                // Do something when the commands is triggered
                action: function(){getvol(1);}
            },
            
            {
                description:"Vai a home",
                smart:false, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
                // Ways to trigger the command with the voice
                indexes:["Home", "Schermata principale"],
                // Do something when the commands is triggered
                action: home
            },
            
            /*{
                description:"Colore sfondo test",
                smart:true, // a Smart command allow you to use wildcard in order to retrieve words that the user should say
                // Ways to trigger the command with the voice
                indexes:["Passa al colore *"],
                // Do something when the commands is triggered
                action: function(i, wildcard){

                    var inglese;

                    if(wildcard=="nero"){

                        inglese="black";
                    }
                    if(wildcard=="bianco"){

                        inglese="white";
                    }
                    if(wildcard=="rosso"){

                        inglese="red";
                    }

                    var colore = "background-color:" + inglese;
                    document.getElementById("sfondo").setAttribute("style", colore);
                }
            },*/
        ];

    
    artyom.addCommands(myCommands); 
    artyom.initialize({
                lang:"it-IT",// A lot of languages are supported. Read the docs !
                continuous:true,// recognize 1 command and stop listening !
                listen:true, // Start recognizing
                debug:true, // Show everything in the console
                speed:1, // talk normally
                executionKeyword: "adesso",
                soundex: true,
                name:"kodi" //sort of keyword
            }).then(function(){
                console.log("Ready to work !");
            });

    
    //document.getElementById("su").addEventListener('click', channels, );
    document.getElementById("giù").addEventListener('click', switchchannels, );    


}
