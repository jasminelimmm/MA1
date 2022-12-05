class preloadScene5 extends Phaser.Scene {
    constructor() {
      super({
        key: "preloadScene5",
      });
  
      // Put global variable here
    }
  
    preload() {
  
      this.load.image("Rule1","assets/rule1.png");
      this.load.audio("Enter","assets/gamemusic/enter.wav")
    }
  
    create() {
      console.log("*** preloadScene5 scene");
  
      // Add image and detect spacebar keypress
      this.add.image(0, 0, 'Rule1').setOrigin(0, 0);
  
      // Check for spacebar or any key here
      var spaceDown = this.input.keyboard.addKey("ENTER");
      this.Enter_snd= this.sound.add("Enter")
      
  
      // On spacebar event, call the world scene
      spaceDown.on(
        "down",
        function () {
          console.log("Jump to preloadScene6");
          this.scene.start( "preloadScene6");
          this.Enter_snd= this.sound.add("Enter")
          this.Enter_snd.play()
        },
        this
      );
  
    }
  }
  