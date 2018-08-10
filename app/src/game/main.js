const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [
    Preloader,
    MainMenu,
    Game
  ]
}

const game = new Phaser.Game(config)