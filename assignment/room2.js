class room2 extends Phaser.Scene {

    constructor() {
        super({ key: 'room2' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
        this.load.tilemapTiledJSON('market','assets/market.tmj');
        this.load.image("marketImg","assets/market.png");
        this.load.image("wallImg","assets/gather_interior_walls_1.6.png");
        this.load.image("floorImg","assets/gather_floors_2_exploration.png");
        this.load.spritesheet('Love', 'assets/love.png', {frameWidth: 35, frameHeight: 40});
        this.load.spritesheet('Key4', 'assets/key4.png', {frameWidth: 10, frameHeight: 20});
        this.load.spritesheet('Key5', 'assets/key5.png', {frameWidth: 10, frameHeight: 20});
        this.load.spritesheet('Key6', 'assets/key6.png', {frameWidth: 10, frameHeight: 20});
        this.load.image("tomato","assets/object/tomato_mt.png");
        this.load.image("prawn","assets/object/prawn_mt.png");
        this.load.image("crab","assets/object/crab_mt.png");
        this.load.image("bawang","assets/object/bawang_mt.png");
        this.load.image("carrot","assets/object/carrot_mt.png");
        this.load.image("broccoli","assets/object/broccoli_mt.png");
        this.load.image("meat","assets/object/meat_mt.png");
        this.load.audio("Crash","assets/gamemusic/crash.mp3")
        this.load.audio("Collectkey","assets/gamemusic/collectkey.mp3")
        this.load.audio("Collectlove","assets/gamemusic/collectlove.mp3")
        
        
    }

    create() {
        console.log('*** room2 scene');

        this.Crash_snd= this.sound.add("Crash")
        this.Collectkey_snd= this.sound.add("Collectkey")
        this.Collectlove_snd= this.sound.add("Collectlove")
        
        let map = this.make.tilemap({key:'market'});
        let marketTiles = map.addTilesetImage("market","marketImg");
        let wallTiles = map.addTilesetImage("gather_interior_walls_1.6","wallImg");
        let floorTiles = map.addTilesetImage("gather_floors_2_exploration","floorImg");
        let tilesArray=[marketTiles,wallTiles,floorTiles];

        this.roadLayer=map.createLayer("road",tilesArray,0,0);
    this.buildingLayer=map.createLayer("building",tilesArray,0,0);
    this.itemLayer=map.createLayer("item",tilesArray,0,0);

    var startPoint = map.findObject("objectlayer", (obj) => obj.name === "start");
    this.player = this.physics.add.sprite(startPoint.x,startPoint.y,'chef').play("up");
    this.player.body.setSize(this.player.width*0.8,this.player.height*0.9)

    // this.player.setScale(1);
    window.player = this.player;

    this.cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // set background color, so the sky is not black
    this.cameras.main.setBackgroundColor("#ccccff");

    this.itemLayer.setCollisionByExclusion(-1, true);
    this.buildingLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player,this.itemLayer);
    this.physics.add.collider(this.player,this.buildingLayer);
    
    //key
    this.anims.create({
      key: "key_anim4",
      frames: this.anims.generateFrameNumbers("Key4", { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1,
      });

      var Key4 = map.findObject("objectlayer", (obj) => obj.name === "key4");

      this.key4 = this.physics.add.sprite(Key4.x,Key4.y,'Key4').play("key_anim4")
      this.key4.body.setSize(this.key4.width*0.5,this.key4.height*0.5)

      this.anims.create({
        key: "key_anim5",
        frames: this.anims.generateFrameNumbers("Key5", { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1,
        });
  
        var Key5 = map.findObject("objectlayer", (obj) => obj.name === "key5");
  
        this.key5 = this.physics.add.sprite(Key5.x,Key5.y,'Key5').play("key_anim5")
        this.key5.body.setSize(this.key5.width*0.5,this.key5.height*0.5)

        this.anims.create({
          key: "key_anim6",
          frames: this.anims.generateFrameNumbers("Key6", { start: 0, end: 1 }),
          frameRate: 3,
          repeat: -1,
          });
    
          var Key6 = map.findObject("objectlayer", (obj) => obj.name === "key6");
    
          this.key6 = this.physics.add.sprite(Key6.x,Key6.y,'Key6').play("key_anim6")
          this.key6.body.setSize(this.key6.width*0.5,this.key6.height*0.5)
  
      
        this.physics.add.overlap(this.player, this.key4,this.collect_key,null,this);
        this.physics.add.overlap(this.player, this.key5,this.collect_key,null,this);
        this.physics.add.overlap(this.player, this.key6,this.collect_key,null,this);

        //love
        this.anims.create({
          key: "love_anim6",
          frames: this.anims.generateFrameNumbers("Love", { start: 0, end: 1 }),
          frameRate: 3,
          repeat: -1,
          });
    
          var Love = map.findObject("objectlayer", (obj) => obj.name === "love6");
    
          this.love6 = this.physics.add.sprite(Love.x,Love.y,'Love').play("love_anim6")
          this.love6.body.setSize(this.love6.width*0.5,this.love6.height*0.5)

          this.anims.create({
            key: "love_anim7",
            frames: this.anims.generateFrameNumbers("Love", { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1,
            });
      
            var Love = map.findObject("objectlayer", (obj) => obj.name === "love7");
      
            this.love7 = this.physics.add.sprite(Love.x,Love.y,'Love').play("love_anim7")
            this.love7.body.setSize(this.love7.width*0.5,this.love7.height*0.5)

          this.physics.add.overlap(this.player, this.love6,this.collect_love,null,this);
          this.physics.add.overlap(this.player, this.love7,this.collect_love,null,this);

          //enemy
          this.time.addEvent({
            delay: 0,
            callback: this.moveSquare1,
            callbackScope: this,
            loop: false,
          });

          this.time.addEvent({
            delay: 0,
            callback: this.moveDownUp1,
            callbackScope: this,
            loop: false,
          });
      
          this.time.addEvent({
            delay: 0,
            callback: this.moveRightLeft1,
            callbackScope: this,
            loop: false,
          });

          this.time.addEvent({
            delay: 0,
            callback: this.moveRightLeft2,
            callbackScope: this,
            loop: false,
          });

          this.time.addEvent({
            delay: 0,
            callback: this.moveRightLeft3,
            callbackScope: this,
            loop: false,
          });

          this.time.addEvent({
            delay: 0,
            callback: this.moveDownUp2,
            callbackScope: this,
            loop: false,
          });

          this.time.addEvent({
            delay: 0,
            callback: this.moveDownUp3,
            callbackScope: this,
            loop: false,
          });

          this.time.addEvent({
            delay: 0,
            callback: this.moveRightLeft4,
            callbackScope: this,
            loop: false,
          });

          this.time.addEvent({
            delay: 0,
            callback: this.moveRightLeft5,
            callbackScope: this,
            loop: false,
          });

          this.time.addEvent({
            delay: 0,
            callback: this.moveSquare2,
            callbackScope: this,
            loop: false,
          });

          this.time.addEvent({
            delay: 0,
            callback: this.moveDownUp4,
            callbackScope: this,
            loop: false,
          });

          this.time.addEvent({
            delay: 0,
            callback: this.moveRightLeft6,
            callbackScope: this,
            loop: false,
          });

          this.time.addEvent({
            delay: 0,
            callback: this.moveDownUp5,
            callbackScope: this,
            loop: false,
          });


          this.tomato1 = this.physics.add.sprite(555, 325, "tomato")
          this.tomato1.body.setSize(this.tomato1.width*0.4,this.tomato1.height*0.4)

          this.prawn1 = this.physics.add.sprite(910, 70, "prawn")
          this.prawn1.body.setSize(this.prawn1.width*0.6,this.prawn1.height*0.4)
          this.prawn2 = this.physics.add.sprite(730, 553, "prawn")
          this.prawn2.body.setSize(this.prawn2.width*0.6,this.prawn2.height*0.4)
          
          this.crab1 = this.physics.add.sprite(935, 185, "crab")
          this.crab1.body.setSize(this.crab1.width*0.6,this.crab1.height*0.4)
          this.crab2 = this.physics.add.sprite(325, 345, "crab")
          this.crab2.body.setSize(this.crab2.width*0.6,this.crab2.height*0.4)

          this.bawang1 = this.physics.add.sprite(100, 80, "bawang")
          this.bawang1.body.setSize(this.bawang1.width*0.4,this.bawang1.height*0.4)
          this.bawang2 = this.physics.add.sprite(320, 492, "bawang")
          this.bawang2.body.setSize(this.bawang2.width*0.4,this.bawang2.height*0.4)

          this.carrot1 = this.physics.add.sprite(100, 360, "carrot")
          this.carrot1.body.setSize(this.carrot1.width*0.5,this.carrot1.height*0.5)
          this.carrot2 = this.physics.add.sprite(770, 385, "carrot")
          this.carrot2.body.setSize(this.carrot2.width*0.5,this.carrot2.height*0.5)

          this.broccoli1 = this.physics.add.sprite(290, 120, "broccoli")
          this.broccoli1.body.setSize(this.broccoli1.width*0.4,this.broccoli1.height*0.4)
          this.broccoli2 = this.physics.add.sprite(145, 563, "broccoli")
          this.broccoli2.body.setSize(this.broccoli2.width*0.4,this.broccoli2.height*0.4)

          this.meat1 = this.physics.add.sprite(980, 485, "meat")
          this.meat1.body.setSize(this.meat1.width*0.5,this.meat1.height*0.4)
          this.meat2 = this.physics.add.sprite(510, 120, "meat")
          this.meat2.body.setSize(this.meat2.width*0.5,this.meat2.height*0.4)

          this.physics.add.overlap(this.player, [this.tomato1,this.prawn1,this.prawn2,this.crab1,this.crab2,this.bawang1,this.bawang2,
            this.carrot1,this.carrot2,this.broccoli1,this.broccoli2,this.meat1,this.meat2],this.hit_enemy,null,this);
    }

    update() {

        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-200);
            this.player.anims.play("up", true);
            //console.log('down');
        } else if (this.cursors.right.isDown) {
          this.player.body.setVelocityX(200);
          this.player.anims.play("left", true);
          this.player.flipX = true; // use the original sprite looking to the right
          //console.log('right');
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(200);
            this.player.anims.play("down", true);
            //console.log('down');
          //console.log('up');
        } else if (this.cursors.left.isDown) {
          this.player.body.setVelocityX(-200);
          this.player.anims.play("left", true); // walk left
          this.player.flipX = false; // flip the sprite to the left
          //console.log('left');
        } else {
          this.player.anims.stop();
          this.player.body.setVelocity(0, 0);
        }
        if (
          this.player.x > 510 &&
          this.player.x < 617 &&
         this.player.y > 836
        ) {
          console.log("world")
          this.world();
        }
      

    }

// Function to jump to world
world(player, tile) {
  console.log("world function");
  let playerPos={}
  playerPos.x=1102
  playerPos.y=278
  this.scene.start("world", {player : playerPos})
}

collect_love(player,love){
  console.log("collect_loves");
 
this.Collectlove_snd.play()
 love.disableBody(true,true);
  return false;
}

collect_key(player,key){
  console.log("collect_keys");
 
this.Collectkey_snd.play()
 key.disableBody(true,true);
  return false;
}

hit_enemy(player,enemy){
  console.log("enemy overlap player")
  // lose a life
  //shake the camera
  this.cameras.main.shake(100);
  this.Crash_snd.play()
  enemy.disableBody(true,true);
 
}
moveSquare1() {
  console.log("moveSquare");
  this.tweens.timeline({
    targets: this.tomato1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 500,

    tweens: [
      {
        y: 425,
      },
      {
        x: 690,
      },
      {
        y: 325,
      },
      {
        x: 555,
      },
    ],
  });
}

moveDownUp1() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.prawn1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1700,
    tweens: [
      {
        y: 210,
      },
      {
        y: 70,
      },
    ],
  });
}

moveRightLeft1() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.crab1,
    loop: -1, // loop forever
    ease: "Linear",
    duration: 1700,
    tweens: [
      {
        x: 1080,
      },
      {
        x: 935,
      },
    ],
  });
}

