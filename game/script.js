const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#5c94fc",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let player;
let keys;

function preload() {
  // Load the character sprite and platform images
  this.load.image("player", "https://examples.phaser.io/assets/sprites/phaser-dude.png");
  this.load.image("ground", "https://examples.phaser.io/assets/sprites/platform.png");
}

function create() {
  // Add a static ground platform
  const ground = this.physics.add.staticGroup();
  ground.create(400, 580, "ground").setScale(2).refreshBody();

  // Create the player character
  player = this.physics.add.sprite(100, 450, "player").setScale(0.5);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  // Add keyboard inputs for WASD, Space, and Shift
  keys = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    right: Phaser.Input.Keyboard.KeyCodes.D,
    jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
    sprint: Phaser.Input.Keyboard.KeyCodes.SHIFT,
  });

  // Add collision between player and ground
  this.physics.add.collider(player, ground);
}

function update() {
  // Reset player velocity
  player.setVelocityX(0);

  // Sprint (Shift) increases movement speed
  let speed = keys.sprint.isDown ? 240 : 160;

  // Move left
  if (keys.left.isDown) {
    player.setVelocityX(-speed);
    player.flipX = true; // Flip the player image to face left
  }
  // Move right
  else if (keys.right.isDown) {
    player.setVelocityX(speed);
    player.flipX = false; // Face right
  }

  // Jump when touching the ground
  if (keys.jump.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
