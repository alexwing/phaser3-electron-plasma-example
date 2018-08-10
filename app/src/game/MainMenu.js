const MainMenu = new Phaser.Scene(STATE.MAINMENU)

MainMenu.init = function () {
}

MainMenu.preload = function () {
}

MainMenu.create = function () {
  this.menuEntries.forEach((e, i) => {
    const entry = this.add.text(50, (i + 1) * 50, e.label).setInteractive()
    entry.on('pointerdown', (pointer, emitter) => {
      e.handler(this, pointer, emitter)
    })
  })
}

MainMenu.update = function () {

}

MainMenu.menuEntries = [{
  label: 'Start',
  handler: (game, pointer, emitter) => {
    game.scene.start(STATE.GAME)
  }
}, {
  label: 'Quit',
  handler: (game, pointer, emitter) => {
    remote.getCurrentWindow().close()
  }
}]
