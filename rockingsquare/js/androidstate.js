(function() {
  'use strict';

  function Androidstate() {}

  Androidstate.prototype = {
      create: function () {

        this.game.stage.addChild(player);

        this.mainmenu5 = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 650, "Download now \rfor iOS \rand Android!", { font: '90px indieflower', fill: giallo });
        this.mainmenu5.anchor.setTo(0.5, 0.5);

        this.mainmenu6 = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Tap me", { font: '100px indieflower', fill: giallo });
        this.mainmenu6.anchor.setTo(0.5, 0.5);
        this.mainmenu6.inputEnabled = true;
        this.mainmenu6.events.onInputDown.add(this.ltp, this);
      },

    ltp: function(){
        if(this.game.device.android){

            window.open('https://play.google.com/store/apps/details?id=com.yantcaccia.project1');
       }

        else if(this.game.device.iOS){

            //window.open('https://itunes.apple.com/it/app/rocking-square/id1205158930?l=en&mt=8');
            location.href = "https://itunes.apple.com/it/app/rocking-square/id1205158930?l=en&mt=8";
       }

    }

      };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Androidstate = Androidstate;
}());
