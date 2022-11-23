class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world"
    });

    
    

    // Put global variable here
  }

  //incoming data from scene below
  init(data) {
    this.player = data.player
}

  preload() {
    // Step 1, load JSON
    
    this.load.tilemapTiledJSON("world","assets/tilemapjasmine.tmj");

    // Step 2 : Preload any images here
    //this.load.image("building", "assets/Buildings32x32.png");
    //this.load.image("street", "assets/Street32x32.png");

    this.load.image("city","assets/City-01.png");
    this.load.image("entry","assets/entry.png");
    this.load.spritesheet('chef', 'assets/chef.png', {frameWidth: 64, frameHeight: 64});
    this.load.image("burger","assets/object/burger_mt.png");
    this.load.image("pizza","assets/object/pizza_mt.png");
    this.load.image("sushi","assets/object/sushi_mt.png");
    this.load.image("bread","assets/object/bread_mt.png");
    this.load.image("frenchfries","assets/object/frenchfries_mt.png");
    this.load.image("donut","assets/object/donut_mt.png");
    this.load.image("chicken","assets/object/chicken_mt.png");
    this.load.image("coffee","assets/object/coffee_mt.png");
    this.load.spritesheet('Love', 'assets/love.png', {frameWidth: 35, frameHeight: 40});
    this.load.spritesheet('Key1', 'assets/key1.png', {frameWidth: 25, frameHeight: 30});
    this.load.spritesheet('Key2', 'assets/key2.png', {frameWidth: 10, frameHeight: 20});
    this.load.spritesheet('Key3', 'assets/key3.png', {frameWidth: 10, frameHeight: 20});
    
    
   
    this.load.audio("bgm","assets/gamemusic/bgmusic.mp3")
    this.load.audio("Crash","assets/gamemusic/crash.mp3")
    this.load.audio("Collectkey","assets/gamemusic/collectkey.mp3")
    this.load.audio("Collectlove","assets/gamemusic/collectlove.mp3")
  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });

   
 
    this.Crash_snd= this.sound.add("Crash")
    this.Collectkey_snd= this.sound.add("Collectkey")
    this.Collectlove_snd= this.sound.add("Collectlove")
    

    let map = this.make.tilemap({key:"world"});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //let buildingTiles = map.addTilesetImage("Buildings32x32", "building");
    //let streetTiles = map.addTilesetImage("Street32x32", "street");

    let cityTiles = map.addTilesetImage("City-01","city");
    let entryTiles = map.addTilesetImage("entry","entry");
    

    // Step 5  create an array of tiles
    // let tilesArray = [
    //   buildingTiles,
    //   streetTiles,
    // ];

    let tilesArray=[cityTiles,entryTiles];

    // Step 6  Load in layers by layers
    //this.groundLayer = map.createLayer("groundLayer",tilesArray,0,0);

    //this.streetLayer = map.createLayer("streetLayer",tilesArray,0,0);

    //this.buildingLayer = map.createLayer("buildingLayer",tilesArray,0,0);

    this.roadLayer=map.createLayer("road",tilesArray,0,0);
    this.buildingLayer=map.createLayer("building",tilesArray,0,0);
    this.itemLayer=map.createLayer("item",tilesArray,0,0);

    var startPoint = map.findObject("objectlayer", (obj) => obj.name === "start");
    this.player = this.physics.add.sprite(this.player.x,this.player.y,'chef').play(this.player.facing)
    this.player.body.setSize(this.player.width*0.8,this.player.height*0.9)

    
    // this.player.setScale(1);
    window.player = this.player;

    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.delayOneSec,
      callbackScope: this,
      loop: false,
    });
   


    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("chef", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
      });
  
      this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("chef", { start: 5, end: 7 }),
      frameRate: 10,
      repeat: -1,
      });
  
      this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("chef", { start: 10, end: 12 }),
      frameRate: 10,
      repeat: -1,
      });

      this.anims.create({
          key: "left",
          frames: this.anims.generateFrameNumbers("chef", { start: 15, end: 17 }),
          frameRate: 10,
          repeat: -1,
          });

          this.anims.create({
            key: "left_attack",
            frames: this.anims.generateFrameNumbers("chef", { start: 18, end: 19 }),
            frameRate: 10,
            repeat: -1,
            });

    //love
    this.anims.create({
      key: "love_anim1",
      frames: this.anims.generateFrameNumbers("Love", { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1,
      });

      var Love = map.findObject("objectlayer", (obj) => obj.name === "love1");

      this.love1 = this.physics.add.sprite(Love.x,Love.y,'Love').play("love_anim1")
      this.love1.body.setSize(this.love1.width*0.5,this.love1.height*0.5)
    
      this.anims.create({
        key: "love_anim2",
        frames: this.anims.generateFrameNumbers("Love", { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1,
        });
  
        var Love = map.findObject("objectlayer", (obj) => obj.name === "love2");
  
        this.love2 = this.physics.add.sprite(Love.x,Love.y,'Love').play("love_anim2")
        this.love2.body.setSize(this.love2.width*0.5,this.love2.height*0.5)
  
        this.anims.create({
          key: "love_anim3",
          frames: this.anims.generateFrameNumbers("Love", { start: 0, end: 1 }),
          frameRate: 3,
          repeat: -1,
          });
    
          var Love = map.findObject("objectlayer", (obj) => obj.name === "love3");
    
          this.love3 = this.physics.add.sprite(Love.x,Love.y,'Love').play("love_anim3")
          this.love3.body.setSize(this.love3.width*0.5,this.love3.height*0.5)
    
          this.anims.create({
            key: "love_anim4",
            frames: this.anims.generateFrameNumbers("Love", { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1,
            });
      
            var Love = map.findObject("objectlayer", (obj) => obj.name === "love4");
      
            this.love4 = this.physics.add.sprite(Love.x,Love.y,'Love').play("love_anim4")
            this.love4.body.setSize(this.love4.width*0.5,this.love4.height*0.5)

            this.anims.create({
              key: "love_anim5",
              frames: this.anims.generateFrameNumbers("Love", { start: 0, end: 1 }),
              frameRate: 3,
              repeat: -1,
              });
        
              var Love = map.findObject("objectlayer", (obj) => obj.name === "love5");
        
              this.love5 = this.physics.add.sprite(Love.x,Love.y,'Love').play("love_anim5")
              this.love5.body.setSize(this.love5.width*0.5,this.love5.height*0.5)

              this.physics.add.overlap(this.player, [this.love1,this.love2,this.love3,this.love4,this.love5],this.collect_love,null,this);
    
              
    //key
    this.anims.create({
      key: "key_anim1",
      frames: this.anims.generateFrameNumbers("Key1", { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1,
      });

      var Key1 = map.findObject("objectlayer", (obj) => obj.name === "key1");

      this.key1 = this.physics.add.sprite(Key1.x,Key1.y,'Key1').play("key_anim1")
      this.key1.body.setSize(this.key1.width*0.5,this.key1.height*0.5)
    
      this.anims.create({
        key: "key_anim2",
        frames: this.anims.generateFrameNumbers("Key2", { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1,
        });
  
        var Key2 = map.findObject("objectlayer", (obj) => obj.name === "key2");
  
        this.key2 = this.physics.add.sprite(Key2.x,Key2.y,'Key2').play("key_anim2")
        this.key2.body.setSize(this.key2.width*0.5,this.key2.height*0.7)

        this.anims.create({
          key: "key_anim3",
          frames: this.anims.generateFrameNumbers("Key3", { start: 0, end: 1 }),
          frameRate: 3,
          repeat: -1,
          });
    
          var Key3 = map.findObject("objectlayer", (obj) => obj.name === "key3");
    
          this.key3 = this.physics.add.sprite(Key3.x,Key3.y,'Key3').play("key_anim3")
          this.key3.body.setSize(this.key3.width*0.5,this.key3.height*0.7)

          this.physics.add.overlap(this.player, [this.key1,this.key2,this.key3],this.collect_key,null,this);
    
    
    // Add time event / movement here
    this.cursors = this.input.keyboard.createCursorKeys();

    //attack
    this.spacedown = this.input.keyboard.addKey('SPACE');

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // set background color, so the sky is not black
    this.cameras.main.setBackgroundColor("#ccccff");

    this.itemLayer.setCollisionByExclusion(-1, true);

    this.roadLayer.setCollisionByProperty({walkway: true});
    this.buildingLayer.setCollisionByProperty({tree: true});
    this.buildingLayer.setCollisionByProperty({buildingA: true});
    this.buildingLayer.setCollisionByProperty({buildingB: true});
    this.buildingLayer.setCollisionByProperty({buildingC: true});
    this.buildingLayer.setCollisionByProperty({buildingD: true});
    // this.playerwill collide with the level tiles
    this.physics.add.collider(this.roadLayer,this.player);
    this.physics.add.collider(this.buildingLayer,this.player);
    
    //this.physics.add.collider(this.groundLayer, this.player);


    this.physics.world.bounds.width = this.roadLayer.width;
    this.physics.world.bounds.height = this.roadLayer.height;

    this.physics.add.collider(this.player,this.itemLayer,);
    

    // Show colliding tiles as different colours 
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.itemLayer.renderDebug(debugGraphics, {
    tileColor: null, // Color of non-colliding tiles
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

    

    
    
    
 
    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    //this.cameras.main.startFollow(this.player);

    //Enemy
    this.time.addEvent({
      delay: 0,
      callback: this.moveDownUp,
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
      callback: this.moveRightLeft,
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
      callback: this.moveRightLeft2,
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
      callback: this.moveRightLeft3,
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
      callback: this.moveRightLeft4,
      callbackScope: this,
      loop: false,
    });
  
    this.time.addEvent({
      delay: 0,
      callback: this.moveDownUp5,
      callbackScope: this,
      loop: false,
    });
  
    this.time.addEvent({
      delay: 0,
      callback: this.moveDownUp6,
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
      callback: this.moveRightLeft6,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveDownUp7,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveRightLeft7,
      callbackScope: this,
      loop: false,
    });
  
    this.time.addEvent({
      delay: 0,
      callback: this.moveRightLeft8,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveRightLeft9,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveRightLeft10,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveDownUp8,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveRightLeft11,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveRightLeft12,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveRightLeft13,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveRightLeft14,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveRightLeft15,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveSquare1,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveDownUp9,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveDownUp10,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveRightLeft16,
      callbackScope: this,
      loop: false,
    });

    this.time.addEvent({
      delay: 0,
      callback: this.moveRightLeft17,
      callbackScope: this,
      loop: false,
    });

    this.burger1 = this.physics.add.sprite(303, 220, "burger")
    this.burger1.body.setSize(this.burger1.width*0.4,this.burger1.height*0.4)
    this.burger2 = this.physics.add.sprite(145, 570, "burger")
    this.burger2.body.setSize(this.burger2.width*0.4,this.burger2.height*0.4)
    this.burger3 = this.physics.add.sprite(1032, 570, "burger")
    this.burger3.body.setSize(this.burger3.width*0.4,this.burger3.height*0.4)
    this.burger4 = this.physics.add.sprite(1400, 1100, "burger")
    this.burger4.body.setSize(this.burger4.width*0.4,this.burger4.height*0.4)
   
    this.pizza1 = this.physics.add.sprite(460, 680, "pizza")
    this.pizza1.body.setSize(this.pizza1.width*0.4,this.pizza1.height*0.4)
    this.pizza2 = this.physics.add.sprite(1420, 110, "pizza")
    this.pizza2.body.setSize(this.pizza2.width*0.4,this.pizza2.height*0.4)
    this.pizza3 = this.physics.add.sprite(1455, 767, "pizza")
    this.pizza3.body.setSize(this.pizza3.width*0.4,this.pizza3.height*0.4)
    this.pizza4 = this.physics.add.sprite(860, 1100, "pizza")
    this.pizza4.body.setSize(this.pizza4.width*0.4,this.pizza4.height*0.4)
 
    this.sushi1 = this.physics.add.sprite(270, 1100, "sushi")
    this.sushi1.body.setSize(this.sushi1.width*0.5,this.sushi1.height*0.4)
    this.sushi2 = this.physics.add.sprite(903, 710, "sushi")
    this.sushi2.body.setSize(this.sushi2.width*0.5,this.sushi2.height*0.4)
    this.sushi3 = this.physics.add.sprite(782, 325, "sushi")
    this.sushi3.body.setSize(this.sushi3.width*0.5,this.sushi3.height*0.4)
    this.sushi4 = this.physics.add.sprite(50, 840, "sushi")
    this.sushi4.body.setSize(this.sushi4.width*0.5,this.sushi4.height*0.4)
  
    this.bread1 = this.physics.add.sprite(50, 1010, "bread")
    this.bread1.body.setSize(this.bread1.width*0.5,this.bread1.height*0.3)
    this.bread2 = this.physics.add.sprite(690, 1100, "bread")
    this.bread2.body.setSize(this.bread2.width*0.5,this.bread2.height*0.3)
    this.bread3 = this.physics.add.sprite(620, 265, "bread")
    this.bread3.body.setSize(this.bread3.width*0.5,this.bread3.height*0.3)
     
    this.frenchfries1 = this.physics.add.sprite(1000, 720, "frenchfries")
    this.frenchfries1.body.setSize(this.frenchfries1.width*0.4,this.frenchfries1.height*0.4)
    this.frenchfries2 = this.physics.add.sprite(1260, 1070, "frenchfries")
    this.frenchfries2.body.setSize(this.frenchfries2.width*0.4,this.frenchfries2.height*0.4)
    this.frenchfries3 = this.physics.add.sprite(1000, 335, "frenchfries")
    this.frenchfries3.body.setSize(this.frenchfries3.width*0.4,this.frenchfries3.height*0.4)
  
    this.donut1 = this.physics.add.sprite(1295, 325, "donut")
    this.donut1.body.setSize(this.donut1.width*0.4,this.donut1.height*0.4)
    this.donut2 = this.physics.add.sprite(1448, 950, "donut")
    this.donut2.body.setSize(this.donut2.width*0.4,this.donut2.height*0.4)
    this.donut3 = this.physics.add.sprite(1000, 1040, "donut")
    this.donut3.body.setSize(this.donut3.width*0.4,this.donut3.height*0.4)
    this.donut4 = this.physics.add.sprite(45, 280, "donut")
    this.donut4.body.setSize(this.donut4.width*0.4,this.donut4.height*0.4)
    
    this.chicken1 = this.physics.add.sprite(175, 970, "chicken")
    this.chicken1.body.setSize(this.chicken1.width*0.4,this.chicken1.height*0.3)
    this.chicken2 = this.physics.add.sprite(296, 360, "chicken")
    this.chicken2.body.setSize(this.chicken2.width*0.4,this.chicken2.height*0.3)
    this.chicken3 = this.physics.add.sprite(1455, 140, "chicken")
    this.chicken3.body.setSize(this.chicken3.width*0.4,this.chicken3.height*0.3)
    this.chicken4 = this.physics.add.sprite(630, 700, "chicken")
    this.chicken4.body.setSize(this.chicken4.width*0.4,this.chicken4.height*0.3)

    this.coffee1 = this.physics.add.sprite(1297, 556, "coffee")
    this.coffee1.body.setSize(this.coffee1.width*0.3,this.coffee1.height*0.4)
    this.coffee2 = this.physics.add.sprite(458, 1037, "coffee")
    this.coffee2.body.setSize(this.coffee2.width*0.3,this.coffee2.height*0.4)
    this.coffee3 = this.physics.add.sprite(1450, 520, "coffee")
    this.coffee3.body.setSize(this.coffee3.width*0.3,this.coffee3.height*0.4)
    
    
    //overlap
    this.physics.add.overlap(this.player, [this.donut1,this.donut2,this.donut3,this.donut4,
      this.burger1,this.burger2,this.burger3,this.burger4,this.pizza1,this.pizza2,this.pizza3,
      this.pizza4,this.sushi1,this.sushi2,this.sushi3,this.sushi4,this.bread1,this.bread2,this.bread3,
      this.frenchfries1,this.frenchfries2,this.frenchfries3,this.donut1,this.donut2,this.donut3,this.donut4,
      this.chicken1,this.chicken2,this.chicken3,this.chicken4,this.coffee1,this.coffee2,this.coffee3],this.hit_enemy,null,this);
  } /////////////////// end of create //////////////////////////////

  update() {

  if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(200);
      this.player.anims.play("down", true);
      //console.log('down');
  } else if (this.cursors.right.isDown) {
    this.player.body.setVelocityX(200);
    this.player.anims.play("left", true);
    this.player.flipX = true; // use the original sprite looking to the right
    //console.log('right');
  } else if (this.cursors.up.isDown) {
    this.player.body.setVelocityY(-200);
    this.player.anims.play("up", true);
    //console.log('up');
  } else if (this.cursors.left.isDown) {
    this.player.body.setVelocityX(-200);
    this.player.anims.play("left", true); // walk left
    this.player.flipX = false; // flip the sprite to the left
    
    //console.log('left');
  }else if (this.cursors.space.isDown) { //this.cursors.left.isDown && 
      this.player.body.setVelocityX(0);
      this.player.body.setVelocityY(0);
      this.player.anims.play("left_attack", true);
      console.log("attack");
      window.attack = true;

  } else {
    this.player.anims.stop();
    this.player.body.setVelocity(0, 0);
  }

    if (
      this.player.x > 746 &&
      this.player.x < 826 &&
      this.player.y < 700 &&
      this.player.y > 650
    ) {
      console.log("room1")
      this.room1();
    }


    if (
      this.player.x > 1074 &&
      this.player.x < 1138 &&
      this.player.y < 248 &&
      this.player.y > 224
    ) {
      console.log("room2")
      this.room2();
    }

    if (
      this.player.x > 417 &&
      this.player.x < 506 &&
      this.player.y < 290 &&
      this.player.y > 260
    ) {
      console.log("room3")
      this.room3();
    }
    
    // this.physics.moveToObject(this.burger1, this.player, 30, 5000);
    
    //console.log('idle');
  }////////////////// end of update //////////////////////////////
  
// Function to jump to room1
room1(player, tile) {
  console.log("room1 function");
  let playerPos={}
        playerPos.x=319
        playerPos.y=574
        playerPos.facing="up"
        this.scene.start("room1", { player : playerPos });
}

// Function to jump to room2
room2(player, tile) {
  console.log("room2 function");
  this.scene.start("room2");
}

// Function to jump to room3
room3(player, tile) {
  console.log("room3 function");
  this.scene.start("room3");
}



hit_enemy(player,enemy){
  console.log("enemy overlap player")
  // lose a life
  //shake the camera
  this.cameras.main.shake(100);
  this.Crash_snd.play()
  enemy.disableBody(true,true);
 
  
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


moveDownUp() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.burger1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1500,
    tweens: [
      {
        y: 470,
      },
      {
        y: 220,
      },
    ],
  });
}

moveDownUp1() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.burger2,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1300,
    tweens: [
      {
        y: 730,
      },
      {
        y: 570,
      },
    ],
  });
}

moveRightLeft() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.burger3,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1700,
    tweens: [
      {
        x: 1140,
      },
      {
        x: 1032,
      },
    ],
  });
}

moveDownUp2() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.burger4,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,
    tweens: [
      {
        y: 1200,
      },
      {
        y: 1100,
      },
    ],
  });
}

