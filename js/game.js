(function() {
  'use strict';

  function Game() {}

  Game.prototype = {

      
      create: function () {
          
          this.input.onDown.add(this.resume, this);
          
          this.game.time.desiredFps = 60;
          
          this.cursors = this.game.input.keyboard.createCursorKeys();

          this.game.physics.startSystem(Phaser.Physics.ARCADE);

          this.game.world.setBounds(0, 0, 1080, 1920); //limiti mondo
        
          this.rightwall = this.game.add.sprite(1079, 1900, 'asd'); // previuos 499, 850
          this.leftwall = this.game.add.sprite(-139, 1900, 'asd');  //previous -49, 850
          this.player = this.game.add.sprite(this.game.world.centerX, 1850, 'asd'); //previuos 1920
          this.player.anchor.setTo(0.5, 0.5);
          this.game.physics.enable([this.player, this.rightwall, this.leftwall], Phaser.Physics.ARCADE);
          this.player.scale.setTo(0.28, 0.28); //previuos 0.66, 0.66
          this.rightwall.body.immovable = true;
          this.rightwall.scale.setTo(0.28, 0.28);
          this.rightwall.visible = false;
          this.leftwall.body.immovable = true;
          this.leftwall.scale.setTo(0.28, 0.28);
          this.leftwall.visible = false;
          var self = this;
          self.velY = 1200;


          this.pipeGenerator = this.game.time.events.loop(750, this.createBaddie, this);  //determina col primo attributo tra le parentesi ogni quanto cade un blocco
          
          this.pipeGenerator2 = this.game.time.create(false);
          this.pipeGenerator2.loop(650, this.createBaddie, this);
          
          this.pipeGenerator3 = this.game.time.create(false);
          this.pipeGenerator3.loop(400, this.createBaddie, this);
          
          this.pipeGenerator4 = this.game.time.create(false);
          this.pipeGenerator4.loop(320, this.createBaddie, this);
          
          this.ob = this.game.add.physicsGroup();

          //  aggiunge 5 sprite al gruppo
          this.ob.createMultiple(5, 'blocco', 0, false);

          
          this.score = -2;
          this.labelScore = this.game.add.text(30, 30,'', { font: "60px indieflower", fill: "#FFFFFF" });
          this.pause = this.game.add.text(880, 30,'pause', { font: "50px indieflower", fill: "#FFFFFF" });
          this.pause.inputEnabled = true;
          this.pause.events.onInputDown.add(this.pausedown, this);
          this.player.events.onInputDown.add(this.resume, this);

        gyro.frequency = 5;
          
          //WP=*200)+31 IOS=*1000
        
        
        if(this.game.device.android) {
        
        gyro.startTracking(function(o) {
             self.player.body.velocity.x = -(o.x)*400;
        });
            
        };
          
        if(this.game.device.iOS) {
        
        gyro.startTracking(function(o) {
             self.player.body.velocity.x = -(o.x)*1000;
        });
            
        }
      },
      
      
      createBaddie: function() {

    var item = this.ob.getFirstDead();

    item.reset(this.game.rnd.integerInRange(-35, 864), 0); // posiziona lo sprite nel mondo (previous -35, 410)


    item.body.velocity.y = this.velY;

    item.checkWorldBounds = true;
    item.outOfBoundsKill = true;

    this.score += 1;
        
        
    item.scale.setTo(4, 2); //previuos 2, 1

    item.body.immovable = true;
        
        
    var myColors = ["0x4285F4", "0x34A853", "0xFBBC05", "0xEA4335"];
    var col = myColors[Math.floor(Math.random() * myColors.length)];
        
    item.tint = col;

    },

    update: function () {
        
        if(this.score>2){
            
            this.game.time.events.remove(this.pipeGenerator);
            this.pipeGenerator2.start();
        }
        
        if(this.score>14) {
            
            this.pipeGenerator2.destroy();
            this.pipeGenerator3.start();
            
        }
        
        if(this.score>24){
            
            this.velY = 1400;
        }
        
        if(this.score>99){
            
            this.pipeGenerator3.destroy();
            this.pipeGenerator4.start();
            
        }
        
        this.labelScore.setText(this.score);
        
        if (this.score>0) {
        this.labelScore.visible = true;
            }
        
        else {
            this.labelScore.visible = false;
              }
        
        
        if(this.game.physics.arcade.collide(this.ob, this.player)){  //se il player tocca un blocco, il player sparisce
        
            
            gyro.stopTracking();
            this.game.state.start('menu');
            localStorage.setItem('punti', this.score);
            localStorage.setItem('playerx', this.player.world.x);
            
            if (this.score>bestscore){
                
                localStorage.setItem('bestscore', this.score);
                bestscore = this.score;
            }
            
            
          }
        
        
        if(this.game.physics.arcade.collide(this.player, this.rightwall)){
        
            
                this.player.body.x = 1;
            
          }
        
  
        
        if(this.game.physics.arcade.collide(this.leftwall, this.player)){
        
            
                this.player.body.x = 940; //previous 499
            
          }
        
        
        
        this.player.body.velocity.x = 0;
        
        
          if (this.cursors.left.isDown)
          {
              this.player.body.velocity.x = -1600;
          }

                  else if (this.cursors.right.isDown)
          {
              this.player.body.velocity.x = 1600;
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
      

  };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Game = Game;
}());
