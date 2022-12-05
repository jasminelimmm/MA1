class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }

preload() {
    
    // this.mapmade with Tiled in JSON format
    this.load.tilemapTiledJSON('world', 'assets/tilemapjasmine.tmj');
    
   
    //load image
    this.load.image('Cover', 'assets/cover.png');
    

    this.load.image("city","assets/City-01.png");
    this.load.image("entry","assets/entry.png");
    this.load.spritesheet('chef', 'assets/chef.png', {frameWidth: 64, frameHeight: 64});
    this.load.audio("bgm","assets/gamemusic/bgmusic.mp3")
    this.load.audio("Enter","assets/gamemusic/enter.wav")
    this.load.spritesheet('Love', 'assets/love.png', {frameWidth: 35, frameHeight: 40});
    
    this.load.spritesheet('Key1', 'assets/key1.png', {frameWidth: 25, frameHeight: 30});
    this.load.spritesheet('Key2', 'assets/key2.png', {frameWidth: 10, frameHeight: 20});
    this.load.spritesheet('Key3', 'assets/key3.png', {frameWidth: 10, frameHeight: 20});
    

    
}

create() {
    var spaceDown = this.input.keyboard.addKey('ENTER');
    this.Enter_snd= this.sound.add("Enter")
    this.Enter_snd.play()
    this.add.image(0,0,'Cover').setOrigin(0,0);
    console.log("This is preloadScene")

    window.bgm= this.sound.add("bgm", {loop:true}).setVolume(0.2)
    window.bgm.play();
  
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

      
        this.anims.create({
          key: "love_anim2",
          frames: this.anims.generateFrameNumbers("Love", { start: 0, end: 1 }),
          frameRate: 3,
          repeat: -1,
          });
    
          
    
          this.anims.create({
            key: "love_anim3",
            frames: this.anims.generateFrameNumbers("Love", { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1,
            });
      
            
            this.anims.create({
              key: "love_anim4",
              frames: this.anims.generateFrameNumbers("Love", { start: 0, end: 1 }),
              frameRate: 3,
              repeat: -1,
              });
        
              
  
              this.anims.create({
                key: "love_anim5",
                frames: this.anims.generateFrameNumbers("Love", { start: 0, end: 1 }),
                frameRate: 3,
                repeat: -1,
                });
               
      //key
      this.anims.create({
        key: "key_anim1",
        frames: this.anims.generateFrameNumbers("Key1", { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1,
        });
  
        this.anims.create({
          key: "key_anim2",
          frames: this.anims.generateFrameNumbers("Key2", { start: 0, end: 1 }),
          frameRate: 3,
          repeat: -1,
          });
    
          this.anims.create({
            key: "key_anim3",
            frames: this.anims.generateFrameNumbers("Key3", { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1,
            });
        

     // On spacebar event, jump to intro2
     spaceDown.on(
       "down",
       function () {
         console.log("Jump to preloadScene2");
         this.scene.start( "preloadScene2");
       },
       this
     );
       
        
    
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

            if (window.heart == 0){
     
              this.scene.stop('world');
              window.bgm.stop()
              this.scene.start("gameOver")
             
            }
}

} // end of class