moveDownUp3() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.pizza2,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1500,
    tweens: [
      {
        y: 300,
      },
      {
        y: 110,
      },
    ],
  });
}

moveRightLeft2() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.pizza1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1100,
    tweens: [
      {
        x: 600,
      },
      {
        x: 460,
      },
    ],
  });
}

moveRightLeft3() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.pizza3,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,
    tweens: [
      {
        x: 1550,
      },
      {
        x: 1455,
      },
    ],
  });
}


moveDownUp4() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.pizza4,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,
    tweens: [
      {
        y: 1200,
      },
      {
        y: 1100,
      },
    ],
  });
}

moveRightLeft4() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.sushi1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 950,
    tweens: [
      {
        x: 400,
      },
      {
        x: 270,
      },
    ],
  });
}

moveDownUp5() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.sushi2,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,
    tweens: [
      {
        y: 880,
      },
      {
        y: 710,
      },
    ],
  });
}

moveDownUp6() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.sushi3,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,
    tweens: [
      {
        y: 435,
      },
      {
        y: 325,
      },
    ],
  });
}

moveRightLeft5() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.sushi4,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,
    tweens: [
      {
        x: 143,
      },
      {
        x: 50,
      },
    ],
  });
}

moveRightLeft6() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.bread1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,
    tweens: [
      {
        x: 150,
      },
      {
        x: 50,
      },
    ],
  });
}

