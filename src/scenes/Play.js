//I used code from https://rexrainbow.github.io/phaser3-rex-notes/docs/site/particles/
//to make the particle emitter for the ship explosion

class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    preload() {
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x000000).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add spaceships (x3)
        let ship01Rand = (Math.random() < 0.5 ? 1 : -1);
        let ship02Rand = (Math.random() < 0.5 ? 1 : -1);
        let ship03Rand = (Math.random() < 0.5 ? 1 : -1);
        this.ship01 = new SmallSpaceship(this, ship01Rand == 1 ? game.config.width + borderUISize*6 : 0, borderUISize*4, 'smallSpaceship', 0, 100, ship01Rand).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, ship02Rand == 1 ? game.config.width + borderUISize*3 : 0, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, ship02Rand).setOrigin(0,0);
        this.ship03 = new Spaceship(this, ship03Rand == 1 ? game.config.width : 0, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, ship03Rand).setOrigin(0,0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;
        // display score
        this.scoreConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, this.scoreConfig);
        this.timeRight = this.add.text(game.config.width - 4 * borderUISize - borderPadding, borderUISize + borderPadding*2, game.settings.gameTimeRemaining, this.scoreConfig);
        this.gameOver = false;

        this.playerTurn = 1;
        if (game.settings.playerCount == 2) {
            this.scoreRight = this.add.text(5 * borderUISize + borderPadding, borderUISize + borderPadding*2, this.p2Score, this.scoreConfig);
        }
        this.inBetweenTurns = false;
        this.gameOverText;
        this.gameOverControlText;

    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            game.settings.gameTimeRemaining = game.settings.gameMaxTime;
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        if (this.inBetweenTurns && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.inBetweenTurns = false;
            this.playerTurn = 2;
            this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
            this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x000000).setOrigin(0, 0);
            this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
            this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x000000).setOrigin(0, 0);
            this.add.rectangle(0, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
            this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x000000).setOrigin(0, 0);
            this.ship01.destroy();
            this.ship02.destroy();
            this.ship03.destroy();
            let ship01Rand = (Math.random() < 0.5 ? 1 : -1);
            let ship02Rand = (Math.random() < 0.5 ? 1 : -1);
            let ship03Rand = (Math.random() < 0.5 ? 1 : -1);
            this.ship01 = new SmallSpaceship(this, ship01Rand == 1 ? game.config.width + borderUISize*6 : 0, borderUISize*4, 'smallSpaceship', 0, 100, ship01Rand).setOrigin(0, 0);
            this.ship02 = new Spaceship(this, ship02Rand == 1 ? game.config.width + borderUISize*3 : 0, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, ship02Rand).setOrigin(0,0);
            this.ship03 = new Spaceship(this, ship03Rand == 1 ? game.config.width : 0, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, ship03Rand).setOrigin(0,0);
            this.p1Rocket.destroy();
            this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
            this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, this.scoreConfig);
            this.scoreRight = this.add.text(5 * borderUISize + borderPadding, borderUISize + borderPadding*2, this.p2Score, this.scoreConfig);
            this.timeRight = this.add.text(game.config.width - 4 * borderUISize - borderPadding, borderUISize + borderPadding*2, game.settings.gameTimeRemaining, this.scoreConfig);
            game.settings.gameTimeRemaining = game.settings.gameMaxTime;
        }

        this.starfield.tilePositionX -= 4;
        if (!this.gameOver && !this.inBetweenTurns) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        
        if (game.settings.gameTimeRemaining <= 0) {
            if (game.settings.playerCount == 2 && this.playerTurn == 1) {
                this.add.text(game.config.width/2, game.config.height/2, 'Nice Job!', this.scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press <- for p2 to start', this.scoreConfig).setOrigin(0.5);
                this.inBetweenTurns = true;
            } else if (game.settings.playerCount == 2 && this.playerTurn == 2) {
                this.timeRight.text = 0;
                if (this.p1Score > this.p2Score) {
                    this.add.text(game.config.width/2, game.config.height/2, 'p1 wins!', this.scoreConfig).setOrigin(0.5);
                } else if (this.p1Score < this.p2Score) {
                    this.add.text(game.config.width/2, game.config.height/2, 'p2 wins!', this.scoreConfig).setOrigin(0.5);
                } else {
                    this.add.text(game.config.width/2, game.config.height/2, 'It\'s a tie!', this.scoreConfig).setOrigin(0.5);
                }
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', this.scoreConfig).setOrigin(0.5);
                this.gameOver = true;
            } else {
                this.add.text(game.config.width/2, game.config.height/2, 'Game Over!', this.scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', this.scoreConfig).setOrigin(0.5);
                this.gameOver = true;
            }
        } else {
            this.timeRight.text = Math.round(game.settings.gameTimeRemaining / 1000);
            game.settings.gameTimeRemaining -= 15;
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true;
        } else {
          return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        	
        let emitter = this.add.particles(ship.x + ship.width / 2, ship.y + ship.height / 2, 'particle1', {
            x: {min: -ship.width / 2, max: ship.width / 2},
            y: {min: -ship.height / 2, max: ship.height / 2},
            lifespan: 750,
            quantity: 1,
            speedX: {min: -75, max: 75},
            speedY: {min: -75, max: 75},
            accelerationX: {min: -75, max: 75},
            accelerationY: {min: -75, max: 75}
        });
        emitter.start();
        emitter.explode(30);
        emitter.stop();
        ship.reset();
        ship.alpha = 1;
        // score add and repaint
        if (this.playerTurn == 1) {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        } else {
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
        }
        this.sound.play('sfx_explosion');

        game.settings.gameTimeRemaining += 1000;
        game.settings.gameTimeRemaining = Math.round(game.settings.gameTimeRemaining);
    }
}
