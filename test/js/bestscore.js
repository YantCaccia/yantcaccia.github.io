var localnick = localStorage.getItem('nickstorage');
var bestscore = 0;
localStorage.setItem('bestscore', bestscore);

var ref = firebase.database().ref("/leaderboard");
ref.once("value")
  .then(function(snapshot) {
    //se il bestscore per quel nick esiste già nel databse lo imposta anche localmente
    if(snapshot.child(localnick + "/mscore").exists()){
          bestscore = localStorage.setItem('bestscore', snapshot.child(localnick).val().mscore);
        }
    else{
      bestscore = localStorage.getItem('bestscore');
    }
  });

var score, player, velY, start, fx, levelup, lufo;
var controllo = 0;
var rosso = "#ff5420"; //dd210d
var blu = "#2387d8"; //0a427f
var marrone = "#63220b"; //63220b
var giallo = "#ffb100"; //f9c22e
var verde = "#499e01";
var bianco = '#ffffff';
var myColors = ["0xff5420", "0x2387d8", "0x9d5ae7"];
