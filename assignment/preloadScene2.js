class preloadScene2 extends Phaser.Scene {
    constructor() {
      super({
        key: "preloadScene2",
      });
  
      // Put global variable here
    }
  
    preload() {
  
      this.load.image("Storyline","assets/storyline.png");
  
    }
  
    create() {
      console.log("*** preloadScene2");
  
      // Add image and detect spacebar keypress
      this.add.image(0, 0, 'Storyline').setOrigin(0, 0);
  
      // Check for spacebar or any key here
      var spaceDown = this.input.keyboard.addKey("ENTER");
  
      
  
      // On spacebar event, call the world scene
      spaceDown.on(
        "down",
        function () {
          console.log("Jump to preloadScene3");
          this.scene.start( "preloadScene3");
        },
        this
      );
  
    }
  }
  