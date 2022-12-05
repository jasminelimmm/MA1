class gameOver extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameOver' });
    }

    preload() {

        this.load.image("Gameover","assets/die.png")
        this.load.audio("Gameover","assets/gamemusic/gameover.mp3")
        this.load.audio("Enter","assets/gamemusic/enter.wav")

    } // end of preload //

    create () {
       window.bgm.stop()
        this.add.image (320,320,'Gameover')
        this.Gameover_snd= this.sound.add("Gameover")
        this.Gameover_snd.play();
      
        var spaceDown = this.input.keyboard.addKey('ENTER');

        window.key = 0
        window.heart = 3

        spaceDown.on(
            "down",
            function () {
            console.log("Jump to room1");
            let playerPos = {};
            playerPos.x = 247;
            playerPos.y = 163;
            playerPos.facing ="down"
            console.log(playerPos)
            this.Enter_snd= this.sound.add("Enter")
            this.Enter_snd.play()
            window.bgm.play()
            this.scene.start("room1",{player: playerPos});
        },
        this
        );

    }

    
}