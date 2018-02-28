    window.onload=function(){
    
    function sendstream(){
        var link = document.getElementById("casella").value;
        console.log(link);
         var data = '{"jsonrpc": "2.0", "method": "Player.Open", "params": {"item":{ "file": "plugin://plugin.video.sendtokodi/?' + link + '"}}, "id": 1}';
         var json = JSON.stringify(eval("(" + data + ")"));
         console.log(json);
         $.ajax({
          type: 'POST',
          url: 'https://192.168.1.6:8080/jsonrpc?awxi',
          data: json, //'{"jsonrpc": "2.0", "method": "Player.Open", "params": {"item":{"channelid":1865} }, "id": 1}'
          success: function(result, textStatus, XMLHttpRequest) {console.log(result); },
          contentType: 'application/json'
        });
    }


document.getElementById("su").addEventListener('click', sendstream, );


}