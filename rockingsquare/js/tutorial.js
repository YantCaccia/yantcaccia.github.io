(function() {
  'use strict';

  function Tutorial() {}

  Tutorial.prototype = {
      create: function () {
          
        this.back1 = this.game.add.text(this.game.world.centerX + 415, this.game.world.centerY + 900, "back", { font: '35px indieflower', fill: "#ffffff" });
        this.back1.anchor.setTo(0.5, 0.5);
        this.back1.inputEnabled = true;
        this.back1.events.onInputDown.add(this.baack1, this);
          
        this.tilt = this.game.add.text(this.game.world.centerX + 100, this.game.world.centerY - 850, "tilt the phone to \r move the player", { font: '40px indieflower', fill: "#ffffff" });
        this.tilt.angle = 10;
          
        this.tilt = this.game.add.text(this.game.world.centerX - 450, this.game.world.centerY + 750, "avoid blocs and \r collect coins", { font: '38px indieflower', fill: "#ffffff" });
        this.tilt.angle = -15;
          
        this.coincol = this.game.add.text(this.game.world.centerX - 300, this.game.world.centerY - 50, "yellow coin is a +5 \r green coin is a +15!", { font: '58px indieflower', fill: "#ffffff" });
        this.coincol.angle = -7;
          
        this.game.stage.addChild(player);
        this.bloc = this.game.add.sprite(700, 400, 'blocco');
        this.bloc.scale.setTo(0.3,0.223);
        this.bloc1 = this.game.add.sprite(200, 1270, 'blocco');
        this.bloc1.scale.setTo(0.3,0.223);
        this.coin = this.game.add.sprite(250, 250, 'pu');
        this.coin1 = this.game.add.sprite(750, 1450, 'pu');
        this.coin.tint = 0xf9c22e;
        this.coin1.tint = 0x44aa00;
      },
      
      baack1: function() {
      this.game.state.start('preloader');}

      };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Tutorial = Tutorial;
}());