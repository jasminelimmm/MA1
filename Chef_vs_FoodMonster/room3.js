class room3 extends Phaser.Scene {

    constructor() {
        super({ key: 'room3' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
        this.load.tilemapTiledJSON('lab','assets/lab.tmj');
        this.load.image("7Img","assets/7.png");
        this.load.image("wallImg","assets/gather_interior_walls_1.6.png");
        this.load.image("floorImg3","assets/gather_floors_2_exploration.png");
        this.load.spritesheet('Orange', 'assets/orange_64x64.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('Blue', 'assets/blue_64x64.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('Yellow', 'assets/yellow_64x64.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('Green', 'assets/green_64x64.png', {frameWidth: 64, frameHeight: 64});
        this.load.audio("Collectmedicine","assets/gamemusic/collectmedicine.mp3")
        this.load.audio("Crash","assets/gamemusic/crash.mp3")
        
    }

    create() {
        console.log('*** room3 scene');

        this.Collectmedicine_snd= this.sound.add("Collectmedicine")
        this.Crash_snd= this.sound.add("Crash")

        let map = this.make.tilemap({key:'lab'});
        let labTiles = map.addTilesetImage("7","7Img");
        let wallTiles = map.addTilesetImage("gather_interior_walls_1.6","wallImg");
        let floorTiles = map.addTilesetImage("gather_floors_2_exploration","floorImg3");
        let tilesArray=[labTiles,wallTiles,floorTiles];

        this.roadLayer=map.createLayer("road",tilesArray,0,0);
    this.buildingLayer=map.createLayer("building",tilesArray,0,0);
    this.itemLayer=map.createLayer("item",tilesArray,0,0);

    var startPoint = map.findObject("objectlayer", (obj) => obj.name === "start");
    this.player = this.physics.add.sprite(startPoint.x,startPoint.y,'chef').play("up");
    this.player.body.setSize(this.player.width*0.8,this.player.height*0.9)
    // this.player.setScale(1);
    window.player = this.player;

    this.cursors = this.input.keyboard.createCursorKeys();

    //antidote
    this.anims.create({
      key: "orange_anim",
      frames: this.anims.generateFrameNumbers("Orange", { start: 0, end: 2 }),
      frameRate: 3,
      repeat: -1,
      });

      var Orange = map.findObject("objectlayer", (obj) => obj.name === "orange");

      this.orange = this.physics.add.sprite(Orange.x,Orange.y,'Orange').play("orange_anim")
      this.orange.body.setSize(this.orange.width*0.5,this.orange.height*0.7)

      this.anims.create({
        key: "blue_anim",
        frames: this.anims.generateFrameNumbers("Blue", { start: 0, end: 2 }),
        frameRate: 3,
        repeat: -1,
        });
  
        var Blue = map.findObject("objectlayer", (obj) => obj.name === "blue");
  
        this.blue = this.physics.add.sprite(Blue.x,Blue.y,'Blue').play("blue_anim")
        this.blue.body.setSize(this.blue.width*0.5,this.blue.height*0.7)
  
        this.anims.create({
          key: "yellow_anim",
          frames: this.anims.generateFrameNumbers("Yellow", { start: 0, end: 2 }),
          frameRate: 3,
          repeat: -1,
          });
    
          var Yellow = map.findObject("objectlayer", (obj) => obj.name === "yellow");
    
          this.yellow = this.physics.add.sprite(Yellow.x,Yellow.y,'Yellow').play("yellow_anim")
          this.yellow.body.setSize(this.yellow.width*0.5,this.yellow.height*0.7)

          this.anims.create({
            key: "green_anim",
            frames: this.anims.generateFrameNumbers("Green", { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1,
            });
      
            var Green = map.findObject("objectlayer", (obj) => obj.name === "green");
      
            this.green = this.physics.add.sprite(Green.x,Green.y,'Green').play("green_anim")
            this.green.body.setSize(this.green.width*0.5,this.green.height*0.7)
    
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

    

      this.physics.add.overlap(this.player, this.orange,this.collect_antidote,null,this);
      this.physics.add.overlap(this.player, this.blue,this.collect_antidote,null,this);
      this.physics.add.overlap(this.player, this.yellow,this.collect_wrong,null,this);
      this.physics.add.overlap(this.player, this.green,this.collect_wrong,null,this);
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
            this.player.x > 442 &&
            this.player.x < 522 &&
           this.player.y > 989
          ) {
            console.log("world")
            this.world();
          }
      

    }

// Function to jump to world
world(player, tile) {
  console.log("world function");
  let playerPos={}
  playerPos.x=448
  playerPos.y=295
  playerPos.facing="down"
  this.scene.start("world", {player : playerPos})
}

collect_wrong(player,wrong_dote){
  console.log("wrongdote")
  // lose a life
  //shake the camera
  // this.cameras.main.shake(100);
  this.Crash_snd.play()
 wrong_dote.disableBody(true,true);
}

collect_antidote(player,antidote){
  console.log("collect_antidotes");
  
  this.Collectmedicine_snd.play()
 antidote.disableBody(true,true);
  return false;
}



}
