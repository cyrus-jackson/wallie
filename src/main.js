const {app, Tray, Menu, BrowserWindow } = require('electron')
const AutoLaunch = require('auto-launch');
// var AutoLaunch = require('auto-launch');
const path = require("path")
const iconPath = path.join(__dirname, 'assets/icons/tray.png')

let mainWindow
let appIcon = null;
function createTray() {
    appIcon = new Tray(iconPath);
    appIcon.setToolTip("hahaLOL");
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click:  function(){
        mainWindow.show();
      } },
    { label: 'Quit', click:  function(){
        app.isQuiting = true;
        app.quit();
      } }
  ]);
  appIcon.setContextMenu(contextMenu)

}
function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600, transparent: true, frame: true, title: 'Wallie'})

mainWindow.loadURL(`file://${__dirname}/index.html`);
mainWindow.webContents.on('new-window', function(e, url) {
e.preventDefault();
require('electron').shell.openExternal(url);
});
app.setLoginItemSettings({ openAtLogin: true });

// mainWindow.webContents.openDevTools()
createTray()

mainWindow.on('closed', function() {
    mainWindow = null
  });


mainWindow.on('minimize',function(event){
    event.preventDefault();
    mainWindow.hide();
  });
}

var datetime = new Date();
console.log(datetime);

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
