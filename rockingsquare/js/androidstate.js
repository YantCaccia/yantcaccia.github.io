(function() {
  'use strict';

  function Androidstate() {}

  Androidstate.prototype = {
      create: function () {
          
          this.game.stage.addChild(player);
          
        this.mainmenu5 = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 770, "Download now \r on Play Store!", { font: '100px indieflower', fill: giallo }); 
        this.mainmenu5.anchor.setTo(0.5, 0.5);
          
        this.mainmenu6 = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Tap me", { font: '100px indieflower', fill: giallo }); 
        this.mainmenu6.anchor.setTo(0.5, 0.5);
        this.mainmenu6.inputEnabled = true;
        this.mainmenu6.events.onInputDown.add(this.ltp, this);
      },
      
    ltp: function(){
        window.open('https://play.google.com/store/apps/details?id=com.yantcaccia.project1');
    }
      
      };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Androidstate = Androidstate;
}());