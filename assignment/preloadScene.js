class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }

preload() {
    // this.mapmade with Tiled in JSON format
    this.load.tilemapTiledJSON('world', 'assets/tilemapjasmine.tmj');
    // tiles in spritesheet 
    // this.load.spritesheet('city', 'assets/City-01.png', {frameWidth: 50, frameHeight: 40});
    // // simple coin image
    // this.load.image('coin', 'assets/coinGold.png');
    // // this.playeranimations
    //this.load.atlas('player', 'assets/player.png', 'assets/player.json');
    // this.load.atlas('girl', 'assets/girl.png', 'assets/girl.json');
   
    //load image
    this.load.image("city","assets/City-01.png");
    this.load.image("entry","assets/entry.png");
    // Anna is 64x64 9 frames per animation
    this.load.spritesheet('chef', 'assets/chef.png', {frameWidth: 64, frameHeight: 64});

    // this.load.spritesheet('fire', 'assets/fire.png',{ frameWidth:40, frameHeight:70 });
}

create() {

    this.add.text(10, 10, 'This is preload Scene', { font: '24px Courier', fill: '#FFFF00' });
    this.add.text(10, 34, 'Click or space to continue', { font: '24px Courier', fill: '#FFFF00' });

    var spaceDown = this.input.keyboard.addKey('SPACE');
        
    this.input.on('pointerdown', function (pointer) {
        this.scene.start("world");
        }, this);

    spaceDown.on('down', function(){
        console.log("Jump to world scene");
        let playerPos={}
        playerPos.x=784
        playerPos.y=706
        this.scene.start("world", { player : playerPos });
        }, this );


    // this.anims.create({
    //     key: "fireAnim",
    //     frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 3 }),
    //     frameRate: 10,
    //     repeat: -1,
    //     });
    
    this.anims.create({
        key: "down",
        frames: this.anims.generateFrameNumbers("chef", { start: 5, end: 7 }),
        frameRate: 10,
        repeat: -1,
        });
        
        this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("chef", { start: 0, end: 2 }),
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
}

} // end of class