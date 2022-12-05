
class animationScene extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'animationScene' });
    }

    preload() {

        
        this.load.spritesheet('chef', 'assets/chef.png',{ frameWidth:64, frameHeight:64 });

    } // end of preload //

    create (){

    console.log("animationScene")

    


    
    this.anims.create({
        key:'down-chef',
        frames:this.anims.generateFrameNumbers('chef',
        { start:5, end:7}),
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key:'right-chef',
        frames:this.anims.generateFrameNumbers('chef',
        { start:0, end:2}),
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key:'up-monkiddo',
        frames:this.anims.generateFrameNumbers('chef',
        { start:10, end:12}),
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key:'left-monkiddo',
        frames:this.anims.generateFrameNumbers('chef',
        { start:15, end:17}),
        frameRate:10,
        repeat:-1
    });


    
    this.add.sprite(300, 350, 'chef').setScale(1).play('down-chef')
    this.add.sprite(400, 350, 'chef').setScale(1).play('right-chef')
    this.add.sprite(300, 350, 'chef').setScale(1).play('right-chef')
    this.add.sprite(250, 350, 'chef').setScale(1).play('left-chef')
    
    

    } // end of create //

    update () {

    } // end of update // 
}