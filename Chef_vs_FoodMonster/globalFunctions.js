////////////////////////////////////////////////////////
//
// access this function using updateInventory.call(this)
// Uses a JS function to prevent repeated codes
// 
///////////////////////////////////////////////////////
function updateInventory() {
    console.log("*** updateInventory()")
    // Emit events showInventory
    this.inventory = {}
    this.inventory.heart = window.heart
    this.inventory.key = window.key
  
    console.log('*** updateInventory() Emit event', this.inventory)
    this.invEvent = (event, data) =>  { this.scene.get('showInventory').events.emit(event, data); }
    this.invEvent("inventory", this.inventory);
  }
  
  ////////////////////////////////////////////////////////
  //
  // access this function using guardCaught
  // Uses a JS function to prevent repeated codes
  // 
  ///////////////////////////////////////////////////////
  function hit_enemy(player,enemy) {
      console.log("*** enemy overlap player");
  
      this.Crash_snd.play();
      this.Enter_snd= this.sound.add("Enter")
  
      // Shake screen
    this.cameras.main.shake(100);
  
      window.heart--
      enemy.disableBody(false, true);
      //this.updateInventory()
      updateInventory.call(this)
  
    if (window.heart == 0){
     
      this.scene.stop('world');
      this.scene.start("gameOver")
      this.Gameover_snd.play();
    }
  }