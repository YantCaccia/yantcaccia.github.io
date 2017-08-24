(function() {
  'use strict';

  function Preloader() {}

  Preloader.prototype = {

    create: function () {

        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.game.stage.addChild(player);

        this.mainmenu = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 770, "Rocking", { font: '195px indieflower', fill: giallo }); //F9C22E
        this.mainmenu.anchor.setTo(0.5, 0.5);
        this.mainmenu.angle = -2;

        this.test = this.game.add.tween(this.mainmenu).to( { angle: 2 }, 235, "Linear", true, 0, -1);
        this.test.yoyo(true, 0);


        this.mainmenu1 = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 580, "Square", { font: '180px indieflower', fill: giallo }); //F9C22E
        this.mainmenu1.anchor.setTo(0.5, 0.5);
        this.mainmenu1.angle = 2;

        this.test1 = this.game.add.tween(this.mainmenu1).to( { angle: -2 }, 235, "Linear", true, 0, -1);
        this.test1.yoyo(true, 0);


        this.play = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Let's play!", { font: '100px indieflower', fill: rosso }); //F15946
        this.play.anchor.setTo(0.5, 0.5);
        this.play.inputEnabled = true;
        this.play.events.onInputDown.add(this.playdown, this);

        this.audiooff = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 200, "Mute", { font: '100px indieflower', fill: blu }); //2684EF
        this.audiooff.anchor.setTo(0.5, 0.5);
        this.audiooff.inputEnabled = true;
        this.audiooff.events.onInputDown.add(this.mute, this);
        this.audiooff.visible=true;

        this.credits = this.game.add.text(this.game.world.centerX + 415, this.game.world.centerY + 900, "Credits", { font: '35px indieflower', fill: marrone }); //1BBA7D
        this.credits.anchor.setTo(0.5, 0.5);
        this.credits.inputEnabled = true;
        this.credits.events.onInputDown.add(this.showcrdts, this);

        this.tutorial = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 400, "Tutorial", { font: '85px indieflower', fill: verde }); //1BBA7D
        this.tutorial.anchor.setTo(0.5, 0.5);
        this.tutorial.inputEnabled = true;
        this.tutorial.events.onInputDown.add(this.showtutorial, this);

        this.tutorial1 = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 465, "(do you really need one?)", { font: '25px indieflower', fill: verde });
        this.tutorial1.anchor.setTo(0.5, 0.5);

        start = this.game.add.audio('play');

    },

      mute: function(){

         if(this.game.sound.mute==true){
             this.game.sound.mute = false;
             start.play();
         }
          else if(this.game.sound.mute==false)
              this.game.sound.mute = true;
          },

      playdown: function(){
          this.game.state.start('game');
          start.play();
          },

      showcrdts: function(){
          this.game.state.start('credits');
          start.play();
          },

      showtutorial: function(){
          this.game.state.start('tutorial');
          start.play();
          },

    update: function () {

        if(this.game.sound.mute==true){
             this.audiooff.setText("Unmute Audio");
         }
          else if(this.game.sound.mute==false){
          this.audiooff.setText("Mute Audio");
          }

      if (this.jumpButton.isDown){

            this.game.state.start('game');
    }

  },

  };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Preloader = Preloader;
}());
