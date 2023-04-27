class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        //load images
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('smallSpaceship', './assets/smallSpaceship.png');
        this.load.image('particle1', './assets/particle1.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        //menu text configuration
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Rocket Patrol 2023 Remaster', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + game.config.height/12, 'OR', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + game.config.height/6, 'Use Mouse to move and Left Click to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + game.config.height/4, "press <- for Single Player or -> for Two Player", menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        game.settings = {
          playerCount : 0,
          spaceshipSpeed: 3,
          gameTimeRemaining: 60000,
          gameMaxTime : 60000,
        }

        let ship01Rand = 1;
        this.ship01 = new Spaceship(this, ship01Rand == 1 ? game.config.width + borderUISize*6 : 0, borderUISize*3, 'spaceship', 0, 30, ship01Rand).setOrigin(0, 0);
        let ship02Rand = -1;
        this.ship02 = new Spaceship(this, ship02Rand == 1 ? game.config.width + borderUISize*6 : 0, borderUISize*13, 'spaceship', 0, 30, ship02Rand).setOrigin(0, 0);
        let ship03Rand = -1;
        this.ship03 = new SmallSpaceship(this, ship03Rand == 1 ? game.config.width + borderUISize*6 : 0, borderUISize, 'smallSpaceship', 0, 30, ship03Rand).setOrigin(0, 0);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings.playerCount = 1;
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings.playerCount = 2;
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }

        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
    }
}