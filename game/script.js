To enhance your game with a moving background and additional interactive elements like tunnels, objects, and obstacles, we'll need to:

1. **Add a Parallax Background**: Create a scrolling background effect where the background elements move at different speeds to create a sense of depth.
2. **Add Tunnels/Obstacles**: Place objects or obstacles that the player can interact with or avoid.
3. **Add a Camera System**: Ensure the camera follows the player as they move through the world.

Let's update your game with these features:

### Updated Code:

```javascript
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
let jumpPower = 330; // Starting jump power
let ground;
let platforms;
let background;
let obstacles;
let camera;

// Preload game assets
function preload() {
  // Load new URLs for the character sprite and platform
  this.load.image("player", "https://labs.phaser.io/assets/sprites/phaser-dude.png");
  this.load.image("ground", "https://labs.phaser.io/assets/sprites/platform.png");
  this.load.image("background", "https://labs.phaser.io/assets/images/space3.png");
  this.load.image("obstacle", "https://labs.phaser.io/assets/sprites/alien.png");
}

// Create the game scene
function create() {
  // Add background (moving effect)
  background = this.add.tileSprite(0, 0, 800, 600, 'background').setOrigin(0, 0);
  background.setScrollFactor(0.5); // Slow-moving background for parallax effect

  // Add static ground and platforms
  ground = this.physics.add.staticGroup();
  ground.create(400, 580, 'ground').setScale(2).refreshBody();

  platforms = this.physics.add.staticGroup();
  platforms.create(600, 400, 'ground').setScale(1.5).refreshBody();
  platforms.create(150, 300, 'ground').setScale(1.5).refreshBody();

  // Create player sprite
  player = this.physics.add.sprite(100, 450, 'player').setScale(0.5);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  // Add collision between player and ground/platforms
  this.physics.add.collider(player, ground);
  this.physics.add.collider(player, platforms);

  // Add obstacles
  obstacles = this.physics.add.group();
  obstacles.create(400, 500, 'obstacle').setScale(0.5);
  obstacles.create(700, 400, 'obstacle').setScale(0.5);

  // Add collision between player and obstacles
  this.physics.add.collider(player, obstacles, hitObstacle, null, this);

  // Set up custom key bindings
  keys = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D,
    jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
    sprint: Phaser.Input.Keyboard.KeyCodes.SHIFT,
    decreaseJump: Phaser.Input.Keyboard.KeyCodes.O,
    increaseJump: Phaser.Input.Keyboard.KeyCodes.P
  });

  // Set up the camera to follow the player
  camera = this.cameras.main;
  camera.startFollow(player, true, 0.1, 0.1);
  camera.setBounds(0, 0, 1600, 600); // Set camera bounds to a larger world width

  // Display initial jump power in the console
  console.log("Initial Jump Power:", jumpPower);
}

// Update game logic
function update() {
  // Move the background for parallax effect
  background.tilePositionX += 1;

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

  // Adjust jump power with O and P keys
  if (keys.decreaseJump.isDown) {
    jumpPower = Math.max(50, jumpPower - 10); // Minimum jump power of 50
    console.log("Jump Power Decreased:", jumpPower);
  }
  if (keys.increaseJump.isDown) {
    jumpPower = Math.min(600, jumpPower + 10); // Maximum jump power of 600
    console.log("Jump Power Increased:", jumpPower);
  }

  // Jump if touching the ground (Space or W key)
  if ((keys.jump.isDown || keys.up.isDown) && player.body.touching.down) {
    player.setVelocityY(-jumpPower);
    console.log("Jumping with power:", jumpPower);
  }
}

// Handle player hitting an obstacle
function hitObstacle(player, obstacle) {
  console.log("Player hit an obstacle!");
  // Reduce player health or trigger death animation here
  player.setTint(0xff0000); // Flash red on hit
  setTimeout(() => {
    player.clearTint(); // Remove tint after 500ms
  }, 500);
}
```

### Key Features Added:

1. **Parallax Background**:
   - We added a background image that scrolls at a slower speed compared to the player’s movement. This gives the effect of depth. The `background.setScrollFactor(0.5);` line makes the background move slower than the player, creating the parallax effect.

2. **Platforms & Ground**:
   - Additional platforms have been added for the player to jump on. You can customize these platforms’ positions and add more by modifying the `create()` function.
   
3. **Obstacles (Tunnels or Objects)**:
   - We added obstacles (represented as `alien.png` sprites) that the player can hit. If the player collides with one of them, they will flash red, and you could add additional effects like health reduction or death triggers.

4. **Camera Following the Player**:
   - The camera now follows the player’s movement with a smooth effect (`camera.startFollow(player, true, 0.1, 0.1);`). The camera bounds are set to a wider world, allowing for more exploration as the player moves.

### Next Steps and Customizations:

- **Obstacles**: You can modify the `hitObstacle` function to make the player lose health or trigger other game events.
- **World Expansion**: Add more platforms, tunnels, and obstacles by simply creating more `platforms.create()` and `obstacles.create()` calls with varying positions and sizes.
- **Interactive Objects**: For tunnels, consider creating large platforms or invisible areas the player must enter, or set up "gates" that open under certain conditions.

This should make your game world feel more dynamic, with moving elements and obstacles to avoid or interact with. Let me know how it goes!
