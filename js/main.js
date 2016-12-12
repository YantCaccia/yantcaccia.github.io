window.addEventListener('load', function () {
  'use strict';

  var ns = window['antonio'];
  var game = new Phaser.Game(1080, 1920, Phaser.CANVAS, 'antonio-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);
  game.state.add('credits', ns.Credits);
  game.state.start('boot');
}, false);


// previous previous width=500 height=900