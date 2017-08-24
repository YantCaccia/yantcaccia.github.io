(function() {
  'use strict';

  function Tutorial() {}

  Tutorial.prototype = {
      create: function () {

        this.back1 = this.game.add.text(this.game.world.centerX + 380, this.game.world.centerY + 900, "let me play", { font: '35px indieflower', fill: "#ffffff" });
        this.back1.anchor.setTo(0.5, 0.5);
        this.back1.inputEnabled = true;
        this.back1.events.onInputDown.add(this.baack1, this);

        this.tilt = this.game.add.text(this.game.world.centerX - 50, this.game.world.centerY - 850, "1. tilt the phone to \r move the player", { font: '50px indieflower', fill: "#ffffff" });

        this.tilt1 = this.game.add.text(this.game.world.centerX - 450, this.game.world.centerY + 650, "2. avoid blocs and \r collect coins", { font: '50px indieflower', fill: "#ffffff" });

        this.coincol = this.game.add.text(this.game.world.centerX - 350, this.game.world.centerY - 190, "3. Rock!", { font: '150px indieflower', fill: "#ffffff" });
        this.coincol.angle = -7;

        this.game.stage.addChild(player);
        this.bloc = this.game.add.sprite(700, 400, 'blocco');
        this.bloc.scale.setTo(0.3,0.223);
        this.bloc1 = this.game.add.sprite(200, 1170, 'blocco');
        this.bloc1.scale.setTo(0.3,0.223);
        this.coin = this.game.add.sprite(250, 250, 'pu');
        this.tilt2 = this.game.add.text(120, 265, "+5!", { font: '60px indieflower', fill: "#ffffff" });
        this.tilt2.angle=-10;
        this.coin1 = this.game.add.sprite(750, 1450, 'pu');
        this.tilt3 = this.game.add.text(845, 1450, "+15!", { font: '60px indieflower', fill: "#ffffff" });
        this.tilt3.angle=7;
        this.coin.tint = 0xf9c22e;
        this.coin1.tint = 0x44aa00;
        this.bloc.tint = "0xff5420";
        this.bloc1.tint = "0x2387d8";
      },

      baack1: function() {
      this.game.state.start('preloader');}

      };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Tutorial = Tutorial;
}());



//avoid blocs and \r collect coins
//tilt the phone to \r move the player