moveDownUp7() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.bread2,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 980,
    tweens: [
      {
        y: 1205,
      },
      {
        y: 1100,
      },
    ],
  });
}

moveRightLeft7() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.bread3,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,
    tweens: [
      {
        x: 760,
      },
      {
        x: 620,
      },
    ],
  });
}

moveRightLeft8() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.frenchfries1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 980,
    tweens: [
      {
        x: 1145,
      },
      {
        x: 1000,
      },
    ],
  });
}

moveRightLeft9() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.frenchfries2,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 980,
    tweens: [
      {
        x: 1430,
      },
      {
        x: 1260,
      },
    ],
  });
}

moveRightLeft10() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.frenchfries3,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 980,
    tweens: [
      {
        x: 1180,
      },
      {
        x: 1000,
      },
    ],
  });
}

moveDownUp8() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.donut1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,
    tweens: [
      {
        y: 468,
      },
      {
        y: 325,
      },
    ],
  });
}

moveRightLeft11() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.donut2,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 980,
    tweens: [
      {
        x: 1550,
      },
      {
        x: 1448,
      },
    ],
  });
}

moveRightLeft12() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.donut3,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1000,
    tweens: [
      {
        x: 1140,
      },
      {
        x: 1000,
      },
    ],
  });
}

moveRightLeft13() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.donut4,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1200,
    tweens: [
      {
        x: 145,
      },
      {
        x: 45,
      },
    ],
  });
}

