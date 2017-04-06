(function() {
  'use strict';
    
  function Menu() {}

  Menu.prototype = {

      create: function () {
          
          this.game.add.tileSprite(0, 0, 1080, 1920, 'bck');
          
          this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
          
          var best = localStorage.getItem('bestscore');
          
          this.go = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 700, "Game over!", { font: '130px indieflower', fill: blu});
          this.go.anchor.setTo(0.5, 0.5);
          
          this.smile = this.game.add.text(this.game.world.centerX + 450, this.game.world.centerY - 590, ":(", { font: '90px indieflower', fill: blu});
          this.smile.anchor.setTo(0.5, 0.5);
          this.smile.angle = 70;
          
          this.high = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 400, "New high score!", { font: '100px indieflower', fill: blu});
          this.high.anchor.setTo(0.5, 0.5);
          if (score>best){this.high.visible = true;}
          else if (score<best){this.high.visible=false;}
          
          this.asd = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 50, "Your score: " + score, { font: '60px indieflower', fill: "#9d5ae7"});
          this.asd.anchor.setTo(0.5, 0.5);
        
          
          this.asdf = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 100, "Your best score: " + best, { font: '60px indieflower', fill: verde});
          this.asdf.anchor.setTo(0.5, 0.5);
          
          this.asdfg = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 450, "Tap to play again", { font: '60px indieflower', fill: rosso}); //1BBA7D
          this.asdfg.inputEnabled = true;
          this.asdfg.events.onInputDown.add(this.onDown, this);
          this.asdfg.anchor.setTo(0.5, 0.5);
          
          
          this.asdfgh = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 600, "Main menu", { font: '60px indieflower', fill: giallo});
          this.asdfgh.inputEnabled = true;
          this.asdfgh.events.onInputDown.add(this.onDown1, this);
          this.asdfgh.anchor.setTo(0.5, 0.5);
        
        },

    update: function () {
        
        if (this.jumpButton.isDown)
          {
              this.game.state.start('game');
          }


    },

    onDown: function () {
        this.game.state.start('game');
        start.play();
    },
      
      onDown1: function () {
        this.game.stage.removeChild(player);
        this.game.state.start('preloader');
    }
  };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Menu = Menu;
}());
