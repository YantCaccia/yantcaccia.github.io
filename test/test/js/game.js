(function() {
  'use strict';

  function Game() {}

  Game.prototype = {


      create: function () {

        //testissimo = this.game.add.text(100,100,"ciao");

          window.plugins.insomnia.keepAwake();

          controllo = 0;

          levelup = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Speed Up!", { font: '150px indieflower', fill: bianco});
          levelup.anchor.setTo(0.5, 0.5);
          levelup.angle = -20;
          levelup.alpha = 0;

          this.plus = this.game.add.text(90, 155, "", { font: '75px indieflower', fill: bianco});
          this.plus.angle = -10
          this.plus.anchor.setTo(0.5, 0.5);
          this.plus.alpha = 1;

          fx = this.game.add.audio('ten');
          this.dead = this.game.add.audio('dead');
          this.main = this.game.add.audio('main');
          if(this.game.sound.mute==false){
          this.main.play();}
          else if(this.game.sound.mute==true) {this.main.stop();}
          this.main.volume = 0.4;

          this.input.onDown.add(this.resume, this);

          this.game.time.desiredFps = 60;

          this.cursors = this.game.input.keyboard.createCursorKeys();

          this.game.physics.startSystem(Phaser.Physics.ARCADE);

          this.game.world.setBounds(0, 0, 1080, 1920); //limiti mondo

          this.rightwall = this.game.add.sprite(1079, 1900, 'asd'); // previuos 499, 850
          this.leftwall = this.game.add.sprite(-139, 1900, 'asd');  //previous -49, 850
          this.game.physics.enable([player, this.rightwall, this.leftwall], Phaser.Physics.ARCADE);
          player.body.collideWorldBounds=true;
          this.rightwall.body.immovable = true;
          this.rightwall.visible = false;
          this.leftwall.body.immovable = true;
          this.leftwall.visible = false;
          velY = 1200;

          this.powerup = this.game.time.events.loop(4000, this.pugenerator, this);

          this.greencoin = this.game.time.events.loop((Math.floor(Math.random() * (17000 - 10000 + 1)) + 10000), this.teest, this);
          this.pipeGenerator = this.game.time.events.loop(750, this.createBaddie, this);  //determina col primo attributo tra le parentesi ogni quanto cade un blocco

          this.ob = this.game.add.physicsGroup();
          this.pu = this.game.add.physicsGroup();

          //  aggiunge 5 sprite al gruppo
          this.ob.createMultiple(5, 'blocco', 0, false);
          this.pu.createMultiple(6, 'pu', 0, false);
          this.gpu = this.game.add.physicsGroup();

          this.ppu = this.pu.getFirstDead();
          this.ppu.tint = 0x44aa00;
          this.gpu.createMultiple(6, 'pu', 0, false);

    //this.ppu.reset(600, 300, 0);


          score = -2;
          this.labelScore = this.game.add.text(30, 30,'', { font: "60px indieflower", fill: bianco }); //#F9C22E
          this.pause = this.game.add.text(880, 30,'pause', { font: "50px indieflower", fill: bianco });
          this.pause.inputEnabled = true
          this.pause.events.onInputDown.add(this.pausedown, this);

        gyro.frequency = 5;


        if(this.game.device.android) {

        gyro.startTracking(function(o) {
             player.body.velocity.x = -(o.x)*400;
        });

        }

          if(this.game.device.iOS) {

        gyro.startTracking(function(o) {
             player.body.velocity.x = (o.x)*500;
        });

        }
      },


      createBaddie: function() {

    var item = this.ob.getFirstDead();

    item.reset(this.game.rnd.integerInRange(-35, 864), 0); // posiziona lo sprite nel mondo (previous -35, 410)


    item.body.velocity.y = velY;

    item.checkWorldBounds = true;
    item.outOfBoundsKill = true;

    score += 1;


    item.scale.setTo(0.3, 0.223); //previuos 2, 1 //4,2

    item.body.immovable = true;


    var myColors = ["0xff5420", "0x2387d8", "0x9d5ae7"]; //"0x4285F4", "0x34A853", "0xFBBC05", "0xEA4335" 27B9DD //"0x1BBA7D", "0xF15946", "0x2684EF" //"0xdd210d", "0x0a427f", "0x44aa00"
    col = myColors[Math.floor(Math.random() * myColors.length)];

    item.tint = col;

    },

      contenuto: function(){
                levelup.alpha = 1;
                this.game.add.tween(levelup).to({alpha: 0}, 700, Phaser.Easing.Linear.None, true, 1000);
      },

    update: function () {

        if(score>10 && controllo==0){

            this.contenuto();
            controllo = 1;
            this.powerup.delay = 2000;
        }

        if(score>40 && controllo==1) {

            this.pipeGenerator.delay = 400;
            this.contenuto();
            controllo = 2;
            this.powerup.delay = 1400;

        }

        if(score>75 && controllo==2){

            velY = 1400;
            this.contenuto();
            controllo = 3;
            this.powerup.delay = 900;
        }

        if(score>110 && controllo==3){

            this.pipeGenerator.delay = 320;
            this.contenuto();
            controllo = 4;

        }

        this.labelScore.setText(score);

        if (score>0) {
        this.labelScore.visible = true;
            }

        else {
            this.labelScore.visible = false;
              }

        player.body.velocity.x = 0;


          if (this.cursors.left.isDown)
          {
              player.body.velocity.x = -1600;
          }

                  else if (this.cursors.right.isDown)
          {
              player.body.velocity.x = 1600;
          }


        if(this.game.physics.arcade.collide(this.ob, player)){  //se il player tocca un blocco, il player sparisce


            gyro.stopTracking();
            player.body.velocity.x = 0;
            this.main.stop();
            if(this.game.sound.mute==false){
            this.dead.play();}
            else if(this.game.sound.mute==true) {this.dead.stop();}            this.game.state.start('menu');

            if (score>bestscore){

                localStorage.setItem('bestscore', score);
                bestscore = score;
            }


          }


        if(this.game.physics.arcade.collide(player, this.rightwall)){


                player.body.x = 1;

          }



        if(this.game.physics.arcade.collide(this.leftwall, player)){


                player.body.x = 940; //previous 499

          }

        if(this.game.physics.arcade.collide(this.pu, player)){

            this.ppu.kill();
            score=score+5;
            this.plus.setText("+5!");

            if(this.game.sound.mute==false){
         fx.play();}
          else if(this.game.sound.mute==true) {fx.stop();}
            this.plus.alpha = 1;
            this.tweeen = this.game.add.tween(this.plus).to({alpha: 0}, 300, Phaser.Easing.Linear.None, true, 1000);
        }

        if(this.game.physics.arcade.collide(this.gpu, player)){

            this.gppu.kill();
            score=score+15;
            this.plus.setText("+15!");
            if(this.game.sound.mute==false){
         fx.play();}
          else if(this.game.sound.mute==true) {fx.stop();}
            this.plus.alpha = 1;
            this.tweeen = this.game.add.tween(this.plus).to({alpha: 0}, 300, Phaser.Easing.Linear.None, true, 1000);
        }


    },

      pausedown: function(){

          this.pause.setText("play");
          this.game.paused = true;

      },

      resume: function(){

          this.pause.setText("pause");
          this.game.paused = false;

      },

      pugenerator: function(){

    this.ppu = this.pu.getFirstDead();

    this.ppu.reset(this.game.rnd.integerInRange(-35, 864), 0); // posiziona lo sprite nel mondo (previous -35, 410)


    this.ppu.body.velocity.y = (velY + 900);

    this.ppu.checkWorldBounds = true;
    this.ppu.outOfBoundsKill = true;

    this.ppu.tint = 0xf9c22e;

      },

      teest: function(){
    this.gppu = this.gpu.getFirstDead();

    this.gppu.reset(this.game.rnd.integerInRange(-35, 864), 0);


    this.gppu.body.velocity.y = (velY + 900);

    this.gppu.checkWorldBounds = true;
    this.gppu.outOfBoundsKill = true;

    this.gppu.tint = 0x44aa00;
      },


  };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Game = Game;
}());
