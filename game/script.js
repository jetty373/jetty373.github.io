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
  let cursors;
  
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
  
    // Enable cursor keys for movement
    cursors = this.input.keyboard.createCursorKeys();
  
    // Add collision between player and ground
    this.physics.add.collider(player, ground);
  }
  
  function update() {
    // Reset player velocity (movement)
    player.setVelocityX(0);
  
    // Move left
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.flipX = true; // Flip the player image to face left
    }
    // Move right
    else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.flipX = false; // Face right
    }
  
    // Jump if touching the ground
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
  