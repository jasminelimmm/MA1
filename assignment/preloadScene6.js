class preloadScene6 extends Phaser.Scene {
    constructor() {
      super({
        key: "preloadScene6",
      });
  
      // Put global variable here
    }
  
    preload() {
  
      this.load.image("Rule2","assets/rule2.png");
  
    }
  
    create() {
      console.log("*** preloadScene6 scene");
  
      // Add image and detect spacebar keypress
      this.add.image(0, 0, 'Rule2').setOrigin(0, 0);
  
      // Check for spacebar or any key here
      var spaceDown = this.input.keyboard.addKey("ENTER");
  
      
  
      // On spacebar event, call the world scene
      spaceDown.on(
        "down",
        function () {
          console.log("Jump to preloadScene7");
          this.scene.start( "preloadScene7");
        },
        this
      );
  
    }
  }
  