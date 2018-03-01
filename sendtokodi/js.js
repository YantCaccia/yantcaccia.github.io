    window.onload=function(){
    
    function sendstream(){
        var link = document.getElementById("casella").value;
        console.log(link);
         var data = '{"jsonrpc": "2.0", "method": "Player.Open", "params": {"item":{ "file": "plugin://plugin.video.sendtokodi/?' + link + '"}}, "id": 1}';
         var json = JSON.stringify(eval("(" + data + ")"));
        var websocket = new WebSocket('wss://192.168.1.6:9090/jsonrpc?awxi');
        websocket.onopen = function(evt) { websocket.send(json)};
    }


document.getElementById("su").addEventListener('click', sendstream, );


}