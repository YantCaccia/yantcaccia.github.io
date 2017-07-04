(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {

    preload: function () {
      this.load.image('wp', 'assets/gr.jpg');
      this.load.image('blocco', 'assets/qwe.png');
      this.load.image('pu', 'assets/coin1.png');
      this.load.image('asd', 'assets/player.png');
      this.game.load.audio('ten', 'assets/sfx.wav');
      this.game.load.audio('play', 'assets/start1.wav');
      this.game.load.audio('dead', 'assets/dead.wav');
      this.game.load.audio('main', ['assets/main.ogg', 'assets/main.mp3']);
    },

    create: function () {

        /*background = this.game.make.sprite(this.game.world.centerX, this.game.world.centerY, 'wp');
        background.anchor.setTo(0.5, 0.5);
        this.game.stage.addChild(background);*/


        this.game.stage.backgroundColor = '#4ec44e';

        //this.game.stage.backgroundColor = '#2495F2'; //212121  353535 13293D 4d7cff

        player = this.game.make.sprite(this.game.world.centerX, 1850, 'asd');
        player.anchor.setTo(0.5, 0.5);
        //player.scale.setTo(0.28, 0.28);

        this.game.forceSingleUpdate = true; // permette al custom font di essere letto chiaramente
        this.game.renderer.renderSession.roundPixels = true; // permette al custom font di essere letto chiaramente

          this.game.scale.minWidth = 320;
          this.game.scale.minHeight = 480;
          this.game.scale.maxWidth = 1280; //1440
          this.game.scale.maxHeight = 2560;//2560
          this.game.scale.pageAlignHorizontally = true;
          this.game.scale.pageAlignVertically = true;
        //if(this.game.device.desktop){
          this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //}
        //else {
          this.game.scale.refresh();
            //}

      if(this.game.device.android||this.game.device.iOS){

            this.game.state.start('androidstate');
       }

        else{
        this.game.state.start('preloader');
        }
    }
  };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Boot = Boot;
}());