moveRightLeft14() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.chicken1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1200,
    tweens: [
      {
        x: 440,
      },
      {
        x: 175,
      },
    ],
  });
}

moveRightLeft15() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.chicken2,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1200,
    tweens: [
      {
        x: 495,
      },
      {
        x: 296,
      },
    ],
  });
}

moveSquare1() {
  console.log("moveSquare");
  this.tweens.timeline({
    targets: this.chicken3,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1200,

    tweens: [
      {
        y: 280,
      },
      {
        x: 1550,
      },
      {
        y: 140,
      },
      {
        x: 1455,
      },
    ],
  });
}

moveDownUp9() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.chicken4,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1400,
    tweens: [
      {
        y: 890,
      },
      {
        y: 700,
      },
    ],
  });
}

moveDownUp10() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.coffee1,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1400,
    tweens: [
      {
        y: 776,
      },
      {
        y: 556,
      },
    ],
  });
}

moveRightLeft16() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.coffee2,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1200,
    tweens: [
      {
        x: 600,
      },
      {
        x: 458,
      },
    ],
  });
}

moveRightLeft17() {
  console.log("moveRightLeft");
  this.tweens.timeline({
    targets: this.coffee3,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 1200,
    tweens: [
      {
        x: 1550,
      },
      {
        x: 1450,
      },
    ],
  });
}



}
 //////////// end of class world ////////////////////////
