(function() {
  'use strict';

  function Preloader() {}

  Preloader.prototype = {
      
    create: function () {
        
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.logo = this.game.add.sprite(this.game.world.centerX, 1850, 'asd');
        this.logo.anchor.setTo(0.5, 0.5);
        this.logo.scale.setTo(0.28,0.28);
        
        this.mainmenu = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 700, "Project1", { font: '150px indieflower', fill: "#ffffff" });
        this.mainmenu.anchor.setTo(0.5, 0.5);
        
        
        this.play = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Play", { font: '100px indieflower', fill: "#ffffff" });
        this.play.anchor.setTo(0.5, 0.5);
        this.play.inputEnabled = true;
        this.play.events.onInputDown.add(this.playdown, this);
        
        this.audiooff = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, "Mute audio", { font: '100px indieflower', fill: "#ffffff" });
        this.audiooff.anchor.setTo(0.5, 0.5);
        this.audiooff.inputEnabled = true;
        this.audiooff.events.onInputDown.add(this.mute, this);
        this.audiooff.visible=true;
        
        this.audioon = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 300, "Unmute audio", { font: '100px indieflower', fill: "#ffffff" });
        this.audioon.anchor.setTo(0.5, 0.5);
        this.audioon.inputEnabled = true;
        this.audioon.events.onInputDown.add(this.unmute, this);
        this.audioon.visible=false;
        
        this.start = this.game.add.audio('play');

    },
      
      mute: function(){
         this.game.sound.mute = true;
         //this.audiooff.visible=false;
         //this.audioon.visible=true;
          },
      
      unmute: function(){
         this.game.sound.mute = false;
         //this.audiooff.visible=true;
         //this.audioon.visible=false;
          },
      
      playdown: function(){
          this.game.state.start('game');
          this.start.play();
          },

    update: function () {
        
      /*  if (this.jumpButton.isDown){
          
            this.game.state.start('game');
    },*/
      
      if (this.game.sound.mute==false){
          
          this.audiooff.visible=true;
          this.audioon.visible=false;
      }
      
      else if (this.game.sound.mute==true){
      
       this.audioon.visible=true;
       this.audiooff.visible=false;
  
      }

  },
      
  };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Preloader = Preloader;
}());
