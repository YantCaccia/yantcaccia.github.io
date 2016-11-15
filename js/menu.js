(function() {
  'use strict';
    
  function Menu() {}

  Menu.prototype = {

      create: function () {
          
          this.start1 = this.game.add.audio('play');
          
          var playerx = localStorage.getItem('playerx');
          
          this.loogo = this.game.add.sprite(playerx, 1850, 'asd');
          this.loogo.anchor.setTo(0.5, 0.5);
          this.loogo.scale.setTo(0.28,0.28);
          
          this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            
          var punto = localStorage.getItem('punti');
          var best = localStorage.getItem('bestscore');
          
          this.go = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 700, "Game over!", { font: '120px indieflower', fill: "#FFFFFF"});
          this.go.anchor.setTo(0.5, 0.5);
          
          this.asd = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 50, "Your score: " + punto, { font: '60px indieflower', fill: "#FFFFFF"});
          this.asd.anchor.setTo(0.5, 0.5);
        
          
          this.asdf = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, "Your best score: " + best, { font: '60px indieflower', fill: "#FFFFFF"});
          this.asdf.anchor.setTo(0.5, 0.5);
          
          this.asdfg = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 600, "Tap to play again", { font: '60px indieflower', fill: "#FFFFFF"});
          
          this.asdfg.inputEnabled = true;
          this.asdfg.events.onInputDown.add(this.onDown, this);
          this.asdfg.anchor.setTo(0.5, 0.5);
          
          //N.B. previuos font size=32px
        
        },

    update: function () {
        
        if (this.jumpButton.isDown)
          {
              this.game.state.start('game');
          }


    },

    onDown: function () {
        this.game.state.start('game');
        this.start1.play();
    }
  };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Menu = Menu;
}());
