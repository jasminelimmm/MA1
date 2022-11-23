var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 20,
    height: 32 * 20,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [preloadScene,preloadScene2,preloadScene3,preloadScene4,preloadScene5,preloadScene6,preloadScene7,preloadScene8,preloadScene9, world, room1,room2,room3]
};

var game = new Phaser.Game(config);
