class preloadScene3 extends Phaser.Scene {
    constructor() {
      super({
        key: "preloadScene3",
      });
  
      // Put global variable here
    }
  
    preload() {
  
      this.load.image("Task","assets/task.png");
      this.load.audio("Enter","assets/gamemusic/enter.wav")
  
    }
  
    create() {
      console.log("*** preloadScene3");
  
      // Add image and detect spacebar keypress
      this.add.image(0, 0, 'Task').setOrigin(0, 0);
  
      // Check for spacebar or any key here
      var spaceDown = this.input.keyboard.addKey("ENTER");
      this.Enter_snd= this.sound.add("Enter")
      
      
  
      // On spacebar event, call the world scene
      spaceDown.on(
        "down",
        function () {
          console.log("Jump to preloadScene4");
          this.scene.start( "preloadScene4");
          this.Enter_snd= this.sound.add("Enter")
          this.Enter_snd.play()
        },
        this
      );
  
    }
  }
  