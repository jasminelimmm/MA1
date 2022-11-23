
class animationScene extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'animationScene' });
    }

    preload() {

        // this.load.spritesheet('coin', 'assets/coin.png',{ frameWidth:32, frameHeight:32 });
        // this.load.spritesheet('fire', 'assets/fire.png',{ frameWidth:40, frameHeight:70 });
        this.load.spritesheet('chef', 'assets/chef.png',{ frameWidth:64, frameHeight:64 });

    } // end of preload //

    create (){

    console.log("animationScene")

    // this.anims.create({
    //     key:'spin',
    //     frames:this.anims.generateFrameNumbers('coin',
    //     { start:0, end:5 }),
    //     frameRate:10,
    //     repeat:-1
    // });

    // this.anims.create({
    //     key:'fastspin',
    //     frames:this.anims.generateFrameNumbers('coin',
    //     { start:0, end:5 }),
    //     frameRate:20,
    //     repeat:-1
    // });

    // this.anims.create({
    //     key:'burn',
    //     frames:this.anims.generateFrameNumbers('fire',
    //     { start:0, end:3}),
    //     frameRate:10,
    //     repeat:-1
    // });


    
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
    
    // this.fireGroup=this.add.group({
    //     key:'fire',
    //     repeat:10,
    //     setXY:{x:100,y:200,stepX:40}
    // });

    // this.add.sprite(100, 100, 'coin')
    // this.add.sprite(200, 100, 'coin').setScale(2).play('fastspin')
    // this.add.sprite(350, 100, 'coin').setScale(4).play('slowspin')

    // this.add.sprite(200, 300, 'coin').play('spin')
    // this.add.sprite(200, 300, 'coin').setScale(2).play('spin')
    // this.add.sprite(300, 300, 'coin').setScale(4).play('spin')

    // this.add.sprite(100, 300, 'fire').play('burn')
    // this.add.sprite(100, 350, 'fire').play('burn')
    // this.add.sprite(100, 400, 'fire').play('burn')
    // this.add.sprite(100, 450, 'fire').play('burn')
    // this.add.sprite(100, 500, 'fire').play('burn')
    // this.fireGroup.children.iterate( c=>{
    //     c.play('burn').setScale(2)
    // })

    } // end of create //

    update () {

    } // end of update // 
}