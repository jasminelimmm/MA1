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
  }

  create() {
    console.log("*** world scene");

    //Step 3 - Create the map from main
    //let map = this.make.tilemap({ key: "world1" });

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
    this.player = this.physics.add.sprite(this.player.x,this.player.y,'chef').play("down")
    // this.player.setScale(1);
    window.player = this.player;

    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.delayOneSec,
      callbackScope: this,
      loop: false,
    });
    // Add main player here with physics.add.sprite
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

    // Add time event / movement here
    this.cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // set background color, so the sky is not black
    this.cameras.main.setBackgroundColor("#ccccff");

    this.itemLayer.setCollisionByExclusion(-1, true);

    this.roadLayer.setCollisionByProperty({ walkway: true });

    // this.playerwill collide with the level tiles
    this.physics.add.collider(this.roadLayer, this.player);
    
    //this.physics.add.collider(this.groundLayer, this.player);


    this.physics.world.bounds.width = this.roadLayer.width;
    this.physics.world.bounds.height = this.roadLayer.height;

    this.physics.add.collider(this.player,this.itemLayer);

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
  } else {
    this.player.anims.stop();
    this.player.body.setVelocity(0, 0);
  }

    if (
      this.player.x > 778 &&
      this.player.x < 800 &&
      this.player.y < 700 &&
      this.player.y > 650
    ) {
      console.log("room1")
      this.room1();
    }


    if (
      this.player.x > 1088 &&
      this.player.x < 1120 &&
      this.player.y < 248 &&
      this.player.y > 224
    ) {
      console.log("room2")
      this.room2();
    }

    if (
      this.player.x > 448 &&
      this.player.x < 471 &&
      this.player.y < 290 &&
      this.player.y > 260
    ) {
      console.log("room3")
      this.room3();
    }
    
    //console.log('idle');
  }////////////////// end of update //////////////////////////////
  
// Function to jump to room1
room1(player, tile) {
  console.log("room1 function");
  this.scene.start("room1");
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
}
 //////////// end of class world ////////////////////////
