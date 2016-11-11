(function() {
  'use strict';

  function Preloader() {}

  Preloader.prototype = {
      
    create: function () {
        
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.logo = this.game.add.sprite(this.game.world.centerX, 1850, 'asd');
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.scale.setTo(0.28,0.28);
        
        this.mainmenu = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 700, "ciao 1", { font: '150px indieflower', fill: "#ffffff" });
        this.mainmenu.anchor.setTo(0.5, 0.5);
        
        
        this.play = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Play", { font: '100px indieflower', fill: "#ffffff" });
        this.play.anchor.setTo(0.5, 0.5);
        this.play.inputEnabled = true;
        this.play.events.onInputDown.add(this.playdown, this);

    },

    update: function () {
        
        if (this.jumpButton.isDown)
          {this.game.state.start('game');}
    },
      
      playdown: function(){
          this.game.state.start('game');
          }

  };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Preloader = Preloader;
}());
