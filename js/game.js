(function() {
  'use strict';

  function Game() {}

  Game.prototype = {

      
      create: function () {
          
          this.levelup = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Level Up!", { font: '150px indieflower', fill: "#FFFFFF"});
          this.levelup.anchor.setTo(0.5, 0.5);
          this.levelup.angle = -20;
          this.levelup.alpha = 0;
          
          this.fx = this.game.add.audio('ten');
          this.dead = this.game.add.audio('dead');
          this.main = this.game.add.audio('main');
          this.main.play();
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
          this.rightwall.scale.setTo(0.28, 0.28);
          this.rightwall.visible = false;
          this.leftwall.body.immovable = true;
          this.leftwall.scale.setTo(0.28, 0.28);
          this.leftwall.visible = false;
          velY = 1200;


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

          
          score = -2;
          this.labelScore = this.game.add.text(30, 30,'', { font: "60px indieflower", fill: "#FFFFFF" }); //#F9C22E
          this.pause = this.game.add.text(880, 30,'pause', { font: "50px indieflower", fill: "#F15946" });
          this.pause.inputEnabled = true;
          this.pause.events.onInputDown.add(this.pausedown, this);

        gyro.frequency = 5;
          
          //WP=*200)+31 IOS=*1000
        
        
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
        
        
    item.scale.setTo(4, 2); //previuos 2, 1

    item.body.immovable = true;
        
        
    var myColors = ["0x1BBA7D", "0xF15946", "0xF9C22E", "0x2684EF"]; //"0x4285F4", "0x34A853", "0xFBBC05", "0xEA4335" 27B9DD
    var col = myColors[Math.floor(Math.random() * myColors.length)];
        
    item.tint = col;
    this.labelScore.tint = col;
          
    if(score==10||score==30||score==50||score==99) {
        this.fx.play();
        this.game.add.tween(this.levelup).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true);
        this.lufo = this.game.time.create(false);
        this.lufo.add(1500, this.ludi, this);
        this.lufo.start();
        this.levelup.tint = col;
        }
    },

    update: function () {
        
        if(score>10){
            
            this.game.time.events.remove(this.pipeGenerator);
            this.pipeGenerator2.start();
        }
        
        if(score>30) {
            
            this.pipeGenerator2.destroy();
            this.pipeGenerator3.start();
            
        }
        
        if(score>50){
            
            velY = 1400;
        }
        
        if(score>99){
            
            this.pipeGenerator3.destroy();
            this.pipeGenerator4.start();
            
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
            this.dead.play();
            this.game.state.start('menu');
            
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


    },
      
      pausedown: function(){
          
          this.pause.setText("play");
          this.game.paused = true;
          
      },
      
      resume: function(){
              
          this.pause.setText("pause");
          this.game.paused = false;
          
      },
          
      
ludi: function(){
    
    this.game.add.tween(this.levelup).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
},
      

  };

  window['antonio'] = window['antonio'] || {};
  window['antonio'].Game = Game;
}());
