const path = require('path');
const { BrowserWindow, Tray } = require('electron');

const Positioner = require('electron-positioner');

class TrayIcon {
  constructor(trayWindow) {
    // Path to the app icon that will be displayed in the Tray (icon size: 22px)
    let iconPath = path.join(__dirname, '../src/assets/icons/tray.png')

    this.trayIcon = new Tray(iconPath);
    this.trayIcon.setToolTip('Wallie'); // This tooltip will show up, when user hovers over our tray-icon.

    this.trayIcon.on('click', (e, bounds) => {
      if ( trayWindow.isVisible() ) {
        trayWindow.hide();
      } else {
        let positioner = new Positioner(trayWindow);
        positioner.move('trayCenter', bounds);
        console.log(bounds)

        trayWindow.show();
      }
    });
  }
}

module.exports = TrayIcon;
