(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {

    preload: function () {
      this.load.image('blocco', 'assets/qwe.png');
      this.load.image('pu', 'assets/coin1.png');
      this.load.image('asd', 'assets/player.png');
      this.game.load.audio('ten', 'assets/sfx.wav');
      this.game.load.audio('play', 'assets/start1.wav');
      this.game.load.audio('dead', 'assets/dead.wav');
      this.game.load.audio('main', ['assets/main.ogg', 'assets/main.mp3']);
    },

    create: function () {

        StatusBar.hide();

        this.game.stage.backgroundColor = '#48C647'; //48C647

        player = this.game.make.sprite(this.game.world.centerX, 1850, 'asd');
        player.anchor.setTo(0.5, 0.5);

        this.game.forceSingleUpdate = true; // permette al custom font di essere letto chiaramente
        this.game.renderer.renderSession.roundPixels = true; // permette al custom font di essere letto chiaramente

          this.game.scale.minWidth = 320;
          this.game.scale.minHeight = 480;
          this.game.scale.maxWidth = 2160; //1280
          this.game.scale.maxHeight = 3840; //2560
          this.game.scale.pageAlignHorizontally = true;
          this.game.scale.pageAlignVertically = true;
        if(this.game.device.android){
          this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
          this.game.scale.refresh();
        }
        else {
          this.game.scale.refresh();
          }

      /*if(this.game.device.android||this.game.device.iOS){

            this.game.state.start('androidstate');
       }*/

        //else{
        this.game.state.start('preloader');
        //}
    }

    };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Boot = Boot;
}());
