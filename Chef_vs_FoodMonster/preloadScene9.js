class preloadScene9 extends Phaser.Scene {
    constructor() {
      super({
        key: "preloadScene9",
      });
  
      // Put global variable here
    }
  
    preload() {
  
      this.load.image("Gamecontrol","assets/gamecontrol.png");
  
    }
  
    create() {
      console.log("*** preloadScene9 scene");
  
      // Add image and detect spacebar keypress
      this.add.image(0, 0, 'Gamecontrol').setOrigin(0, 0);
  
      // Check for spacebar or any key here
      var spaceDown = this.input.keyboard.addKey("ENTER");
  
      
  
      // On spacebar event, call the world scene
      spaceDown.on(
        "down",
        function () {
        console.log("Jump to room1");
        let playerPos = {};
        playerPos.x = 247;
        playerPos.y = 163;
        playerPos.facing ="down"
        console.log(playerPos)
        this.scene.start("room1",{player: playerPos});
    },
    this
    );
  
    }
  }
  