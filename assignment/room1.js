class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room1' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {
        this.load.tilemapTiledJSON('home','assets/home.tmj');
        this.load.image("interiorImg","assets/gather_interior_walls_1.6.png");
        this.load.image("kitchenImg","assets/12_Kitchen_32x32.png");
        this.load.image("floorImg","assets/wood.png");
        
    }

    create() {
        console.log('*** room1 scene');
        let map = this.make.tilemap({key:'home'});
        let wallTiles = map.addTilesetImage("gather_interior_walls_1.6","interiorImg");
        let objectTiles = map.addTilesetImage("12_Kitchen_32x32","kitchenImg");
        let floorTiles = map.addTilesetImage("Wood","floorImg");
        let tilesArray=[wallTiles,objectTiles,floorTiles];

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
            this.player.x > 262 &&
            this.player.x < 379 &&
           this.player.y > 588
          ) {
            console.log("world")
            this.world();
          }
      

    }

// Function to jump to world
world(player, tile) {
  console.log("world function");
  let playerPos={}
  playerPos.x=790
  playerPos.y=704
  this.scene.start("world", {player : playerPos})
}



    

}
