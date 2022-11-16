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
        this.load.image("floorImg","assets/gather_floors_2_exploration.png");
        
        
    }

    create() {
        console.log('*** room3 scene');
        let map = this.make.tilemap({key:'lab'});
        let labTiles = map.addTilesetImage("7","7Img");
        let wallTiles = map.addTilesetImage("gather_interior_walls_1.6","wallImg");
        let floorTiles = map.addTilesetImage("gather_floors_2_exploration","floorImg");
        let tilesArray=[labTiles,wallTiles,floorTiles];

        this.roadLayer=map.createLayer("road",tilesArray,0,0);
    this.buildingLayer=map.createLayer("building",tilesArray,0,0);
    this.itemLayer=map.createLayer("item",tilesArray,0,0);

    var startPoint = map.findObject("objectlayer", (obj) => obj.name === "start");
    this.player = this.physics.add.sprite(startPoint.x,startPoint.y,'chef').play("up")
    // this.player.setScale(1);
    window.player = this.player;

    this.cursors = this.input.keyboard.createCursorKeys();

    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // set background color, so the sky is not black
    this.cameras.main.setBackgroundColor("#ccccff");

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
  this.scene.start("world", {player : playerPos})
}



    

}
