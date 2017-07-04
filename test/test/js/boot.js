(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {

    preload: function () {
      this.load.image('blocco', 'assets/qwe.png');
      this.load.image('pu', 'assets/coin1.png');
      this.load.image('asd', 'assets/player2.png');
      this.game.load.audio('ten', 'assets/sfx.wav');
      this.game.load.audio('play', 'assets/start1.wav');
      this.game.load.audio('dead', 'assets/dead.wav');
      this.game.load.audio('main', ['assets/main.ogg', 'assets/main.mp3']);
    },

    create: function () {

        //StatusBar.hide();

        this.game.stage.backgroundColor = "#4ec44e"; //212121  353535 13293D 4d7cff 2495f2

        player = this.game.make.sprite(this.game.world.centerX, 1850, 'asd');
        player.anchor.setTo(0.5, 0.5);

        this.game.forceSingleUpdate = true;
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

        this.game.state.start('preloader');
        }
  };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Boot = Boot;
}());
