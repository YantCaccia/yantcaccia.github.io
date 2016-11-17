(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {
      
    preload: function () {
      this.load.image('blocco', 'assets/ostacolo.png');
      this.load.image('asd', 'assets/logo.png');
      this.game.load.audio('ten', 'assets/sfx.wav');
      this.game.load.audio('play', 'assets/start1.wav');
      this.game.load.audio('dead', 'assets/dead.wav');
      this.game.load.audio('main', ['assets/main.ogg', 'assets/main.m4a']);
    },

    create: function () {
        
        this.game.stage.backgroundColor = '#212121'; //212121
         
        this.game.forceSingleUpdate = true; // permette al custom font di essere letto chiaramente
        this.game.renderer.renderSession.roundPixels = true; // permette al custom font di essere letto chiaramente
        
        //var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        
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

