(function() {
  'use strict';

  function Credits() {}

  Credits.prototype = {
      create: function () {
          var p = 'Main Music by Erik Skiff. \n Phaser.io distributed under the MIT License Copyright © 2016 Richard Davey, Photon Storm Ltd. \n gyro.js distributed under the MIT License Copyright (c) 2011 Tom Gallacher \n MIT License text: \n Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and / or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: \n The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. \n THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.';
          var style = { font: "30px indieflower", fill: "#ffffff", align: "center" };
          var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY-200, p, style);
          text.anchor.setTo(0.5, 0.5);
          text.wordWrap = true;
          text.wordWrapWidth = 800;
          
        this.back = this.game.add.text(this.game.world.centerX + 450, this.game.world.centerY + 930, "back", { font: '30px indieflower', fill: "#ffffff" });
        this.back.anchor.setTo(0.5, 0.5);
        this.back.inputEnabled = true;
        this.back.events.onInputDown.add(this.baack, this);
      },
      
      baack: function() {
      this.game.state.start('preloader');
  }
      };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Credits = Credits;
}());