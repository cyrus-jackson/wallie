const {app, Tray, Menu, BrowserWindow } = require('electron')
const AutoLaunch = require('auto-launch');
// var AutoLaunch = require('auto-launch');
const path = require("path")
const iconPath = path.join(__dirname, 'assets/icons/tray2.png')

let mainWindow
let tray = null;
function createTray() {

var platform = require('os').platform();  
var imageFolder = __dirname + '/assets/icons';
var trayImage = "";

// Determine appropriate icon for platform
if (platform == 'darwin') {  
    trayImage = imageFolder + '/icon_osx.png';
}
else if (platform == 'win32') {  
    trayImage = imageFolder + '/tray2.png';
}
else {
  //Linux
  trayImage = imageFolder + '/tray2.png';
}


tray = new Tray(trayImage);

// if (platform == "darwin") {  
//     tray.setPressedImage(imageFolder + '/icon_macos.png');
// }

  tray.setToolTip("Wallie");
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Launch', click:  function(){
        mainWindow.show();
      } },
    { label: 'Quit', click:  function(){
        app.isQuiting = true;
        app.quit();
      } }
  ]);
  tray.setContextMenu(contextMenu)

}
function createWindow() {
    createTray();
    mainWindow = new BrowserWindow({width: 800, height: 600, transparent: true, frame: false, title: 'Wallie', show: false,
      icon: __dirname + '/assets/icons/tray2.png'})

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
    });
    app.setLoginItemSettings({ openAtLogin: true });

    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function() {
        mainWindow = null
      });


    mainWindow.on('minimize',function(event){
        event.preventDefault();
        mainWindow.hide();
      });
}


app.on('ready', createWindow);


let autoLaunch = new AutoLaunch({
  name: app.getName()
});

autoLaunch.isEnabled().then((isEnabled) => {
  if (!isEnabled) autoLaunch.enable();
});


app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
