class preloadScene8 extends Phaser.Scene {
    constructor() {
      super({
        key: "preloadScene8",
      });
  
      // Put global variable here
    }
  
    preload() {
  
      this.load.image("Lifespans","assets/lifespans.png");
      this.load.audio("Enter","assets/gamemusic/enter.wav")
    }
  
    create() {
      console.log("*** preloadScene8 scene");
  
      // Add image and detect spacebar keypress
      this.add.image(0, 0, 'Lifespans').setOrigin(0, 0);
  
      // Check for spacebar or any key here
      var spaceDown = this.input.keyboard.addKey("ENTER");
      this.Enter_snd= this.sound.add("Enter")
      
  
      // On spacebar event, call the world scene
      spaceDown.on(
        "down",
        function () {
          console.log("Jump to preloadScene9");
          this.scene.start( "preloadScene9");
          this.Enter_snd= this.sound.add("Enter")
          this.Enter_snd.play()
        },
        this
      );
  
    }
  }
  