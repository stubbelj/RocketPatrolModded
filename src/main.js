
/*
Luca Stubbe
*Rocket Patrol 2023 Remaster*
I spent about 4 hours on this assignment

100 pts total
Randomize each spaceship's movement direction at the start of each play (5)
    Ships randomly spawn moving left or right on game start
Display the time remaining (in seconds) on the screen (10)
    Displayed in text in the top right in-game
Create a new title screen (e.g., new artwork, typography, layout) (10)
    Ships moving in background, new font, new colors
Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15 pts)
    On a hit, the player gains 1-2 seconds and the timer is rounded to the nearest second for smoothing
Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15 pts)
    Special spaceship spawns at the top row, and besides being smaller and faster and worth more points is like a normal spaceship
Implement mouse control for player movement and mouse click to fire (15 pts)
    Mouse movement controls rocket's x-value, and left-clicking fires it. Works simultaneously with key controls.
Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (15 pts)
    A temporary emitter is created when the ship is hit, and several particles are launched out at random speeds and directions
Implement an alternating two-player mode (15 pts)
    Scene basically does everything to reload except resetting scores, and updates player 2 scores. at the end of p2's turn, a winner is declared. Player count chosen at menu scene.

//I referenced https://steemit.com/utopian-io/@onepice/move-objects-according-to-the-mouse-position-with-phaser-3
//for the code to find mouse position and check for mouse clicks
//I used code from https://www.youtube.com/watch?v=B5fvw3J6ljw
//to make a particle emitter for the ship explosion
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;