moveRightLeft2() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.bawang1,
    loop: -1, // loop forever
    ease: "Linear",
    duration: 1000,
    tweens: [
      {
        x: 260,
      },
      {
        x: 100,
      },
    ],
  });
}

moveRightLeft3() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.carrot1,
    loop: -1, // loop forever
    ease: "Linear",
    duration: 950,
    tweens: [
      {
        x: 260,
      },
      {
        x: 100,
      },
    ],
  });
}

moveDownUp2() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.broccoli1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,
    tweens: [
      {
        y: 250,
      },
      {
        y: 120,
      },
    ],
  });
}

moveDownUp3() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.meat1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1200,
    tweens: [
      {
        y: 730,
      },
      {
        y: 485,
      },
    ],
  });
}

moveRightLeft4() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.bawang2,
    loop: -1, // loop forever
    ease: "Linear",
    duration: 950,
    tweens: [
      {
        x: 485,
      },
      {
        x: 320,
      },
    ],
  });
}

moveRightLeft5() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.crab2,
    loop: -1, // loop forever
    ease: "Linear",
    duration: 1000,
    tweens: [
      {
        x: 480,
      },
      {
        x: 325,
      },
    ],
  });
}

moveSquare2() {
  console.log("moveSquare");
  this.tweens.timeline({
    targets: this.broccoli2,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 500,

    tweens: [
      {
        y: 658,
      },
      {
        x: 295,
      },
      {
        y: 563,
      },
      {
        x: 145,
      },
    ],
  });
}

moveDownUp4() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.prawn2,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,
    tweens: [
      {
        y: 698,
      },
      {
        y: 553,
      },
    ],
  });
}

moveRightLeft6() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.carrot2,
    loop: -1, // loop forever
    ease: "Linear",
    duration: 1000,
    tweens: [
      {
        x: 954,
      },
      {
        x: 770,
      },
    ],
  });
}

moveDownUp5() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.meat2,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1200,
    tweens: [
      {
        y: 250,
      },
      {
        y: 120,
      },
    ],
  });
}


}
