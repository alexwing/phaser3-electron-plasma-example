const { app, BrowserWindow } = require('electron')

const windowOption = {
  title: 'App',
  resizable: false
}

const windowUrl = `file://${__dirname}/game/static/index.html`

class App {
  constructor () {
    this.window = null
  }

  init () {
    this.initApp()
  }

  initApp () {
    app.on('ready', () => {
      this.createWindow()
    })
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit()
    })
    app.on('activate', () => {
      if (this.window === null) this.createWindow()
    })
  }

  createWindow () {
    this.window = new BrowserWindow(windowOption)
  //  this.window.setMenu(null)
    this.window.loadURL(windowUrl)
    this.window.show()
  }
}

module.exports = App