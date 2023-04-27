// Small Spaceship prefab
class SmallSpaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, posMod) {
      super(scene, x, y, texture, frame);
      scene.add.existing(this);
      this.points = pointValue;
      this.moveSpeed = game.settings.spaceshipSpeed * 2 * posMod;
      if (posMod == 1) { this.flipX = true; }
    }

    update() {
        //move spaceship left
        this.x += this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width || this.x >= game.config.width + this.width) {
            this.reset();
        }
    }

    reset() {
        if (this.moveSpeed < 0) {
            this.x = game.config.width;
        } else {
            this.x = 0;
        }
    }
}