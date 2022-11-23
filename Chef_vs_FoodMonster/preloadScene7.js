class preloadScene7 extends Phaser.Scene {
    constructor() {
      super({
        key: "preloadScene7",
      });
  
      // Put global variable here
    }
  
    preload() {
  
      this.load.image("Rule3","assets/rule3.png");
  
    }
  
    create() {
      console.log("*** preloadScene7 scene");
  
      // Add image and detect spacebar keypress
      this.add.image(0, 0, 'Rule3').setOrigin(0, 0);
  
      // Check for spacebar or any key here
      var spaceDown = this.input.keyboard.addKey("ENTER");
  
      
  
      // On spacebar event, call the world scene
      spaceDown.on(
        "down",
        function () {
          console.log("Jump to preloadScene8");
          this.scene.start( "preloadScene8");
        },
        this
      );
  
    }
  }
  