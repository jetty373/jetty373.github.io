const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#5c94fc",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let player;
let keys;

function preload() {
  // Load the character sprite (replace with actual URL or local path if available)
  this.load.image("player", "https://examples.phaser.io/assets/sprites/phaser-dude.png");
  // Load a simple platform image
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

  // Define custom key bindings (W, A, S, D, Space, Shift)
  keys = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
    jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
    sprint: Phaser.Input.Keyboard.KeyCodes.SHIFT
  });
}

function update() {
  // Reset player velocity (movement)
  player.setVelocityX(0);

  let speed = 160; // Normal movement speed

  // Check if the sprint key is held to increase speed
  if (keys.sprint.isDown) {
    speed = 240; // Sprinting speed
  }

  // Move left (A key)
  if (keys.left.isDown) {
    player.setVelocityX(-speed);
    player.flipX = true; // Flip the player image to face left
  }
  // Move right (D key)
  else if (keys.right.isDown) {
    player.setVelocityX(speed);
    player.flipX = false; // Face right
  }

  // Jump if touching the ground (Space or W key)
  if ((keys.jump.isDown || keys.up.isDown) && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
